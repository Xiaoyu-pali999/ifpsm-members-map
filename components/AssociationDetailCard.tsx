import React, { useState, useEffect } from 'react';
import { AssociationMember, Field } from '../types';
import { useData } from '../contexts/DataContext';
import { 
  X, Calendar, Users, Building2, ExternalLink, Lock, User, Mail, 
  ChevronDown, ChevronUp, FileText, Globe, Landmark, Award, BookOpen, CheckCircle2, HelpCircle, Eye
} from 'lucide-react';
import { REGION_COLORS, UI_TRANSLATIONS } from '../constants';

interface Props {
  data: AssociationMember;
  onClose?: () => void;
}

type LogoStatus = 'primary' | 'backup' | 'failed';

const AssociationDetailCard: React.FC<Props> = ({ data, onClose }) => {
  const { fieldConfig, language } = useData(); // Get language
  const T = UI_TRANSLATIONS[language]; // Current translation
  
  const [logoStatus, setLogoStatus] = useState<LogoStatus>('primary');
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary');
  const [expandedSection, setExpandedSection] = useState<string | null>('background');
  const [internalNote, setInternalNote] = useState('');

  useEffect(() => {
    setLogoStatus('primary');
    setViewMode('summary');
    setExpandedSection('background');
    const savedNote = localStorage.getItem(`note_${data.id}`);
    setInternalNote(savedNote || data.internalNotes || '');
  }, [data.id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setInternalNote(newVal);
    localStorage.setItem(`note_${data.id}`, newVal);
  };

  const handleImageError = () => {
    if (logoStatus === 'primary' && data.website) setLogoStatus('backup');
    else setLogoStatus('failed');
  };

  let currentSrc: string | undefined;
  if (logoStatus === 'primary') currentSrc = data.logo;
  else if (logoStatus === 'backup' && data.website) currentSrc = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(data.website)}&size=128`;
  const showImage = !!currentSrc && logoStatus !== 'failed';

  const isAffiliate = data.memberType === 'Affiliate';
  const regionStyle = REGION_COLORS[data.region];

  // Helper: Get label based on language
  const getLabel = (field: any) => language === 'zh' ? field.labelCN : field.labelEN;
  
  // Helper: Status Badge
  const StatusBadge = ({ status }: { status?: string }) => {
    if (status === 'confirmed') return <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-green-50 text-green-700 border border-green-200 ml-2"><CheckCircle2 size={8} /> {T.verified}</span>;
    if (status === 'pending') return <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-50 text-amber-700 border border-amber-200 ml-2"><HelpCircle size={8} /> {T.pending}</span>;
    return null;
  };

  const Accordion = ({ title, icon: Icon, isOpen, onToggle, children }: any) => (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-3">
        <button onClick={onToggle} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm"><Icon size={16} className="text-slate-500" />{title}</div>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </button>
        {isOpen && <div className="p-4 bg-white animate-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
   );

  // Helper to get visible fields for a section
  const getFieldsForSection = (section: string) => {
    return fieldConfig
      .filter(f => f.section === section && f.visible)
      .sort((a, b) => a.order - b.order)
      .map(f => ({
        label: getLabel(f),
        data: (data.info as any)[f.key] as Field
      }))
      .filter(item => item.data && item.data.value && !item.data.value.includes('信息未公开'));
  };

  return (
    <div className="w-[450px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl border border-white/50 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-6 duration-300">
      
      {/* 头部区域 */}
      <div className="p-5 pb-4 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 relative">
         <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors z-10">
            <X size={18} />
         </button>
         
         <div className="flex gap-4 items-start">
            <div className="w-16 h-16 shrink-0 rounded-lg flex items-center justify-center shadow-sm border border-slate-200 bg-white p-1 overflow-hidden">
               {showImage ? <img src={currentSrc} alt={data.abbreviation} className="w-full h-full object-contain" onError={handleImageError} /> : <span className="text-lg font-bold text-slate-300">{data.abbreviation.substring(0,2)}</span>}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-500 text-xs tracking-wider">{data.abbreviation}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-full ${isAffiliate ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                     {isAffiliate ? T.affiliate : T.member}
                  </span>
               </div>
               {/* Bilingual Name Display */}
               <h2 className="text-lg font-bold text-slate-900 leading-snug mb-0.5 truncate" title={language === 'zh' ? data.nameCN : data.nameEN}>
                 {language === 'zh' ? data.nameCN : data.nameEN}
               </h2>
               <p className="text-xs text-slate-500 leading-snug line-clamp-1" title={language === 'zh' ? data.nameEN : data.nameCN}>
                 {language === 'zh' ? data.nameEN : data.nameCN}
               </p>
               <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="font-bold text-slate-700">{language === 'zh' ? data.countryCN : data.country}</span>
                  <span className="text-slate-300">|</span>
                  <span style={{ color: regionStyle.text }}>
                    {language === 'zh' ? (UI_TRANSLATIONS.zh as any)[`region${data.region}`] : (UI_TRANSLATIONS.en as any)[`region${data.region}`]}
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 bg-[#FDFDFD]">
         
         {/* Summary Info */}
         <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full"><User size={14} /></div>
                <div><span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">{T.delegate}</span><span className="block text-xs font-bold text-slate-800">{data.seniorDelegate || '—'}</span></div>
            </div>
            {data.contactEmail && (
                 <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-50 text-slate-500 rounded-full"><Mail size={14} /></div>
                    <div className="flex-1 min-w-0"><span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">{T.email}</span><a href={`mailto:${data.contactEmail}`} className="text-xs font-medium text-slate-700 hover:text-blue-600 truncate block transition-colors">{data.contactEmail}</a></div>
                </div>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center gap-2 w-full py-1.5 bg-slate-800 text-white rounded text-[10px] font-bold hover:bg-slate-900 transition-all shadow-sm">
                <ExternalLink size={10} /> {T.website}
              </a>
            )}
         </div>

         {/* Dynamic Basic Section */}
         <div className="grid grid-cols-2 gap-2">
            {getFieldsForSection('basic').map((field, idx) => (
               <div key={idx} className="flex flex-col gap-1 p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400">
                     <span className="text-[10px] font-bold uppercase tracking-wider">{field.label}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">{field.data.value}</p>
               </div>
            ))}
         </div>

         {/* Core Business Tags */}
         {data.info.coreBusiness && data.info.coreBusiness.length > 0 && fieldConfig.find(f => f.key === 'coreBusiness')?.visible && (
            <div className="mb-1">
                <div className="flex items-center gap-1.5 mb-2">
                    <BookOpen size={12} className="text-slate-400"/>
                    <span className="text-xs font-bold text-slate-500">{getLabel(fieldConfig.find(f => f.key === 'coreBusiness')) || T.coreBusiness}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {data.info.coreBusiness.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">{tag}</span>
                    ))}
                </div>
            </div>
         )}

         {/* Full Profile */}
         {viewMode === 'full' && (
           <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
             
             {/* Dynamic Background Accordion */}
             <Accordion title={T.backgroundGovernance} icon={Landmark} isOpen={expandedSection === 'background'} onToggle={() => setExpandedSection(expandedSection === 'background' ? null : 'background')}>
                {getFieldsForSection('background').map((field, idx) => (
                   <div key={idx} className="mb-4 last:mb-0">
                      <div className="flex items-center mb-1"><span className="text-xs font-bold text-slate-500">{field.label}</span><StatusBadge status={field.data.status} /></div>
                      <p className="text-sm text-slate-700 leading-relaxed text-justify bg-slate-50/50 p-2 rounded border border-slate-100/50">{field.data.value}</p>
                   </div>
                ))}
             </Accordion>

             {/* Dynamic Influence Accordion */}
             <Accordion title={T.influenceAchievements} icon={Award} isOpen={expandedSection === 'influence'} onToggle={() => setExpandedSection(expandedSection === 'influence' ? null : 'influence')}>
                {getFieldsForSection('influence').map((field, idx) => (
                   <div key={idx} className="mb-4 last:mb-0">
                      <div className="flex items-center mb-1"><span className="text-xs font-bold text-slate-500">{field.label}</span><StatusBadge status={field.data.status} /></div>
                      <p className="text-sm text-slate-700 leading-relaxed text-justify bg-slate-50/50 p-2 rounded border border-slate-100/50">{field.data.value}</p>
                   </div>
                ))}
             </Accordion>

             <div className="bg-amber-50 rounded-lg border border-amber-200 p-3 mt-4">
                <div className="flex items-center justify-between text-amber-800 mb-2">
                   <div className="flex items-center gap-1.5 font-bold text-xs uppercase"><Lock size={12} /> {T.internalNote}</div>
                </div>
                <textarea className="w-full bg-white border border-amber-200 rounded p-2 text-xs text-slate-700 focus:outline-none focus:border-amber-400 resize-none min-h-[60px]" placeholder="..." value={internalNote} onChange={handleNoteChange} />
             </div>
           </div>
         )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-slate-100">
         <button onClick={() => setViewMode(viewMode === 'summary' ? 'full' : 'summary')} className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'summary' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}>
           {viewMode === 'summary' ? <><span className='mr-1'>{T.fullProfile}</span><ChevronDown size={16} /></> : <><span className='mr-1'>{T.collapseProfile}</span><ChevronUp size={16} /></>}
         </button>
      </div>
    </div>
  );
};

export default AssociationDetailCard;