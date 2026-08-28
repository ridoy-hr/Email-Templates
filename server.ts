import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Generate Research Survey Email details using Gemini
app.post("/api/generate-survey-email", async (req, res) => {
  try {
    const { prompt, currentTemplateId } = req.body;
    
    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Prompt is required and must be a string." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(400).json({ 
        error: "GEMINI_API_KEY is not configured in environment variables. Please configure it in Settings > Secrets." 
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });

    const systemInstruction = `You are an expert HR copywriter and professional email designer. Your task is to extract, draft, and refine a highly compelling research survey email based on the user's input copy, notes, raw text, or description.
Return a structured JSON object containing all the email template fields.
The target audience consists of HR professionals, executives, and managers, so the tone must be highly professional, persuasive, warm, and corporate-appropriate.

CRITICAL INSTRUCTIONS FOR REPLACING EXISTING CONTENT:
- If the user provides a direct copy of an email (e.g. they paste a full email or draft), you MUST extract the body, headings, and signature details directly from their text, removing any previous default/boilerplate content.
- If a specific field or section (such as the category badge, preheader, P.S./postscript section, or signature block) is NOT mentioned, implied, or present in the user's provided input copy, you MUST set it to an empty string ("") so that the old values are completely removed and cleared from the template.
- Do NOT use previous default names or titles (like "Sue Kelley") if there is a different signature in the user's copy, or if there is no signature in their copy at all (in which case set signatureContentHtml to an empty string "").

Ensure the bodyContent is styled with clean HTML, specifically using:
- <p style="margin: 0 0 24px 0"> for normal paragraphs.
- Optionally, include one highlighted paragraph block with a subtle background and rounded border to draw attention to important details:
  <p style="margin: 0 0 24px 0; background: #e6f0fa; border-radius: 8px; padding: 15px 20px; font-weight: 600;"><strong>The survey takes only X minutes to complete. Key findings...</strong></p>
- You can also include standard links with style="color: #2563eb; text-decoration: underline;" (use the blue hex color #2563eb so they stand out).

Make sure all fields are structured. Return exactly JSON.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        preheaderText: { 
          type: Type.STRING, 
          description: "A preheader summary sentence, usually 15-25 words, giving a preview of the email content. If not present or implied, return empty string." 
        },
        category: { 
          type: Type.STRING, 
          description: "A high-level category or department, e.g. 'Talent Acquisition', 'HR Technology'. If not present or implied, return empty string." 
        },
        heroHeading: { 
          type: Type.STRING, 
          description: "An engaging, professional heading or question of 10-15 words that grabs attention in the hero section." 
        },
        ctaText: { 
          type: Type.STRING, 
          description: "Button text for the call to action, e.g. 'Take the Survey', 'Share Your Feedback'." 
        },
        bodyContent: { 
          type: Type.STRING, 
          description: "Complete body HTML containing paragraphs. Ensure you use <p style=\"margin: 0 0 24px 0\"> for paragraph elements. Incorporate styled paragraphs for key points." 
        },
        signatureContentHtml: { 
          type: Type.STRING, 
          description: "Complete signature HTML block (usually name, title, company, email, and tagline). Use <br /> to separate lines, e.g. '<strong>Sue Kelley</strong><br />Product Manager, HR Research Institute<br />research@hr.com<br />Maximizing Human Potential'. If no signature is present, return empty string." 
        },
        psContentHtml: { 
          type: Type.STRING, 
          description: "Complete P.S. (Postscript) HTML block. It should usually start with <strong>P.S.</strong> or <strong>P.S. </strong> and can include formatted text and anchor links using style=\"color: #232288; text-decoration: underline;\". If no P.S. is present or implied in the input copy, return an empty string." 
        }
      },
      required: [
        "preheaderText", "category", "heroHeading", "ctaText", "bodyContent", 
        "signatureContentHtml", "psContentHtml"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate email data based on this prompt or notes: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const emailData = JSON.parse(text);
    res.json(emailData);

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating with AI." });
  }
});

// API: Parse uploaded HTML into blocks
app.post("/api/parse-html-blocks", async (req, res) => {
  try {
    const { htmlContent } = req.body;
    
    if (!htmlContent || typeof htmlContent !== "string") {
      res.status(400).json({ error: "HTML content is required." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(400).json({ error: "GEMINI_API_KEY is not configured in environment variables." });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });

    const systemInstruction = `You are an expert email parser. Your task is to extract the logical content blocks from the provided raw HTML email template.
Convert the HTML into an array of structured blocks. The available block types are:
- "heading": For <h1>, <h2>, etc. Content should be the plain text heading.
- "text": For paragraph text. Content should be plain text, preserving line breaks if needed.
- "image": For images. Content should be the image URL (src).
- "button": For CTA buttons. Content should be the button text.
- "divider": For <hr> or visual separators. Content is empty.
- "html": For complex tables, side-by-side columns, or HTML that doesn't fit standard blocks. Content is the raw HTML snippet.
- "signature": For email signatures. Content is the text.
- "footer": For the very bottom legal/unsubscribe text. Content is the text.

Only extract the body content, ignore the head, wrapper tables, and styling wrappers. Do your best to simplify the content into a linear sequence of blocks.
Return a JSON object with a single property 'blocks', containing an array of these block objects.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        blocks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "One of: heading, text, image, button, divider, html, signature, footer" },
              content: { type: Type.STRING, description: "The content of the block. For image, it's URL. For others, it's text or HTML." },
              settings: { type: Type.OBJECT, properties: { fullWidth: { type: Type.BOOLEAN } } }
            },
            required: ["type", "content"]
          }
        }
      },
      required: ["blocks"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Parse this HTML email into blocks:\n\n${htmlContent.substring(0, 30000)}`, // limit size
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const data = JSON.parse(text);
    // ensure each block has an id
    const blocksWithId = data.blocks.map((b: any) => ({
      ...b,
      id: Math.random().toString(36).substr(2, 9),
      settings: b.settings || {}
    }));
    
    res.json({ blocks: blocksWithId });

  } catch (error: any) {
    console.error("Gemini Parse Error:", error);
    let errorMsg = "An error occurred while parsing HTML.";
    if (error.status === 503 || error.message?.includes("503") || error.message?.includes("UNAVAILABLE")) {
      errorMsg = "The AI model is currently overloaded. Please try again in a few moments.";
    } else if (error.status === 429 || error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("resource_exhausted") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      errorMsg = "AI API quota exceeded. Please check your plan and billing details, or try again later.";
    } else if (error.message) {
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.error && parsed.error.message) {
          errorMsg = parsed.error.message;
        } else {
          errorMsg = error.message;
        }
      } catch (e) {
        errorMsg = error.message;
      }
    }
    res.status(500).json({ error: errorMsg });
  }
});

// Serve static assets in production, proxy in dev
async function startViteMiddleware() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startViteMiddleware();
