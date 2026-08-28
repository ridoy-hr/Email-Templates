export const survey_02 = `<!-- @format -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HR Research Survey Emailer 02</title>
    <style>
      body,
      table,
      td,
      a {
        font-family: 'Roboto', Arial, sans-serif !important;
        color: #2c353f !important;
      }
      body {
        margin: 0;
        padding: 0;
        min-width: 100%;
        background: #f1f1f1;
      }

      .container {
        margin: 0 auto !important;
        background: #ffffff !important;
      }
      .hero-heading {
        font-weight: 700;
        font-size: 30px;
        line-height: 1.25;
        margin: 0;
      }

      /* Category chip */
      .talent-acquisition {
        background: #f2f2f2;
        color: #2c353f !important;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        padding: 6px 12px;
        display: inline-block;
        margin: 0;
        max-width: 220px;
        letter-spacing: 0.5px;
        border-radius: 6px;
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
      }
      /* Desktop: left align; Mobile: center (overridden below) */
      .ta-cell {
        text-align: left;
        padding: 0 10px;
      }

      .body-container {
        padding: 24px 40px 20px 40px;
        font-size: 14px;
        line-height: 1.8;
        color: #2c353f;
      }
      .signature {
        font-size: 14px;
        line-height: 1.4;
      }
      .logo-section {
        padding: 0 0 30px 0;
        text-align: center;
      }
      .footer-container {
        padding: 0 40px 40px 40px;
        font-size: 12px;
        line-height: 1.5;
        color: #2c353f;
        text-align: center;
      }
      .footer-container a {
        color: #232288 !important;
        text-decoration: underline;
      }

      /* Thin rainbow bar with solid fallback */
      .rainbow {
        height: 4px;
        line-height: 4px;
        background: #e3007e; /* solid fallback */
        background-image: linear-gradient(
          90deg,
          #00a0df 0%,
          #232288 27.8%,
          #e3007e 52.35%,
          #e51f1f 79.42%,
          #feed00 100%
        );
      }

      @media only screen and (max-width: 620px) {
        .container {
          width: 100% !important;
        }
        .column {
          width: 100% !important;
          display: block !important;
          text-align: center !important;
          padding: 0 !important;
        }
        .hide-mobile {
          display: none !important;
          max-height: 0 !important;
          overflow: hidden !important;
          mso-hide: all !important;
        }
        .body-container {
          padding: 20px !important;
          font-size: 14px !important;
        }
        .footer-container {
          padding: 0 20px 30px 20px !important;
          font-size: 12px !important;
        }
        .hero-heading {
          font-size: 28px !important;
          line-height: 1.28 !important;
        }
        /* Mobile-center the chip */
        .ta-cell {
          text-align: center !important;
        }
        .talent-acquisition {
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }
    </style>

    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {
          background: #f1f1f1 !important;
        }
        body,
        table,
        td,
        p,
        a {
          font-family: Arial, Helvetica, sans-serif !important;
        }
      </style>
    <![endif]-->
  </head>
  <body>
    <!-- Preheader (hidden) -->
    <div
      style="
        display: none;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #f4f4f4;
        max-width: 0;
        opacity: 0;
      "
    >
      Take 7 minutes to help shape the future of recruitment technologies — your
      insights matter!
    </div>

    <!--[if (gte mso 9)|(IE)]>
    <table width="600" align="center" style="border-spacing:0;color:#2C353F;background:#ffffff;" role="presentation"><tr><td style="padding:0;">
    <![endif]-->

    <table
      align="center"
      class="container"
      role="presentation"
      width="100%"
      style="
        border-spacing: 0;
        color: #2c353f;
        font-family: 'Roboto', Arial, sans-serif !important;
        background: #ffffff;
        margin: 0 auto;
        padding: 0;
        max-width: 600px;
      "
    >
      <!-- Top rainbow bar (no padding on TD) -->
      <tr>
        <td style="padding: 0">
          <!--[if gte mso 9]>
            <v:rect
              xmlns:v="urn:schemas-microsoft-com:vml"
              fill="true"
              stroke="false"
              style="width: 600px; height: 4px"
            >
              <v:fill
                type="gradient"
                angle="90"
                color="#00a0df"
                color2="#feed00"
                colors="0% #00a0df, 28% #232288, 52% #e3007e, 79% #e51f1f, 100% #feed00"
              />
              <v:textbox inset="0,0,0,0">
                <table
                  width="600"
                  height="4"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  role="presentation"
                  bgcolor="#e3007e"
                >
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </v:textbox>
            </v:rect>
          <![endif]-->
          <!--[if !mso]><!-- -->
          <div class="rainbow" style="width: 100%"></div>
          <!--<![endif]-->
        </td>
      </tr>

      <tr>
        <td
          height="16"
          style="font-size: 0; line-height: 0; mso-line-height-rule: exactly"
        >
          &nbsp;
        </td>
      </tr>

      <!-- Category chip row: left on desktop, center on mobile -->
      <tr>
        <td class="ta-cell">
          <span class="talent-acquisition">Talent Acquisition</span>
        </td>
      </tr>

      <tr>
        <td
          height="10"
          style="font-size: 0; line-height: 0; mso-line-height-rule: exactly"
        >
          &nbsp;
        </td>
      </tr>

      <!-- Hero 70/30 -->
      <tr>
        <td style="padding: 0 20px">
          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <tr>
              <!-- Text 70% -->
              <td
                class="column"
                valign="middle"
                width="70%"
                style="text-align: left; padding-right: 15px"
              >
                <h1
                  class="hero-heading"
                  style="
                    margin: 0;
                    font-family: 'Roboto', Arial, sans-serif;
                    color: #2c353f;
                  "
                >
                  How do your recruitment technologies enhance talent
                  acquisition?
                </h1>
              </td>
              <!-- Image 30% -->
              <td
                class="column hide-mobile"
                valign="middle"
                width="30%"
                style="text-align: right; padding-left: 15px"
              >
                <img
                  src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/survey-mockup-aug-2025-hero-02.jpg"
                  alt="Survey illustration: online survey checklist on laptop"
                  width="180"
                  height="150"
                  style="
                    display: block;
                    border: 0;
                    outline: none;
                    text-decoration: none;
                    max-width: 100%;
                    height: auto;
                  "
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td
          height="16"
          style="font-size: 0; line-height: 0; mso-line-height-rule: exactly"
        >
          &nbsp;
        </td>
      </tr>

      <!-- Bottom rainbow bar (no padding on TD) -->
      <tr>
        <td style="padding: 0">
          <!--[if gte mso 9]>
            <v:rect
              xmlns:v="urn:schemas-microsoft-com:vml"
              fill="true"
              stroke="false"
              style="width: 600px; height: 4px"
            >
              <v:fill
                type="gradient"
                angle="90"
                color="#00a0df"
                color2="#feed00"
                colors="0% #00a0df, 28% #232288, 52% #e3007e, 79% #e51f1f, 100% #feed00"
              />
              <v:textbox inset="0,0,0,0">
                <table
                  width="600"
                  height="4"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  role="presentation"
                  bgcolor="#e3007e"
                >
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </v:textbox>
            </v:rect>
          <![endif]-->
          <!--[if !mso]><!-- -->
          <div class="rainbow" style="width: 100%"></div>
          <!--<![endif]-->
        </td>
      </tr>

      <!-- CTA centered (simple, inline, no shadow) -->

      <!-- CTA centered (Fuchsia Pink Rounded Button) -->
       
<tr>
  <td align="center" style="padding: 22px 20px 0px 20px">
    <a
      href="https://web.hr.com/coaxx"
      target="_blank"
      rel="noopener"
      style="
        display: inline-block;
        background-color: #d6346c;
        color: #ffffff !important;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none !important;
        padding: 12px 28px;
        border-radius: 50px;
        line-height: 20px;
        -webkit-text-size-adjust: none;
      "
    >
      Take the Survey
    </a>
  </td>
</tr>


      <!-- Body -->
      <tr>
        <td
          class="body-container"
          style="
            padding: 24px 40px 20px 40px;
            font-size: 14px;
            line-height: 1.8;
            color: #2c353f;
          "
        >
          <p style="margin: 0 0 24px 0">
            As we move through 2025, the team at HR.com is gathering valuable
            data on today’s Recruitment technologies to help HR professionals
            gain a better understanding of the tools, platforms, and innovations
            shaping the way organizations attract and hire top talent.
          </p>

          <p
            style="
              margin: 0 0 24px 0;
              background: #e6f0fa;
              border-radius: 8px;
              padding: 15px 20px;
              font-weight: 600;
            "
          >
            <strong
              >The survey takes only 7 minutes to complete. Key findings will be
              shared in an HR.com webcast,</strong
            >
            and you’ll receive early access to the full research report: Future
            of Recruitment Technologies 2025.
          </p>

          <p style="margin: 0 0 24px 0">
            These findings will reveal how your strategies and tools compare to
            other organizations, helping you stay competitive.
          </p>

          <p style="margin: 0 0 24px 0">
            We appreciate your support and look forward to your insights.
          </p>

          <p class="signature" style="margin: 0; font-size: 12px">
            <span style="font-size: 14px"><strong>Sue Kelley</strong></span
            ><br />
            Product Manager, HR Research Institute<br />
            research@hr.com<br />
            Maximizing Human Potential
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 40px 10px">
          <p
            style="
              margin: 0;
              font-size: 12px;
              background: #f8f8ff;
              padding: 12px 16px;
              border-left: 3px solid #232288;
              border-radius: 4px;
              line-height: 1.5;
            "
          >
            <strong style="font-size: 12px">P.S.</strong>
            If you missed our last research release, you may enjoy the insights
            from
            <a
              href="#"
              target="_blank"
              style="color: #232288; text-decoration: underline"
              >the previous report</a
            >. It’s a quick read with helpful benchmarks.
          </p>
        </td>
      </tr>
      <!-- Logos -->
      <tr>
        <td
          class="logo-section"
          style="padding: 0 0 30px 0; text-align: center"
        >
          <img
            src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/hrdotcom-and-hrresearch-logo.jpg"
            alt="HR.com & HR Research Institute Logos"
            width="300"
            height="138"
            style="max-width: 100%; height: auto; display: inline-block"
          />
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td
          class="footer-container"
          style="
            padding: 0 40px 40px 40px;
            font-size: 12px;
            line-height: 1.5;
            color: #575656 !important;
            text-align: center;
          "
        >
          <p style="margin: 0 0 8px 0">
            HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E
            1L0<br />
            <a
              href="https://www.hr.com/en/about_us/privacy_information/"
              target="_blank"
              >Privacy Policy</a
            >
            |
            <a href="mailto:education@hr.com" target="_blank">Contact Us</a>
          </p>
          <p style="margin: 0">
            To receive our Talent Acquisition Excellence newsletter,
            <a href="#" target="_blank">subscribe here</a>.<br />
            To unsubscribe or update your preferences,
            <a href="#" target="_blank">click here</a>.
          </p>
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
  </body>
</html>`;
