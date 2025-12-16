import React, { useState, useCallback } from 'react';
import MapSystem from './components/MapSystem';
import AssociationDetailCard from './components/AssociationDetailCard';
import Legend from './components/Legend';
import AdminEditor from './components/AdminEditor';
import { AssociationMember } from './types';
import { DataProvider, useData } from './contexts/DataContext';
import { MousePointer2, ZoomIn, Settings, Languages } from 'lucide-react';
import { UI_TRANSLATIONS } from './constants';

const AppContent: React.FC = () => {
  const [selectedAssociation, setSelectedAssociation] = useState<AssociationMember | null>(null);
  const { isAdminMode, toggleAdminMode, language, toggleLanguage } = useData();
  const T = UI_TRANSLATIONS[language];

  const handleSelectAssociation = useCallback((assoc: AssociationMember) => {
    setSelectedAssociation(assoc);
  }, []);

  const handleCloseCard = useCallback(() => {
    setSelectedAssociation(null);
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Top Branding Bar */}
      <header className="absolute top-0 left-0 w-full h-16 pointer-events-none z-30 flex items-center justify-between px-8">
        <div className="pointer-events-auto flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-200/60 mt-4">
          <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-sm">
            IFPSM
          </div>
          <div>
             <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none">{T.systemTitle}</h1>
             <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{T.systemSubtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 pointer-events-auto">
          
          {/* Language Toggle */}
          <button 
             onClick={toggleLanguage} 
             className="flex items-center gap-2 px-3 h-10 rounded-xl shadow-sm border border-slate-200/60 transition-all bg-white/80 backdrop-blur-md text-slate-600 hover:bg-slate-50"
             title="Switch Language / 切换语言"
          >
             <Languages size={16} />
             <span className="text-xs font-bold">{language === 'zh' ? 'EN' : '中文'}</span>
          </button>

          {/* Admin Toggle */}
          <button 
             onClick={toggleAdminMode} 
             className={`flex items-center justify-center w-10 h-10 rounded-xl shadow-sm border border-slate-200/60 transition-all ${isAdminMode ? 'bg-blue-600 text-white' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-slate-600'}`}
             title="管理模式 (CMS)"
          >
             <Settings size={18} />
          </button>

          <div className="hidden md:flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-200/60">
             <div className="flex items-center gap-2 text-slate-400 text-xs">
               <MousePointer2 size={14} />
               <span>{T.clickToView}</span>
             </div>
             <div className="w-px h-3 bg-slate-300"></div>
             <div className="flex items-center gap-2 text-slate-400 text-xs">
               <ZoomIn size={14} />
               <span>{T.zoomToNav}</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Map Area */}
      <main className="flex-1 relative z-10 w-full h-full">
        <MapSystem 
          onSelectAssociation={handleSelectAssociation} 
          selectedId={selectedAssociation?.id}
        />
        
        <Legend />

        <div className="absolute bottom-4 right-4 text-right pointer-events-none opacity-60">
           <p className="text-[10px] text-slate-400 font-medium">{T.unStandard}</p>
           <p className="text-[9px] text-slate-300">Data Visualization System v3.0 (Bilingual)</p>
        </div>

        {/* Association Detail Card */}
        {selectedAssociation && (
          <div className="absolute top-20 right-6 z-40">
            <AssociationDetailCard 
              data={selectedAssociation} 
              onClose={handleCloseCard} 
            />
          </div>
        )}

        {/* Admin Drawer (CMS) */}
        {isAdminMode && (
           <AdminEditor onClose={toggleAdminMode} />
        )}
      </main>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;