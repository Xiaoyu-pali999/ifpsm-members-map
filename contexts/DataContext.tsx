import React, { createContext, useContext, useState, useEffect } from 'react';
import { AssociationMember, FieldConfig, Language } from '../types';
import { MEMBERS_DATA, DEFAULT_FIELD_CONFIG } from '../constants';

interface DataContextType {
  members: AssociationMember[];
  fieldConfig: FieldConfig[];
  isAdminMode: boolean;
  language: Language;
  toggleAdminMode: () => void;
  toggleLanguage: () => void;
  addMember: (member: AssociationMember) => void;
  updateMember: (id: string, updates: Partial<AssociationMember>) => void;
  deleteMember: (id: string) => void;
  toggleMemberStatus: (id: string) => void;
  updateFieldConfig: (newConfig: FieldConfig[]) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MEMBERS: 'ifpsm_members_v3', // v3 with bilingual support
  CONFIG: 'ifpsm_field_config_v3'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<AssociationMember[]>([]);
  const [fieldConfig, setFieldConfig] = useState<FieldConfig[]>(DEFAULT_FIELD_CONFIG);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedMembers = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);

    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers(MEMBERS_DATA);
    }

    if (savedConfig) {
      setFieldConfig(JSON.parse(savedConfig));
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    }
  }, [members, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(fieldConfig));
    }
  }, [fieldConfig, isInitialized]);

  const addMember = (member: AssociationMember) => {
    setMembers(prev => [...prev, member]);
  };

  const updateMember = (id: string, updates: Partial<AssociationMember>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const toggleMemberStatus = (id: string) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ));
  };

  const updateFieldConfig = (newConfig: FieldConfig[]) => {
    setFieldConfig(newConfig);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const resetToDefaults = () => {
    if (confirm('确定要重置所有数据到初始状态吗？所有自定义修改将丢失。')) {
      setMembers(MEMBERS_DATA);
      setFieldConfig(DEFAULT_FIELD_CONFIG);
      localStorage.removeItem(STORAGE_KEYS.MEMBERS);
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
    }
  };

  return (
    <DataContext.Provider value={{
      members,
      fieldConfig,
      isAdminMode,
      language,
      toggleAdminMode: () => setIsAdminMode(prev => !prev),
      toggleLanguage,
      addMember,
      updateMember,
      deleteMember,
      toggleMemberStatus,
      updateFieldConfig,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};