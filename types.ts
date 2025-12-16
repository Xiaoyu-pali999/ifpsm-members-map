export type Region = 'Europe' | 'AsiaPacific' | 'Americas' | 'Africa';
export type MemberType = 'Member' | 'Affiliate';
export type MemberCategory = 'association' | 'corporate';
export type ActiveStatus = 'active' | 'inactive';
export type VerificationStatus = 'auto' | 'pending' | 'confirmed';

export interface Coordinates {
  lat: number;
  lng: number;
}

// 通用字段包装器（带状态和来源）
export interface Field<T = string> {
  value: T;
  status: VerificationStatus;
  source?: string; // e.g. "Official Website", "Annual Report"
}

// 深度信息结构 (Info Object)
export interface AssociationInfo {
  yearEstablished: Field;
  legalStatus: Field; // 组织性质
  foundingBackground: Field; // 发起背景
  governmentAffiliation: Field; // 政府关联 (高/中/低 + 描述)
  governance: Field; // 组织架构
  staffSize: Field; // 员工规模
  coreBusiness: string[]; // 核心业务 (Tags) -> 特殊处理，界面上单独显示
  flagshipPrograms: Field; // 品牌项目
  membershipScale: Field; // 会员规模
  industryCoverage: string[]; // 行业覆盖 -> 特殊处理
  influence: Field; // 影响力
  internationalEngagement: Field; // 国际参与
  achievements: Field; // 近三年成果
  [key: string]: Field | string[]; // Allow dynamic fields
}

// 核心数据模型
export interface AssociationMember {
  id: string;
  memberCategory: 'association' | 'corporate';
  memberType: MemberType;
  
  // 基础显示信息
  abbreviation: string;
  nameEN: string;
  nameCN: string;
  country: string;
  countryCN: string; 
  region: Region;
  coordinates: Coordinates;
  
  // 资源
  logo: string; // URL or Base64
  website: string;
  
  // 关键联系人
  seniorDelegate: string;
  contactEmail: string;

  // 系统控制
  status: ActiveStatus; // active = 显示, inactive = 隐藏

  // 深度信息 (可折叠)
  info: AssociationInfo;

  // 内部备注 (Local Storage)
  internalNotes?: string; 
}

// 字段配置 (CMS Config) - Updated for Bilingual Support
export interface FieldConfig {
  key: string;
  labelCN: string;
  labelEN: string;
  visible: boolean; // Is it shown on the card?
  section: 'basic' | 'background' | 'influence' | 'hidden'; // Which accordion/section it belongs to
  order: number;
}

export type GlobalMember = AssociationMember;

export interface MapViewState {
  zoom: number;
  center: [number, number];
}

export type Language = 'zh' | 'en';