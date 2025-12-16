import { AssociationMember, Region, FieldConfig } from './types';

export const REGION_COLORS: Record<Region, { fill: string; text: string; stroke: string }> = {
  Europe: { fill: '#3B82F6', text: '#1E40AF', stroke: '#60A5FA' }, // Blue
  AsiaPacific: { fill: '#F59E0B', text: '#B45309', stroke: '#FCD34D' }, // Amber
  Americas: { fill: '#10B981', text: '#065F46', stroke: '#34D399' }, // Emerald
  Africa: { fill: '#F43F5E', text: '#9F1239', stroke: '#FB7185' }, // Rose
};

export const AFFILIATE_STYLE = {
  fill: '#475569', // Slate 600
  stroke: '#94a3b8', // Slate 400
  text: '#334155',
};

// UI Translations Dictionary
export const UI_TRANSLATIONS = {
  zh: {
    systemTitle: '全球采购与供应链协会地图系统',
    systemSubtitle: 'Global Procurement & Supply Chain Management',
    clickToView: '点击标记查看',
    zoomToNav: '滚动缩放',
    unStandard: '符合联合国经社理事会 (UN ECOSOC) 标准',
    member: '正式会员',
    affiliate: '附属会员',
    delegate: '协会代表',
    email: '联系邮箱',
    website: '访问官方网站',
    coreBusiness: '核心业务',
    backgroundGovernance: '背景与治理架构',
    influenceAchievements: '行业影响力与成就',
    internalNote: '内部备注 (仅自己可见)',
    fullProfile: '展开查看完整背景档案',
    collapseProfile: '收起档案',
    mapLegend: '全球会员分布',
    regionEurope: '欧洲',
    regionAsiaPacific: '亚太地区',
    regionAmericas: '美洲',
    regionAfrica: '非洲',
    verified: '已确认',
    pending: '待核实',
    auto: '自动',
  },
  en: {
    systemTitle: 'Global Association Map System',
    systemSubtitle: 'Global Procurement & Supply Chain Management',
    clickToView: 'Click Marker to View',
    zoomToNav: 'Scroll to Zoom',
    unStandard: 'Aligned with UN ECOSOC Standards',
    member: 'Member',
    affiliate: 'Affiliate',
    delegate: 'Delegate',
    email: 'Email',
    website: 'Official Website',
    coreBusiness: 'Core Business',
    backgroundGovernance: 'Background & Governance',
    influenceAchievements: 'Influence & Achievements',
    internalNote: 'Internal Notes (Private)',
    fullProfile: 'View Full Profile',
    collapseProfile: 'Collapse Profile',
    mapLegend: 'Global Distribution',
    regionEurope: 'Europe',
    regionAsiaPacific: 'Asia-Pacific',
    regionAmericas: 'Americas',
    regionAfrica: 'Africa',
    verified: 'Verified',
    pending: 'Pending',
    auto: 'Auto',
  }
};

// ============================================================================
// 🌍 全球协会地图数据中心 (DATA CENTER)
// ============================================================================

const TBD = "信息未公开 / Information not publicly disclosed";
const field = (value: string, status: 'auto' | 'pending' | 'confirmed' = 'auto') => ({ value, status });

// CMS: 默认字段显示配置 (Bilingual)
export const DEFAULT_FIELD_CONFIG: FieldConfig[] = [
  // Basic Section (Key Stats area)
  { key: 'yearEstablished', labelCN: '成立时间', labelEN: 'Established', visible: true, section: 'basic', order: 1 },
  { key: 'legalStatus', labelCN: '组织性质', labelEN: 'Legal Status', visible: true, section: 'basic', order: 2 },
  { key: 'membershipScale', labelCN: '会员规模', labelEN: 'Members', visible: true, section: 'basic', order: 3 },
  { key: 'staffSize', labelCN: '员工规模', labelEN: 'Staff Size', visible: true, section: 'basic', order: 4 },
  
  // Background & Governance Accordion
  { key: 'foundingBackground', labelCN: '发起背景', labelEN: 'Founding Background', visible: true, section: 'background', order: 1 },
  { key: 'governmentAffiliation', labelCN: '政府关联', labelEN: 'Govt Affiliation', visible: true, section: 'background', order: 2 },
  { key: 'governance', labelCN: '治理结构', labelEN: 'Governance', visible: true, section: 'background', order: 3 },

  // Influence Accordion
  { key: 'flagshipPrograms', labelCN: '品牌活动', labelEN: 'Flagship Programs', visible: true, section: 'influence', order: 1 },
  { key: 'influence', labelCN: '行业地位', labelEN: 'Industry Influence', visible: true, section: 'influence', order: 2 },
  { key: 'internationalEngagement', labelCN: '国际参与', labelEN: 'Intl Engagement', visible: true, section: 'influence', order: 3 },
  { key: 'achievements', labelCN: '近期成就', labelEN: 'Key Achievements', visible: true, section: 'influence', order: 4 },
  
  // Hidden by default or specific handling
  { key: 'coreBusiness', labelCN: '核心业务', labelEN: 'Core Business', visible: true, section: 'hidden', order: 99 }, 
  { key: 'industryCoverage', labelCN: '行业覆盖', labelEN: 'Industry Coverage', visible: false, section: 'hidden', order: 99 },
];

export const MEMBERS_DATA: AssociationMember[] = [
  // ================= EUROPE (欧洲 - 22) =================
  {
    id: 'eu-1', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'ABCAL',
    nameEN: "Association francophone belge des Cadres d'Achat, de Logistique et Supply Chain", nameCN: '比利时采购、物流与供应链经理人协会', country: 'Belgium', countryCN: '比利时', region: 'Europe', coordinates: { lat: 50.6, lng: 4.3 },
    logo: 'https://logo.clearbit.com/abcal.org?size=512', website: 'https://www.abcal.org', seniorDelegate: 'GUELTON Jean-Louis', contactEmail: 'jlguelton@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("非营利协会"), foundingBackground: field(TBD), governmentAffiliation: field("低"), governance: field("理事会"), staffSize: field(TBD), coreBusiness: ['培训', '网络'], flagshipPrograms: field(TBD), membershipScale: field("1000+"), industryCoverage: ['物流'], influence: field("法语区核心"), internationalEngagement: field("EIPM"), achievements: field(TBD) }
  },
  {
    id: 'eu-2', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'ADACI',
    nameEN: 'ADACI ASSOCIAZIONE ITALIANA ACQUISTI E SUPPLY MANAGEMENT', nameCN: '意大利采购与供应管理协会', country: 'Italy', countryCN: '意大利', region: 'Europe', coordinates: { lat: 43.0, lng: 12.0 },
    logo: 'https://logo.clearbit.com/adaci.it?size=512', website: 'https://www.adaci.it', seniorDelegate: 'Paolo Marnoni', contactEmail: 'paolo.marnoni@adaci.it',
    info: { yearEstablished: field("1968", 'confirmed'), legalStatus: field("专业协会"), foundingBackground: field("促进行业文化"), governmentAffiliation: field("中"), governance: field("主席制"), staffSize: field("10-50"), coreBusiness: ['认证', '出版'], flagshipPrograms: field("CPO Summit"), membershipScale: field("3000+"), industryCoverage: ['全行业'], influence: field("意大利权威"), internationalEngagement: field("IFPSM"), achievements: field("PMI指数") }
  },
  {
    id: 'eu-3', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'AERCE',
    nameEN: 'ASOCIACIÓN ESPAÑOLA DE PROFESIONALES DE COMPRAS, CONTRATACIÓN Y APROVISIONAMIENTOS', nameCN: '西班牙采购、合同与供应专业协会', country: 'Spain', countryCN: '西班牙', region: 'Europe', coordinates: { lat: 40.0, lng: -4.0 },
    logo: 'https://logo.clearbit.com/aerce.org?size=512', website: 'https://www.aerce.org', seniorDelegate: 'FERRAN BAÑOS', contactEmail: 'fbanos@aerce.org',
    info: { yearEstablished: field("1981", 'confirmed'), legalStatus: field("专业协会"), foundingBackground: field(TBD), governmentAffiliation: field("中"), governance: field("董事会"), staffSize: field("20+"), coreBusiness: ['培训', '峰会'], flagshipPrograms: field("El Diamante"), membershipScale: field("5000+"), industryCoverage: ['全行业'], influence: field("西语区核心"), internationalEngagement: field("IFPSM"), achievements: field(TBD) }
  },
  {
    id: 'eu-4', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'APCADEC',
    nameEN: 'APCADEC - Associação Portuguesa de Compras e Aprovisionamento', nameCN: '葡萄牙采购与供应协会', country: 'Portugal', countryCN: '葡萄牙', region: 'Europe', coordinates: { lat: 39.5, lng: -8.0 },
    logo: 'https://logo.clearbit.com/apcadec.org.pt?size=512', website: 'https://www.apcadec.org.pt', seniorDelegate: 'João Botelho', contactEmail: 'joao.botelho@apcadec.org.pt',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field("低"), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['会议', '实践'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-5', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'BME',
    nameEN: 'BME - The Association for Supply Chain Management, Procurement and Logistics', nameCN: '德国联邦采购物流协会', country: 'Germany', countryCN: '德国', region: 'Europe', coordinates: { lat: 51.0, lng: 10.0 },
    logo: 'https://logo.clearbit.com/bme.de?size=512', website: 'https://www.bme.de', seniorDelegate: 'Lars Kleeberg', contactEmail: 'lars.kleeberg@bme.de',
    info: { yearEstablished: field("1954", 'confirmed'), legalStatus: field("注册协会"), foundingBackground: field("二战后重建"), governmentAffiliation: field("高 / 智库"), governance: field("联邦董事会"), staffSize: field("100+"), coreBusiness: ['B2B配对', '研究'], flagshipPrograms: field("BME Symposium"), membershipScale: field("9750企业"), industryCoverage: ['汽车', '机械'], influence: field("欧洲最大"), internationalEngagement: field("IFPSM"), achievements: field("创新奖") }
  },
  {
    id: 'eu-6', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'BMÖ',
    nameEN: 'BMÖ Bundesverband Materialwirtschaft Einkauf und Logistik in Österreich', nameCN: '奥地利物资管理、采购与物流联邦协会', country: 'Austria', countryCN: '奥地利', region: 'Europe', coordinates: { lat: 47.5, lng: 14.0 },
    logo: 'https://logo.clearbit.com/bmoe.at?size=512', website: 'https://www.bmoe.at', seniorDelegate: 'Dkfm. Heinz Pechek', contactEmail: 'heinz.pechek@aon.at',
    info: { yearEstablished: field(TBD), legalStatus: field("联邦协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['电子采购', '供应链'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-7', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'CAP (HUND)',
    nameEN: 'Croatian Association of Purchasing', nameCN: '克罗地亚采购协会', country: 'Croatia', countryCN: '克罗地亚', region: 'Europe', coordinates: { lat: 45.1, lng: 16.5 },
    logo: 'https://logo.clearbit.com/hund.hr?size=512', website: 'https://www.hund.hr', seniorDelegate: 'Mirela Senica', contactEmail: 'mirela.senica@hund.hr',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['教育', '年会'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-8', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'CNA',
    nameEN: 'Conseil national des Achats CNA', nameCN: '法国全国采购理事会', country: 'France', countryCN: '法国', region: 'Europe', coordinates: { lat: 47.0, lng: 2.0 },
    logo: 'https://logo.clearbit.com/cna-conseil-national-des-achats.fr?size=512', website: 'https://www.cna-conseil-national-des-achats.fr', seniorDelegate: 'Jean-Luc BARAS', contactEmail: 'Jean-Luc.BARAS@eiffage.com',
    info: { yearEstablished: field("1947", 'confirmed'), legalStatus: field("国家委员会"), foundingBackground: field("高管发起"), governmentAffiliation: field("高 / 经济部"), governance: field("国家理事会"), staffSize: field("50+"), coreBusiness: ['倡导', '网络'], flagshipPrograms: field("Crystal Awards"), membershipScale: field("15000+"), industryCoverage: ['奢侈品', '航空'], influence: field("最具影响力"), internationalEngagement: field("IFPSM"), achievements: field("负责任采购") }
  },
  {
    id: 'eu-9', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'FZUP',
    nameEN: 'Federation of Purchasing and Supply Management Russia', nameCN: '俄罗斯采购与供应管理联合会', country: 'Russia', countryCN: '俄罗斯', region: 'Europe', coordinates: { lat: 56.0, lng: 38.0 },
    logo: 'https://logo.clearbit.com/fzup.ru?size=512', website: '#', seniorDelegate: 'Dmitriy Lapin', contactEmail: 'lapindn@rambler.ru',
    info: { yearEstablished: field(TBD), legalStatus: field("联合会"), foundingBackground: field("重组中"), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['国家标准', '认证'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-10', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'HALPIM',
    nameEN: 'Hungarian Association of Logistics, Purchasing and Inventory Management', nameCN: '匈牙利物流、采购与库存管理协会', country: 'Hungary', countryCN: '匈牙利', region: 'Europe', coordinates: { lat: 47.0, lng: 19.5 },
    logo: 'https://logo.clearbit.com/halpim.hu?size=512', website: 'https://halpim.hu', seniorDelegate: 'Anita Kőhegyi', contactEmail: 'anita.kohegyi@logisztika.hu',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['物流', '库存管理'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-11', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'HPI',
    nameEN: 'HELLENIC PURCHASING INSTITUTE', nameCN: '希腊采购协会', country: 'Greece', countryCN: '希腊', region: 'Europe', coordinates: { lat: 39.0, lng: 22.0 },
    logo: 'https://logo.clearbit.com/hpi.gr?size=512', website: 'https://www.hpi.gr', seniorDelegate: 'Ignatios Michailidis', contactEmail: 'ignatios.michailidis@pepsico.com',
    info: { yearEstablished: field(TBD), legalStatus: field("学院"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['教育', '咨询'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-12', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'IPLMA',
    nameEN: 'Israeli Purchasing and Logistics Society', nameCN: '以色列采购与物流协会', country: 'Israel', countryCN: '以色列', region: 'Europe', coordinates: { lat: 31.5, lng: 35.0 },
    logo: 'https://logo.clearbit.com/iplma.org.il?size=512', website: 'https://iplma.org.il', seniorDelegate: 'Gil Zefoni', contactEmail: 'gil@zefoni.com',
    info: { yearEstablished: field(TBD), legalStatus: field("学会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['高科技采购'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: ['高科技'], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-13', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'LOGY',
    nameEN: 'The Finnish Association of Purchasing and Logistics LOGY ry', nameCN: '芬兰采购与物流协会', country: 'Finland', countryCN: '芬兰', region: 'Europe', coordinates: { lat: 62.0, lng: 26.0 },
    logo: 'https://logo.clearbit.com/logy.fi?size=512', website: 'https://www.logy.fi', seniorDelegate: 'Jyri Vilko', contactEmail: 'jyri.vilko@lut.fi',
    info: { yearEstablished: field(TBD), legalStatus: field("非营利协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['网络', '论坛'], flagshipPrograms: field("Annual Forum"), membershipScale: field("5000+"), industryCoverage: [], influence: field("最大网络"), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-14', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'NEVI',
    nameEN: 'Nevi B.V.', nameCN: '荷兰采购与供应管理协会', country: 'Netherlands', countryCN: '荷兰', region: 'Europe', coordinates: { lat: 52.5, lng: 5.5 },
    logo: 'https://logo.clearbit.com/nevi.nl?size=512', website: 'https://nevi.nl', seniorDelegate: 'Jeroen Hulsman', contactEmail: 'j.hulsman@nevi.nl',
    info: { yearEstablished: field("1956", 'confirmed'), legalStatus: field("专业机构"), foundingBackground: field(TBD), governmentAffiliation: field("中 / 公共采购"), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['公共采购', '认证'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field("全球思想领袖"), internationalEngagement: field("IFPSM"), achievements: field(TBD) }
  },
  {
    id: 'eu-15', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'PROCURE.CH',
    nameEN: 'procure.ch', nameCN: '瑞士采购协会', country: 'Switzerland', countryCN: '瑞士', region: 'Europe', coordinates: { lat: 46.8, lng: 8.2 },
    logo: 'https://logo.clearbit.com/procure.ch?size=512', website: 'https://procure.ch', seniorDelegate: 'Kyburz Andreas', contactEmail: 'kyburz@procure.ch',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['SME采购', '网络'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-16', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'PROLOG',
    nameEN: 'Eesti Tarneahelate Juhtimise Ühing PROLOG', nameCN: '爱沙尼亚供应链管理协会', country: 'Estonia', countryCN: '爱沙尼亚', region: 'Europe', coordinates: { lat: 59.0, lng: 25.5 },
    logo: 'https://logo.clearbit.com/prolog.ee?size=512', website: 'https://prolog.ee', seniorDelegate: 'Tõnis Hintsov', contactEmail: 'tonis.hintsov@prolog.ee',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['数字化', '初创配对'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-17', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'PSML',
    nameEN: 'PSML POLISH SUPPLY MANAGEMENT LEADERS', nameCN: '波兰供应管理领导者协会', country: 'Poland', countryCN: '波兰', region: 'Europe', coordinates: { lat: 52.0, lng: 20.0 },
    logo: 'https://logo.clearbit.com/psml.pl?size=512', website: 'https://psml.pl', seniorDelegate: 'Andrzej Zawistowski', contactEmail: 'andrzej.zawistowski@psml.pl',
    info: { yearEstablished: field(TBD), legalStatus: field("非营利"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['领导力', '教育'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-18', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'SILF',
    nameEN: 'The Swedish Purchasing and Logistics Association', nameCN: '瑞典采购与物流协会', country: 'Sweden', countryCN: '瑞典', region: 'Europe', coordinates: { lat: 60.0, lng: 15.0 },
    logo: 'https://logo.clearbit.com/silf.se?size=512', website: 'https://www.silf.se', seniorDelegate: 'Sofia Andersson', contactEmail: 'sofia.andersson@silf.se',
    info: { yearEstablished: field(TBD), legalStatus: field("行业协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['能力认证', '企业培训'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-19', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'Tusayder',
    nameEN: 'Satinalma Profesyonelleri ve Yoneticileri Dernegi', nameCN: '土耳其采购专业人士与管理者协会', country: 'Turkey', countryCN: '土耳其', region: 'Europe', coordinates: { lat: 40.0, lng: 29.0 },
    logo: 'https://logo.clearbit.com/tusayder.org?size=512', website: 'https://tusayder.org', seniorDelegate: 'Ediz KAPLAN', contactEmail: 'ediz.kaplan@tusayder.org',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['发展', '网络'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-20', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'TÜSMOD',
    nameEN: 'SATINALMA VE TEDARİK YÖNETİMİ DERNEĞİ', nameCN: '土耳其采购与供应管理协会', country: 'Turkey', countryCN: '土耳其', region: 'Europe', coordinates: { lat: 38.0, lng: 34.0 },
    logo: 'https://logo.clearbit.com/tusmod.org?size=512', website: 'https://www.tusmod.org', seniorDelegate: 'Gurkan Huryilmaz', contactEmail: 'gurkan.huryilmaz@tusmod.org',
    info: { yearEstablished: field(TBD), legalStatus: field("专业学会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['CPO圆桌', '标准'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'eu-21', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'ZNS',
    nameEN: 'ZNS-Združenje nabavnikov Slovenije', nameCN: '斯洛文尼亚采购协会', country: 'Slovenia', countryCN: '斯洛文尼亚', region: 'Europe', coordinates: { lat: 46.1, lng: 14.8 },
    logo: 'https://logo.clearbit.com/zns-zdruzenje.si?size=512', website: 'https://zns-zdruzenje.si', seniorDelegate: 'Marina Lindič', contactEmail: 'marina.lindic@zns-zdruzenje.si',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['区域会议', '最佳实践'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  
  // ================= ASIA-PACIFIC (亚太地区 - 10) =================
  {
    id: 'ap-1', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'CFLP',
    nameEN: 'China Federation of Logistics and Purchasing', nameCN: '中国物流与采购联合会', country: 'China', countryCN: '中国', region: 'AsiaPacific', coordinates: { lat: 35.0, lng: 105.0 },
    logo: 'https://logo.clearbit.com/cflp.org.cn?size=512', website: 'http://www.cflp.org.cn', seniorDelegate: 'Cai Jin', contactEmail: 'cflp@cflp.org.cn',
    info: { yearEstablished: field("2001", 'confirmed'), legalStatus: field("行业联合会"), foundingBackground: field("原物资部转制"), governmentAffiliation: field("极高"), governance: field("会员代表大会"), staffSize: field("200+"), coreBusiness: ['PMI指数', 'A级评估', '统计'], flagshipPrograms: field("全球峰会"), membershipScale: field("10000+"), industryCoverage: ['物流', '采购'], influence: field("最权威机构"), internationalEngagement: field("IFPSM亚太"), achievements: field("国家标准") }
  },
  {
    id: 'ap-2', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'IAPI',
    nameEN: 'INDONESIA PROCUREMENT PROFFESIONAL ASSOCIATION (IAPI)', nameCN: '印度尼西亚采购专业协会', country: 'Indonesia', countryCN: '印度尼西亚', region: 'AsiaPacific', coordinates: { lat: -5.0, lng: 110.0 },
    logo: 'https://logo.clearbit.com/iapi.or.id?size=512', website: 'https://iapi.or.id', seniorDelegate: 'Bapak Agus Prabowo', contactEmail: 'prabowo2009@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("专业协会"), foundingBackground: field(TBD), governmentAffiliation: field("高 / 认证"), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['认证', '咨询'], flagshipPrograms: field("National Summit"), membershipScale: field("数千"), industryCoverage: ['政府'], influence: field("公共采购守门人"), internationalEngagement: field("IFPSM"), achievements: field(TBD) }
  },
  {
    id: 'ap-3', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'IIMM',
    nameEN: 'INDIAN INSTITUTE OF MATERIALS MANAGEMENT', nameCN: '印度物资管理协会', country: 'India', countryCN: '印度', region: 'AsiaPacific', coordinates: { lat: 22.0, lng: 79.0 },
    logo: 'https://logo.clearbit.com/iimm.org?size=512', website: 'https://www.iimm.org', seniorDelegate: 'MR. LALBHAI PATEL', contactEmail: 'lppatel09@yahoo.com',
    info: { yearEstablished: field(TBD), legalStatus: field("学院"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['GDMM课程', '教育'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'ap-4', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'IPSHK',
    nameEN: 'The Institute of Purchasing & Supply of Hong Kong', nameCN: '中国香港物资采购与供销学会', country: 'Hong Kong', countryCN: '中国香港', region: 'AsiaPacific', coordinates: { lat: 22.3, lng: 114.2 },
    logo: 'https://logo.clearbit.com/ipshk.org?size=512', website: 'https://ipshk.org', seniorDelegate: 'Dr Stephen Ng', contactEmail: 'drswkng@netvigator.com',
    info: { yearEstablished: field("1973", 'confirmed'), legalStatus: field("专业学会"), foundingBackground: field(TBD), governmentAffiliation: field("低"), governance: field("理事会"), staffSize: field("10-20"), coreBusiness: ['研讨会', '网络'], flagshipPrograms: field("年会"), membershipScale: field("1000+"), industryCoverage: ['贸易'], influence: field("桥梁"), internationalEngagement: field("IFPSM"), achievements: field(TBD) }
  },
  {
    id: 'ap-5', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'ISMM',
    nameEN: 'Institute of Supply and Materials Management', nameCN: '斯里兰卡供应与物资管理学会', country: 'Sri Lanka', countryCN: '斯里兰卡', region: 'AsiaPacific', coordinates: { lat: 7.0, lng: 81.0 },
    logo: 'https://logo.clearbit.com/ismm.edu.lk?size=512', website: 'http://www.ismm.edu.lk', seniorDelegate: 'Lilantha Subasinghe', contactEmail: 'lilantha.subasinghe@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("学院"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['培训', '文凭'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'ap-6', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'MIPMM',
    nameEN: 'Malaysian Institute of Purchasing & Materials Management- MIPMM', nameCN: '马来西亚采购与物资管理学会', country: 'Malaysia', countryCN: '马来西亚', region: 'AsiaPacific', coordinates: { lat: 4.0, lng: 102.0 },
    logo: 'https://logo.clearbit.com/mipmm.org.my?size=512', website: 'https://mipmm.org.my', seniorDelegate: 'YANG CHOR LEONG', contactEmail: 'yang.chorleong@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("学会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['认证', '咨询'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'ap-7', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'PASIA',
    nameEN: 'Procurement and Supply Institute of Asia, Inc.', nameCN: '亚洲采购与供应研究院', country: 'Philippines', countryCN: '菲律宾', region: 'AsiaPacific', coordinates: { lat: 13.0, lng: 122.0 },
    logo: 'https://logo.clearbit.com/pasia.org?size=512', website: 'https://pasia.org', seniorDelegate: 'Charlie Villasenor', contactEmail: 'charlie.villasenor@pasia.org',
    info: { yearEstablished: field(TBD), legalStatus: field("区域机构"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['道德认证', '峰会'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field("东盟网络"), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'ap-8', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'PISM',
    nameEN: 'Philippine Institute for Supply Management', nameCN: '菲律宾供应管理协会', country: 'Philippines', countryCN: '菲律宾', region: 'AsiaPacific', coordinates: { lat: 10.0, lng: 125.0 },
    logo: 'https://logo.clearbit.com/pism.org?size=512', website: 'https://pism.org', seniorDelegate: 'Gerard Magadia', contactEmail: 'ggmagadia@hoi.com.ph',
    info: { yearEstablished: field(TBD), legalStatus: field("国家学会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['颁奖', '发展'], flagshipPrograms: field("Gawad Sinop"), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'ap-9', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'PSCMT',
    nameEN: 'Purchasing and Supply Chain Management Association of Thailand (PSCMT)', nameCN: '泰国采购与供应链管理协会', country: 'Thailand', countryCN: '泰国', region: 'AsiaPacific', coordinates: { lat: 15.0, lng: 101.0 },
    logo: 'https://logo.clearbit.com/pscmt.or.th?size=512', website: 'https://www.pscmt.or.th', seniorDelegate: 'AKANIT SMITABINDU', contactEmail: 'akanit@pscmt.or.th',
    info: { yearEstablished: field(TBD), legalStatus: field("协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['培训', '高校合作'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'ap-10', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'TASS',
    nameEN: 'TASS (Taiwan Alliance for Sustainable Supply)', nameCN: '中国台湾永续供应联盟', country: 'Taiwan', countryCN: '中国台湾', region: 'AsiaPacific', coordinates: { lat: 24.0, lng: 121.0 },
    logo: 'https://logo.clearbit.com/tass.org.tw?size=512', website: 'https://www.tass.org.tw', seniorDelegate: 'Shu-Shin (Steve) LAI', contactEmail: 'Steve.Lai@go-tass.org',
    info: { yearEstablished: field(TBD), legalStatus: field("联盟"), foundingBackground: field("高科技供应链"), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['ESG', '永续'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: ['半导体'], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },

  // ================= AMERICAS (美洲 - 3) =================
  {
    id: 'am-1', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'APROCAL',
    nameEN: 'Asociación de Profesionales en Compras, Abastecimiento y Logistica, A.C. (APROCAL)', nameCN: '墨西哥采购、供应与物流专业协会', country: 'Mexico', countryCN: '墨西哥', region: 'Americas', coordinates: { lat: 23.0, lng: -102.0 },
    logo: 'https://logo.clearbit.com/aprocal.org.mx?size=512', website: 'https://aprocal.org.mx', seniorDelegate: 'Cesar Leal', contactEmail: 'cesare_leal@hotmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("专业协会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['拉美网络', '认证'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'am-2', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'CBEC',
    nameEN: 'CONSELHO BRASILEIRO DOS EXECUTIVOS DE COMPRAS- CBEC', nameCN: '巴西采购高管委员会', country: 'Brazil', countryCN: '巴西', region: 'Americas', coordinates: { lat: -10.0, lng: -55.0 },
    logo: 'https://logo.clearbit.com/cbec.org.br?size=512', website: 'https://cbec.org.br', seniorDelegate: 'LISLEY PÓLVORA', contactEmail: 'lisley.polvora@cbec.org.br',
    info: { yearEstablished: field(TBD), legalStatus: field("委员会"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['高管论坛', '市场'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'am-3', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'SCC',
    nameEN: 'Supply Chain Canada', nameCN: '加拿大供应链协会', country: 'Canada', countryCN: '加拿大', region: 'Americas', coordinates: { lat: 60.0, lng: -110.0 },
    logo: 'https://logo.clearbit.com/supplychaincanada.com?size=512', website: 'https://supplychaincanada.com', seniorDelegate: 'Dylan Bartlett', contactEmail: 'dbartlett@supplychaincanada.com',
    info: { yearEstablished: field("1919", 'confirmed'), legalStatus: field("非营利"), foundingBackground: field(TBD), governmentAffiliation: field("中"), governance: field("理事会"), staffSize: field("50+"), coreBusiness: ['SCMP认证', '年会'], flagshipPrograms: field("National Conf"), membershipScale: field("7500+"), industryCoverage: ['能源', '制造'], influence: field("百年历史"), internationalEngagement: field("北美代表"), achievements: field("认证体系") }
  },

  // ================= AFRICA (非洲 - 5) =================
  {
    id: 'af-1', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'AMCA',
    nameEN: 'Association Marocaine de la Communauté Achats AMCA', nameCN: '摩洛哥采购社团协会', country: 'Morocco', countryCN: '摩洛哥', region: 'Africa', coordinates: { lat: 32.0, lng: -6.0 },
    logo: 'https://logo.clearbit.com/amca.ma?size=512', website: 'https://amca.ma', seniorDelegate: 'Yassine SERHANI', contactEmail: 'serhani.yassine16@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("社团"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['俱乐部', '北非网络'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'af-2', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'CIPSMN',
    nameEN: 'CHARTERED INSTITUTE OF PURCHASING AND SUPPLY MANAGEMENT OF NIGERIA', nameCN: '尼日利亚采购与供应管理特许协会', country: 'Nigeria', countryCN: '尼日利亚', region: 'Africa', coordinates: { lat: 10.0, lng: 8.0 },
    logo: 'https://logo.clearbit.com/cipsmn.com?size=512', website: 'https://cipsmn.com', seniorDelegate: 'ALHAJI MOHAMMED JIMOH ALIYU', contactEmail: 'mohamedjimohalliyu@yahoo.com',
    info: { yearEstablished: field(TBD), legalStatus: field("特许学会"), foundingBackground: field(TBD), governmentAffiliation: field("高 / 立法特许"), governance: field("理事会"), staffSize: field(TBD), coreBusiness: ['特许认证', '考试'], flagshipPrograms: field("Induction"), membershipScale: field("全国"), industryCoverage: ['公共部门'], influence: field("西非核心"), internationalEngagement: field("非洲联盟"), achievements: field("公共采购法") }
  },
  {
    id: 'af-3', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'CISCM',
    nameEN: 'Chartered Institute of Supply Chain Management (CISCM)', nameCN: '加纳供应链管理特许协会', country: 'Ghana', countryCN: '加纳', region: 'Africa', coordinates: { lat: 8.0, lng: -1.0 },
    logo: 'https://logo.clearbit.com/ciscmgh.org?size=512', website: 'https://ciscmgh.org', seniorDelegate: 'Richard Obeng Okrah', contactEmail: 'okrahrichard@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("专业机构"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['西非整合', '教育'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'af-4', memberCategory: 'association', status: 'active', memberType: 'Member', abbreviation: 'IPPU',
    nameEN: 'Institute of Procurement Professionals of Uganda', nameCN: '乌干达采购专业协会', country: 'Uganda', countryCN: '乌干达', region: 'Africa', coordinates: { lat: 1.5, lng: 32.0 },
    logo: 'https://logo.clearbit.com/ippu.or.ug?size=512', website: 'https://ippu.or.ug', seniorDelegate: 'Pelly Mugasi', contactEmail: 'Levi.kabagambe@gmail.com',
    info: { yearEstablished: field(TBD), legalStatus: field("专业机构"), foundingBackground: field(TBD), governmentAffiliation: field(TBD), governance: field(TBD), staffSize: field(TBD), coreBusiness: ['监管', 'CPD'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },
  {
    id: 'af-5', memberCategory: 'association', status: 'active', memberType: 'Affiliate', abbreviation: 'PSPTB',
    nameEN: 'Procurement and Supplies Professionals and Technicians Board (PSPTB)', nameCN: '坦桑尼亚采购与供应专业技术局', country: 'Tanzania', countryCN: '坦桑尼亚', region: 'Africa', coordinates: { lat: -6.0, lng: 35.0 },
    logo: 'https://logo.clearbit.com/psptb.go.tz?size=512', website: 'https://www.psptb.go.tz', seniorDelegate: 'Godfred Mbanyi', contactEmail: 'godfred.mbanyi@psptb.go.tz',
    info: { yearEstablished: field("2007", 'confirmed'), legalStatus: field("法定机构"), foundingBackground: field(TBD), governmentAffiliation: field("高 / 法定"), governance: field("董事会"), staffSize: field(TBD), coreBusiness: ['发证', '考试', '认证'], flagshipPrograms: field(TBD), membershipScale: field(TBD), industryCoverage: [], influence: field(TBD), internationalEngagement: field(TBD), achievements: field(TBD) }
  },

  // ================= AFFILIATES (欧洲附属会员 - 1) =================
  {
    id: 'aff-eu-1', memberCategory: 'association', status: 'active', memberType: 'Affiliate', abbreviation: 'EIPM',
    nameEN: 'The European Institute of Purchasing Management', nameCN: '欧洲采购管理学院', country: 'France', countryCN: '法国', region: 'Europe', coordinates: { lat: 46.1368, lng: 6.1307 },
    logo: 'https://logo.clearbit.com/eipm.org?size=512', website: 'https://www.eipm.org', seniorDelegate: 'Bernard Gracia', contactEmail: 'bgracia@eipm.org',
    info: { yearEstablished: field("1990", 'confirmed'), legalStatus: field("教育研究机构"), foundingBackground: field(TBD), governmentAffiliation: field("低"), governance: field(TBD), staffSize: field("50+"), coreBusiness: ['MBA教育', 'Kraljic奖'], flagshipPrograms: field("Kraljic Awards"), membershipScale: field("全球学员"), industryCoverage: ['学术'], influence: field("顶尖商学院"), internationalEngagement: field("全球"), achievements: field(TBD) }
  }
];

export const ASSOCIATIONS = MEMBERS_DATA;