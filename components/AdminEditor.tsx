import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { AssociationMember, Region, FieldConfig } from '../types';
import { X, Plus, Edit2, Trash2, Eye, EyeOff, Save, RotateCcw, Layout, List, Upload } from 'lucide-react';

const AdminEditor: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { members, fieldConfig, addMember, updateMember, deleteMember, toggleMemberStatus, updateFieldConfig, resetToDefaults } = useData();
  const [activeTab, setActiveTab] = useState<'members' | 'fields'>('members');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<AssociationMember>>({});

  const startEdit = (member: AssociationMember) => {
    setFormData(JSON.parse(JSON.stringify(member))); // Deep copy
    setEditingId(member.id);
  };

  const startNew = () => {
    const newId = `custom-${Date.now()}`;
    const emptyMember: AssociationMember = {
      id: newId,
      memberCategory: 'association',
      memberType: 'Member',
      status: 'active',
      abbreviation: 'NEW',
      nameEN: '',
      nameCN: '新协会',
      country: '',
      countryCN: '',
      region: 'Europe',
      coordinates: { lat: 0, lng: 0 },
      logo: '',
      website: '',
      seniorDelegate: '',
      contactEmail: '',
      info: {
        yearEstablished: { value: '', status: 'auto' },
        legalStatus: { value: '', status: 'auto' },
        foundingBackground: { value: '', status: 'auto' },
        governmentAffiliation: { value: '', status: 'auto' },
        governance: { value: '', status: 'auto' },
        staffSize: { value: '', status: 'auto' },
        coreBusiness: [],
        flagshipPrograms: { value: '', status: 'auto' },
        membershipScale: { value: '', status: 'auto' },
        industryCoverage: [],
        influence: { value: '', status: 'auto' },
        internationalEngagement: { value: '', status: 'auto' },
        achievements: { value: '', status: 'auto' }
      }
    };
    setFormData(emptyMember);
    setEditingId(newId);
  };

  const handleSave = () => {
    if (!editingId || !formData.id) return;
    
    // Check if it's an update or new
    const exists = members.find(m => m.id === editingId);
    if (exists) {
      updateMember(editingId, formData);
    } else {
      addMember(formData as AssociationMember);
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除该协会吗？此操作不可恢复。')) {
      deleteMember(id);
      if (editingId === id) setEditingId(null);
    }
  };

  // Handle Logo Upload (Base64)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) { // Limit to 500KB
         alert('为了性能考虑，Logo图片大小请限制在 500KB 以内。');
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to update nested info fields
  const updateInfoField = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      info: {
        ...prev.info,
        [key]: { ...prev.info![key], value: val }
      } as any
    }));
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <h2 className="font-bold flex items-center gap-2">
          {editingId ? '编辑协会' : '后台管理 (CMS)'}
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded"><X size={20} /></button>
      </div>

      {!editingId ? (
        <>
          {/* Main Dashboard */}
          <div className="flex border-b border-slate-200">
            <button 
              className={`flex-1 py-3 text-sm font-bold ${activeTab === 'members' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
              onClick={() => setActiveTab('members')}
            >
              <List size={14} className="inline mr-1" /> 协会列表
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold ${activeTab === 'fields' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}
              onClick={() => setActiveTab('fields')}
            >
              <Layout size={14} className="inline mr-1" /> 字段配置
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
            {activeTab === 'members' ? (
              <div className="space-y-3">
                <button onClick={startNew} className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-bold shadow hover:bg-blue-700 transition">
                  <Plus size={16} /> 新增协会
                </button>
                
                {members.map(member => (
                  <div key={member.id} className={`bg-white p-3 rounded-lg border shadow-sm flex items-center justify-between ${member.status === 'inactive' ? 'opacity-60 grayscale' : ''}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${member.status === 'active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                      <div className="min-w-0">
                        <div className="font-bold text-sm truncate">{member.nameCN}</div>
                        <div className="text-xs text-slate-400">{member.abbreviation} · {member.countryCN}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => toggleMemberStatus(member.id)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded" title={member.status === 'active' ? '隐藏' : '显示'}>
                        {member.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button onClick={() => startEdit(member)} className="p-1.5 text-slate-400 hover:text-amber-600 rounded" title="编辑">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded" title="删除">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-8 text-center">
                  <button onClick={resetToDefaults} className="text-xs text-red-400 hover:text-red-600 underline flex items-center justify-center gap-1 w-full">
                    <RotateCcw size={12} /> 重置所有数据到初始状态
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                 <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 mb-4">
                    在此配置卡片上显示的字段。您可以修改中英文标签。
                 </div>
                 {fieldConfig.map((field, idx) => (
                   <div key={field.key} className="bg-white p-3 rounded border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                         <div className="font-mono text-xs text-slate-400">Key: {field.key}</div>
                         <button 
                            onClick={() => {
                              const newConfig = [...fieldConfig];
                              newConfig[idx].visible = !newConfig[idx].visible;
                              updateFieldConfig(newConfig);
                            }}
                            className={`p-1.5 rounded ${field.visible ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}
                          >
                             {field.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] text-slate-400">中文标签</label>
                            <input 
                              type="text" 
                              value={field.labelCN}
                              onChange={(e) => {
                                 const newConfig = [...fieldConfig];
                                 newConfig[idx].labelCN = e.target.value;
                                 updateFieldConfig(newConfig);
                              }}
                              className="w-full text-sm font-bold border-b border-dashed border-slate-300 focus:border-blue-500 outline-none pb-0.5" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-400">英文标签</label>
                            <input 
                              type="text" 
                              value={field.labelEN}
                              onChange={(e) => {
                                 const newConfig = [...fieldConfig];
                                 newConfig[idx].labelEN = e.target.value;
                                 updateFieldConfig(newConfig);
                              }}
                              className="w-full text-sm font-bold border-b border-dashed border-slate-300 focus:border-blue-500 outline-none pb-0.5" 
                            />
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Edit Form */
        <div className="flex-1 overflow-y-auto bg-slate-50 p-5 space-y-6">
           {/* Section 1: Basic Info */}
           <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2 mb-2">基本信息</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-xs text-slate-500">简称</label><input className="w-full border rounded p-2 text-sm" value={formData.abbreviation} onChange={e => setFormData({...formData, abbreviation: e.target.value})} /></div>
                 <div><label className="text-xs text-slate-500">中文名称</label><input className="w-full border rounded p-2 text-sm" value={formData.nameCN} onChange={e => setFormData({...formData, nameCN: e.target.value})} /></div>
                 <div className="col-span-2"><label className="text-xs text-slate-500">英文名称</label><input className="w-full border rounded p-2 text-sm" value={formData.nameEN} onChange={e => setFormData({...formData, nameEN: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-xs text-slate-500">国家 (中文)</label><input className="w-full border rounded p-2 text-sm" value={formData.countryCN} onChange={e => setFormData({...formData, countryCN: e.target.value})} /></div>
                 <div><label className="text-xs text-slate-500">国家 (英文)</label><input className="w-full border rounded p-2 text-sm" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} /></div>
                 <div className="col-span-2">
                    <label className="text-xs text-slate-500">区域</label>
                    <select className="w-full border rounded p-2 text-sm" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as Region})}>
                       <option value="Europe">Europe</option>
                       <option value="AsiaPacific">AsiaPacific</option>
                       <option value="Americas">Americas</option>
                       <option value="Africa">Africa</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Section 2: Location */}
           <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2 mb-2">地图坐标 & 资源</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-xs text-slate-500">纬度 (Lat)</label><input type="number" step="0.01" className="w-full border rounded p-2 text-sm" value={formData.coordinates?.lat} onChange={e => setFormData({...formData, coordinates: {...formData.coordinates!, lat: parseFloat(e.target.value)}})} /></div>
                 <div><label className="text-xs text-slate-500">经度 (Lng)</label><input type="number" step="0.01" className="w-full border rounded p-2 text-sm" value={formData.coordinates?.lng} onChange={e => setFormData({...formData, coordinates: {...formData.coordinates!, lng: parseFloat(e.target.value)}})} /></div>
                 <div className="col-span-2"><label className="text-xs text-slate-500">官网地址</label><input className="w-full border rounded p-2 text-sm" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} /></div>
                 
                 {/* Logo Upload */}
                 <div className="col-span-2">
                    <label className="text-xs text-slate-500">Logo (URL 或 上传图片)</label>
                    <div className="flex gap-2 mt-1">
                        <input className="flex-1 border rounded p-2 text-sm" placeholder="https://..." value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} />
                        <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded border border-slate-300 flex items-center gap-1 text-xs font-bold">
                            <Upload size={14} /> 上传
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                    </div>
                    {formData.logo && <img src={formData.logo} className="h-10 mt-2 object-contain border p-1 bg-white rounded" alt="Preview" />}
                 </div>
              </div>
           </div>

           {/* Section 3: Dynamic Fields */}
           <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2 mb-2">详细档案数据</h3>
              {fieldConfig.filter(f => f.section !== 'hidden').map(field => (
                 <div key={field.key}>
                    <label className="text-xs text-slate-500">{field.labelCN} / {field.labelEN}</label>
                    <textarea 
                      className="w-full border rounded p-2 text-sm min-h-[60px]" 
                      value={formData.info?.[field.key]?.value || ''}
                      onChange={e => updateInfoField(field.key, e.target.value)}
                    />
                 </div>
              ))}
              <div>
                 <label className="text-xs text-slate-500">核心业务 (用逗号分隔)</label>
                 <input 
                    className="w-full border rounded p-2 text-sm"
                    value={formData.info?.coreBusiness?.join(', ') || ''}
                    onChange={e => setFormData({...formData, info: {...formData.info!, coreBusiness: e.target.value.split(',').map(s => s.trim())} as any})}
                 />
              </div>
           </div>

           <div className="sticky bottom-0 bg-white p-4 border-t border-slate-200 flex gap-3">
              <button onClick={() => setEditingId(null)} className="flex-1 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 font-bold">取消</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center justify-center gap-2">
                 <Save size={16} /> 保存变更
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminEditor;