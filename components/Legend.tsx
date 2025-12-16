import React from 'react';
import { REGION_COLORS, UI_TRANSLATIONS } from '../constants';
import { useData } from '../contexts/DataContext';
import { Globe } from 'lucide-react';

const Legend: React.FC = () => {
  const { language } = useData();
  const T = UI_TRANSLATIONS[language];

  return (
    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-xl shadow-lg z-20 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-3 text-slate-800 border-b border-slate-100 pb-2">
        <Globe size={16} />
        <h3 className="text-sm font-bold">{T.mapLegend}</h3>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500 mb-1">{T.member}</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(REGION_COLORS).map(([region, colors]) => (
            <div key={region} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.fill }}></span>
              <span className="text-xs text-slate-600">
                {(T as any)[`region${region}`] || region}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 text-xs font-semibold text-slate-500 mb-1">{T.affiliate}</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-dashed border-slate-500 bg-transparent flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
          </span>
          <span className="text-xs text-slate-600">{T.affiliate}</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;