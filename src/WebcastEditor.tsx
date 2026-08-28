import React, { useState } from 'react';
import { ArrowLeft, Presentation, Layers } from 'lucide-react';
import { WebcastEditorStandard } from './WebcastEditorStandard';
import { WebcastEditorOnDemand } from './WebcastEditorOnDemand';

export function WebcastEditor({ onBack }: { onBack: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState<'none' | 'standard' | 'ondemand'>('none');

  if (selectedTemplate === 'standard') {
    return <WebcastEditorStandard onBack={() => setSelectedTemplate('none')} />;
  }

  if (selectedTemplate === 'ondemand') {
    return <WebcastEditorOnDemand onBack={() => setSelectedTemplate('none')} />;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center shrink-0">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 mr-4 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Select Webcast Template</h1>
          <p className="text-sm text-slate-500">Choose an email template to start editing</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Standard Webcast Template */}
            <button 
              onClick={() => setSelectedTemplate('standard')}
              className="text-left group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col h-full"
            >
              <div className="h-48 bg-slate-100 border-b border-slate-200 p-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full max-w-[200px] transform group-hover:scale-105 transition-transform">
                  <div className="w-16 h-4 bg-slate-200 rounded mb-4" />
                  <div className="w-full h-20 bg-slate-100 rounded mb-3 flex items-center justify-center text-slate-300">
                    <Presentation size={32} />
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded mb-2" />
                  <div className="w-2/3 h-3 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Standard Webcast</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  A single focused webcast email with hero section, introduction, speakers layout, and key takeaways.
                </p>
              </div>
            </button>

            {/* On-Demand Webcast Template */}
            <button 
              onClick={() => setSelectedTemplate('ondemand')}
              className="text-left group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col h-full"
            >
              <div className="h-48 bg-slate-100 border-b border-slate-200 p-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full max-w-[200px] transform group-hover:scale-105 transition-transform space-y-2">
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1 h-8 bg-slate-100 rounded" />
                    <div className="flex-1 h-8 bg-slate-100 rounded" />
                  </div>
                  <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-center px-2">
                    <div className="w-3/4 h-2 bg-slate-200 rounded" />
                  </div>
                  <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-center px-2">
                    <div className="w-3/4 h-2 bg-slate-200 rounded" />
                  </div>
                  <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-center px-2">
                    <div className="w-3/4 h-2 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">On-Demand Webcasts</h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">New</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  A digest email format for multiple archived webcasts. Includes a personalized greeting, sponsor logos, and a list format.
                </p>
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
