import React, { useState } from 'react';
import { AssociationMember } from '../types';
import { X, Globe, Calendar, Users, Briefcase, Award, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { REGION_COLORS } from '../constants';

interface InfoDrawerProps {
  association: AssociationMember | null;
  onClose: () => void;
}

const InfoDrawer: React.FC<InfoDrawerProps> = ({ association, onClose }) => {
  const [expandedProfile, setExpandedProfile] = useState(false);
  const [expandedDocs, setExpandedDocs] = useState(false);

  if (!association) return null;

  const isAffiliate = association.memberType === 'Affiliate';
  const themeColor = isAffiliate ? '#475569' : REGION_COLORS[association.region].text;
  const bgBadge = isAffiliate ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-blue-50 text-blue-800 border-blue-200';

  // Helper map for Chinese Regions display in drawer
  const regionCN: Record<string, string> = {
      'Europe': '欧洲',
      'AsiaPacific': '亚太地区',
      'Americas': '美洲',
      'Africa': '非洲'
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${association ? 'translate-x-0' : 'translate-x-full'} overflow-hidden flex flex-col border-l border-slate-200`}>
      
      {/* Header (Sticky) */}
      <div className="bg-white p-6 border-b border-slate-100 flex items-start justify-between relative z-10 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border rounded ${bgBadge}`}>
              {association.memberType === 'Member' ? '正式会员' : '附属会员'}
            </span>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              {regionCN[association.region] || association.region} · {association.country}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">
            {association.abbreviation}
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-light leading-snug">
            {association.nameEN}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        
        {/* Level 1: Core Info Card */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Calendar size={14} />
                <span className="text-xs font-medium uppercase">成立时间</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{association.info.yearEstablished.value}</p>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Building2 size={14} />
                <span className="text-xs font-medium uppercase">组织性质</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{association.info.legalStatus.value}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Users size={14} />
                <span className="text-xs font-medium uppercase">会员规模</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{association.info.membershipScale.value}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Award size={14} />
                <span className="text-xs font-medium uppercase">政府关联</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{association.info.governmentAffiliation.value}</p>
            </div>
          </div>

          <div>
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Briefcase size={14} />
                <span className="text-xs font-medium uppercase">核心业务领域</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {association.info.coreBusiness.map((biz, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full shadow-sm">
                    {biz}
                  </span>
                ))}
              </div>
          </div>

          {association.website && (
            <a 
              href={association.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-medium shadow-md"
            >
              <Globe size={16} />
              访问官方网站
            </a>
          )}
        </div>

        <hr className="border-slate-100" />

        {/* Level 2: Detailed Profile (Collapsible) */}
        <div>
          <button 
            onClick={() => setExpandedProfile(!expandedProfile)}
            className="flex items-center justify-between w-full group"
          >
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              组织详细画像
              <span className="block text-xs font-normal text-slate-400 mt-0.5">Organization Profile</span>
            </h3>
            {expandedProfile ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
          </button>

          {expandedProfile && (
            <div className="mt-4 space-y-6 animate-fadeIn">
              {/* Background */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-700 border-l-2 pl-3" style={{ borderColor: themeColor }}>背景与治理</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">
                  {association.info.foundingBackground.value || "暂无详细背景资料。"}
                </p>
                {association.info.governance.value && (
                  <div className="mt-2">
                    <span className="text-xs text-slate-400 uppercase">主要领导:</span>
                    <ul className="list-disc list-inside text-sm text-slate-700 mt-1">
                      <li>{association.info.governance.value}</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Events & Achievements */}
              <div className="space-y-2">
                 <h4 className="text-sm font-bold text-slate-700 border-l-2 pl-3" style={{ borderColor: themeColor }}>影响力与成果</h4>
                 {association.info.flagshipPrograms.value && (
                   <div className="mb-3">
                     <span className="text-xs text-slate-400 uppercase block mb-1">品牌活动</span>
                     <div className="text-sm text-slate-700 py-1 border-b border-slate-100 last:border-0">{association.info.flagshipPrograms.value}</div>
                   </div>
                 )}
                 {association.info.internationalEngagement.value && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <span className="text-xs text-blue-500 uppercase font-bold mb-1 block">国际参与</span>
                      <p className="text-sm text-blue-900 leading-relaxed">{association.info.internationalEngagement.value}</p>
                    </div>
                 )}
              </div>
            </div>
          )}
        </div>

        <hr className="border-slate-100" />

        {/* Level 3: Documents (Collapsible) */}
        <div className="pb-10">
           <button 
            onClick={() => setExpandedDocs(!expandedDocs)}
            className="flex items-center justify-between w-full group"
          >
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              补充资料
              <span className="block text-xs font-normal text-slate-400 mt-0.5">Internal Governance & Reports</span>
            </h3>
            {expandedDocs ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
          </button>

          {expandedDocs && (
             <div className="mt-4 space-y-3">
                <div className="text-sm text-slate-400 italic p-4 text-center bg-slate-50 rounded-lg">
                  暂无公开文件 (加密)
                </div>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InfoDrawer;