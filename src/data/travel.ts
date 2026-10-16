// 旅行记录按真实 adcode 匹配；省略 visited 的旧记录默认已去过。
// 省级与下级记录独立：visited: false 的省份也可登记 areas。
// 统计只计入与地图匹配的唯一行政区，名称仅为无 adcode 的旧省级记录提供回退。

export interface TravelPhoto {
  src: string
  alt?: string
}

export interface TravelAreaVisit {
  /** 下一级行政区划代码，例如杭州市 330100。匹配只认这个字段。 */
  adcode: number
  /** 是否已去过；旧记录省略时按已去过处理。 */
  visited?: boolean
  /** 显示用名称；留空时用地图数据里的名称 */
  name?: string
  /** 前往日期，如 "2025-08"、"2025-08-12"，可多段 */
  dates?: string[]
  /** 地区简介；与个人旅行备注分开维护。 */
  description?: string
  /** 个人旅行备注 */
  notes?: string
  /** 封面图地址 */
  cover?: string
  /** 照片列表 */
  photos?: TravelPhoto[]
}

export interface TravelVisit {
  /** 省级名称，用于显示 */
  name: string
  /** 省级行政区划代码。建议填写，页面靠它校对记录与地图数据是否对得上。 */
  adcode?: number
  /** 省略时默认已去过；false 不影响独立的下级记录。 */
  visited?: boolean
  /** 前往日期，如 "2025-08"、"2025-08-12"，可多段 */
  dates?: string[]
  /** 途经城市，按行程顺序排列 */
  cities?: string[]
  /** 前往过的下一级行政区（地级市 / 自治州 / 地区 / 市辖区） */
  areas?: TravelAreaVisit[]
  /** 地区简介；与个人旅行备注分开维护。 */
  description?: string
  /** 个人旅行备注 */
  notes?: string
  /** 封面图地址 */
  cover?: string
  /** 照片列表 */
  photos?: TravelPhoto[]
}

/** 已访问的省份。按时间先后顺序书写即可，展示时不受此顺序限制。 */
export const visits: TravelVisit[] = [
  {
    name: "青海省",
    description: "高原、湖泊与雪山交织，辽阔的自然景观让旅途多了几分开阔与宁静。",
    adcode: 630000,
    cover: "/images/travel/青海/青海湖.jpg",
    areas: [
      { adcode: 632800, description: "戈壁、盐湖与雪山铺展开辽阔的高原景观，视野所及常有天地相接的开阔感。", cover: "/images/travel/青海/海西.jpg" },
      { adcode: 630100, description: "高原城市的日常与多元文化交汇，是认识青海风土的一处起点。", cover: "/images/travel/青海/西宁.jpg" },
      { adcode: 632500, description: "草原、河谷与湖泊相连，风景开阔，也保留着浓郁的高原气息。", cover: "/images/travel/青海/海南.jpg" },
      { adcode: 630200, description: "黄河谷地与高原地貌相接，既有沿河风景，也有鲜明的地方生活。", cover: "/images/travel/青海/海东.jpg" },
      { adcode: 632200, description: "草原、湖泊和远山构成清朗的高原画面，季节变化尤其动人。", cover: "/images/travel/青海/海北.jpg" },
    ],
    cities: ["西宁", "海东", "海西", "海南", "海北"],
  },
  {
    name: "甘肃省",
    description: "沿着河西走廊穿行，戈壁、丹霞与丝路遗迹留下鲜明的西北印象。",
    adcode: 620000,
    cover: "/images/travel/甘肃/甘肃.jpg",
    areas: [
      { adcode: 620900, description: "位于河西走廊西段，戈壁风光与丝路历史共同构成这里的辽阔气质。", cover: "/images/travel/甘肃/酒泉.jpg" },
      { adcode: 620700, description: "丹霞地貌色彩鲜明，绿洲与戈壁相邻，是河西走廊上颇具代表性的风景。", cover: "/images/travel/甘肃/张掖.jpg" },
    ],
    cities: ["酒泉", "张掖"],
  },
  {
    name: "云南省",
    description: "山川、古城与多元文化相映成趣，每一段路程都有不同的风景与节奏。",
    adcode: 530000,
    cover: "/images/travel/云南/云南.jpg",
    areas: [
      { adcode: 530100, description: "气候温和、城市节奏舒缓，街巷生活与湖山景致相距不远。", cover: "/images/travel/云南/昆明.jpg" },
      { adcode: 533400, description: "雪山、峡谷与藏地风情交织，高原景观带来宁静而辽阔的感受。", cover: "/images/travel/云南/迪庆.jpg" },
      { adcode: 532900, description: "苍山洱海之间，古城街巷与湖畔风景构成从容的旅行节奏。", cover: "/images/travel/云南/大理.jpg" },
      { adcode: 530700, description: "古城、雪山与纳西文化相互映衬，街巷里总能遇见独特的地方气息。", cover: "/images/travel/云南/丽江.jpg" },
      { adcode: 530400, description: "湖泊与山地环绕，城市生活之外也有安静舒展的自然风景。", cover: "/images/travel/云南/玉溪.jpg" },
      { adcode: 532300, description: "山地风光与彝族文化相伴，展现出鲜明而多彩的地方特色。", cover: "/images/travel/云南/楚雄.jpg" },
    ],
    cities: ["昆明", "大理", "丽江", "玉溪", "迪庆", "楚雄"],
  },
  {
    name: "四川省",
    description: "从城市烟火到雪山草原，丰富的地貌让旅行体验层次分明。",
    adcode: 510000,
    cover: "/images/travel/四川/四川.jpg",
    areas: [
      { adcode: 510100, description: "茶馆、街巷与美食构成悠闲的城市日常，也是一座不断更新的现代都市。", cover: "/images/travel/四川/成都.jpg" },
      { adcode: 512000, description: "川中丘陵间的城市，节奏平实，保留着贴近日常的生活气息。", cover: "/images/travel/四川/资阳.jpg" },
      { adcode: 511400, description: "东坡文化与川西平原风光相伴，城市里透着温和而闲适的气质。", cover: "/images/travel/四川/眉山.jpg" },
      { adcode: 511100, description: "山水与人文景观交汇，既有江河风光，也有深厚的历史底蕴。", cover: "/images/travel/四川/乐山.jpg" },
      { adcode: 510600, description: "工业城市气质与川西平原风貌并存，展现出务实而鲜明的城市性格。", cover: "/images/travel/四川/德阳.jpg" },
      { adcode: 510700, description: "山水环绕、生活节奏舒适，也以科技与创新氛围闻名。", cover: "/images/travel/四川/绵阳.jpg" },
      { adcode: 513200, description: "雪山、草原与峡谷构成壮阔风景，藏羌文化也为旅途增添独特层次。", cover: "/images/travel/四川/阿坝.jpg" },
    ],
    cities: ["成都", "资阳", "眉山", "乐山", "德阳", "绵阳", "阿坝"],
  },
  {
    name: "重庆市",
    description: "山城地形与热闹街巷交织，步行转角间常能遇见不同的城市风景。",
    adcode: 500000,
    cover: "/images/travel/重庆/重庆.jpg",
    areas: [
      { adcode: 500101, description: "依山临江，长江沿岸的城市风景开阔而有层次。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500102, description: "乌江与长江在此交汇，江岸风光和地方生活共同构成城市印象。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500103, description: "重庆城市地形与街巷文化的缩影，楼宇、坡道和江景交错出现。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500104, description: "保留着工业城市的记忆，也在持续生长出新的城市空间。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500105, description: "江岸景观与繁华商圈并行，是观察重庆现代都市面貌的好地方。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500106, description: "校园、老街与城市生活交织，既有青春气息，也有浓厚的人文氛围。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500107, description: "城市生活丰富多样，街区文化和日常烟火气都很鲜明。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500108, description: "隔江眺望渝中半岛，江岸步道与城市天际线相映成景。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500109, description: "山水环境清幽，既有城市生活，也保留着从容的自然气息。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500110, description: "山地与河谷相伴，城市周边的自然风光质朴而舒展。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500111, description: "石刻艺术与历史遗迹闻名，文化景观为旅途留下深刻印象。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500112, description: "现代城市发展迅速，交通枢纽与生活街区共同展现重庆的新面貌。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500113, description: "山林、温泉与城市生活相邻，适合在繁忙行程中感受自然一面。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500114, description: "武陵山区的山水风光与土家族、苗族文化交织，地方特色浓郁。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500115, description: "依江而生，湖岸与城市生活相连，整体氛围舒缓宜人。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500116, description: "长江沿岸风景悠长，山地与河谷让城市周边多了几分开阔。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500117, description: "嘉陵江、渠江与涪江汇流，水岸景观与历史文化相互映衬。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500118, description: "城市生活便利，周边自然与人文景点也为短途旅行提供了丰富选择。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500119, description: "山地景观突出，森林与高山风光让人感受到重庆的清凉一面。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500120, description: "城市环境清新，公园与山水空间让生活节奏显得更加舒适。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500151, description: "历史文化与现代城市生活相融，地方民俗也颇具特色。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500152, description: "田园风光与涪江水系相伴，展现出安静朴实的川渝乡土气息。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500153, description: "传统手工艺与地方饮食文化鲜明，城市风貌亲切而有辨识度。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500154, description: "山水环抱，汉丰湖与周边自然景观让城市显得开阔舒展。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500155, description: "田园景致与湿地风光相连，节奏平和，适合慢慢感受地方生活。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500156, description: "喀斯特地貌雄奇壮观，峡谷、天坑与山林构成极具冲击力的自然风景。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500229, description: "地处大巴山腹地，森林与高山风光保留着清静、原生的气息。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500230, description: "长江沿岸风景与民俗文化交织，历史传说为城市增添独特记忆。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500231, description: "丘陵与平坝相间，城市生活平实，也有舒展的乡野风景。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500233, description: "长江穿城而过，江岸风光与三峡地区的历史脉络相连。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500235, description: "峡江、山城与历史遗迹相映，沿江风景尤其开阔。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500236, description: "瞿塘峡与夔门气势雄浑，山水景观里带着浓厚的诗意与历史感。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500237, description: "峡谷与江水构成典型的三峡风光，群山之间层次分明。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500238, description: "山地河谷风景清幽，保留着峡谷地区朴素而安静的气息。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500240, description: "山地风光与土家族文化并存，民俗和自然景致都很有特色。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500241, description: "武陵山区的山水与土苗风情相伴，边城气息鲜明。", cover: "/images/travel/重庆/重庆各区.jpg" },
      { adcode: 500242, description: "古镇、山林与土苗文化交织，适合在慢行中感受地方风情。", cover: "/images/travel/重庆/重庆各区.jpg" }, { adcode: 500243, description: "乌江峡谷与民族文化相映，山水景观富有层次。", cover: "/images/travel/重庆/重庆各区.jpg" },
    ],
  },
  {
    name: "北京市",
    description: "古都底蕴与现代生活并行，历史建筑和城市街区共同构成独特的北京。",
    adcode: 110000,
    cover: "/images/travel/北京/北京.jpg",
    areas: [
      { adcode: 110101, description: "胡同、城墙与历史街区密集分布，老北京的城市记忆在这里清晰可见。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110102, description: "老街巷与城市公共生活交织，传统北京的韵味融入日常。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110105, description: "现代都市面貌鲜明，商业、文化与国际化生活汇聚于此。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110106, description: "城市街区与历史遗迹相邻，展现出北京多元发展的另一面。", cover: "/images/travel/北京/北京各区.jpg" },
      { adcode: 110107, description: "工业记忆与山地公园相伴，城市空间里保留着独特的转型气息。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110108, description: "校园、科研机构与历史园林交织，文化与创新氛围浓厚。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110109, description: "群山环绕，古道与村落散落其间，是北京亲近山野的一处去处。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110111, description: "自然山水与历史文化资源丰富，城市之外也有开阔的游览空间。", cover: "/images/travel/北京/北京各区.jpg" },
      { adcode: 110112, description: "运河文化延续至今，城市建设与水岸空间共同塑造新城风貌。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110113, description: "城市生活与近郊田园相连，环境开阔，节奏相对舒展。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110114, description: "山水、古迹与新城并存，能看到北京从历史走向现代的多重面貌。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110115, description: "城市发展迅速，现代交通与新兴城区构成鲜明的时代感。", cover: "/images/travel/北京/北京各区.jpg" },
      { adcode: 110116, description: "山林、湖泊与长城景观相伴，是北京北部颇具代表性的自然风景区。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110117, description: "山地与田园风光开阔，春秋时节尤其适合感受近郊自然。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110118, description: "水库、山林与长城相映，景色清朗，也保留着远离市中心的宁静。", cover: "/images/travel/北京/北京各区.jpg" }, { adcode: 110119, description: "山地、长城与草木风光交织，四季变化带来不同的旅行体验。", cover: "/images/travel/北京/北京各区.jpg" },
    ],
  },
  {
    name: "天津市",
    description: "海河沿岸与近代建筑勾勒出城市风貌，生活气息里带着鲜明的地方特色。",
    adcode: 120000,
    cover: "/images/travel/天津/天津.jpg",
    areas: [
      { adcode: 120101, description: "近代建筑与繁华街区相连，是感受天津城市历史与都市生活的窗口。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120102, description: "海河沿岸与老城生活交织，保留着天津朴实而鲜活的城市气息。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120103, description: "城市公共空间与生活街区相邻，呈现出舒展、宜居的城区面貌。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120104, description: "校园、历史遗迹与商业街区并存，人文气息浓厚。", cover: "/images/travel/天津/天津各区.jpg" },
      { adcode: 120105, description: "海河风景与近代城市记忆相伴，街区里能读到天津发展的痕迹。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120106, description: "老街区与运河文化相连，城市历史感和生活气息都很鲜明。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120110, description: "城市新区与湿地空间并存，展现天津持续扩展的城市面貌。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120111, description: "传统文化与现代城区相融，城市边缘仍保留着亲切的生活节奏。", cover: "/images/travel/天津/天津各区.jpg" },
      { adcode: 120112, description: "水系与新城建设交错，呈现出天津南部不断发展的城市景观。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120113, description: "居住街区与产业空间并行，日常生活氛围平实而便利。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120114, description: "连接天津与周边城市，城市发展与近郊生活在此交汇。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120115, description: "运河文化与平原风光相伴，城市节奏显得从容安静。", cover: "/images/travel/天津/天津各区.jpg" },
      { adcode: 120116, description: "海岸线、港口与现代城区共同构成开放而开阔的滨海风景。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120117, description: "湿地与水乡风光相连，自然环境为近郊旅程增添清新感。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120118, description: "平原田园与城镇生活相伴，呈现出天津西南部质朴的一面。", cover: "/images/travel/天津/天津各区.jpg" }, { adcode: 120119, description: "山川、长城与古村落构成天津少见的山地景观，四季各有风貌。", cover: "/images/travel/天津/天津各区.jpg" },
    ],
  },
  {
    name: "上海市",
    description: "街区、江岸与摩登天际线并置，城市总能在熟悉与新鲜之间切换。",
    adcode: 310000,
    cover: "/images/travel/上海/上海.jpg",
    areas: [
      { adcode: 310101, description: "外滩、老街与繁华商业区并置，浓缩了上海的历史与现代气质。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310104, description: "梧桐街道、历史建筑与文化空间相映，适合在街区里慢慢漫步。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310105, description: "生活街区与城市绿意相融，整体氛围安静而精致。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310106, description: "历史街区与现代商业相邻，城市节奏繁忙却层次丰富。", cover: "/images/travel/上海/上海各区.jpg" },
      { adcode: 310107, description: "苏州河沿岸与老城生活相连，呈现出亲切的日常城市风景。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310109, description: "海派文化与近代历史交织，街巷里保留着不少城市记忆。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310110, description: "大学校园、滨江空间与工业遗存并存，青春活力与历史感兼具。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310112, description: "居住城区与商业空间广阔，是上海日常生活的重要组成部分。", cover: "/images/travel/上海/上海各区.jpg" },
      { adcode: 310113, description: "滨江工业景观与城市更新相伴，展现上海北部不断变化的面貌。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310114, description: "古镇、园林与现代城区交融，历史底蕴为城市增添了沉静气质。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310115, description: "从陆家嘴天际线到滨江空间，集中展现上海面向未来的城市形象。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310116, description: "海岸、田园与城镇生活相连，呈现出上海较为舒缓的滨海一面。", cover: "/images/travel/上海/上海各区.jpg" },
      { adcode: 310117, description: "古城文化与山水园林并存，城市之外仍有从容的历史风景。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310118, description: "水乡古镇与湖泊湿地相伴，江南水韵在这里格外鲜明。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310120, description: "海湾、田园与新城空间并置，适合感受上海南部开阔的一面。", cover: "/images/travel/上海/上海各区.jpg" }, { adcode: 310151, description: "湿地、森林与江海风光交织，是上海难得的生态自然空间。", cover: "/images/travel/上海/上海各区.jpg" },
    ],
  },
  {
    name: "江苏省",
    description: "水乡、园林与历史名城相连，细腻的人文风景适合慢慢走访。",
    adcode: 320000,
    cover: "/images/travel/江苏/江苏.jpg",
    areas: [{ adcode: 320100, description: "古都遗迹、梧桐街道与现代生活相连，城市气质厚重而从容。", cover: "/images/travel/江苏/南京.jpg" }, { adcode: 320200, description: "太湖风光与江南园林相映，水岸景色柔和，生活节奏也很舒展。", cover: "/images/travel/江苏/无锡.jpg" }, { adcode: 320500, description: "园林、古巷与水乡街区相连，细腻的江南风景处处可见。", cover: "/images/travel/江苏/苏州.jpg" }, { adcode: 320300, description: "楚汉文化与现代城市生活交织，历史遗迹为城市增添独特厚度。", cover: "/images/travel/江苏/徐州.jpg" }, { adcode: 320400, description: "运河文化与现代城区相伴，城市生活便利，也保留着江南气息。", cover: "/images/travel/江苏/常州.jpg" }, { adcode: 321000, description: "古运河、园林与老街巷相映，城市风景温润而雅致。", cover: "/images/travel/江苏/扬州.jpg" }],
    cities: ["南京", "无锡", "苏州", "徐州", "常州", "扬州"],
  },
  {
    name: "山东省",
    description: "山海相依，古城与海滨城市各有气质，旅途可以在历史与海风之间转换。",
    adcode: 370000,
    cover: "/images/travel/山东/山东.jpg",
    areas: [
      { adcode: 370100, description: "泉水融入城市日常，老街、湖畔与现代城区共同构成独特风景。", cover: "/images/travel/山东/济南.jpg" },
      { adcode: 370200, description: "海岸线与红瓦建筑相映，海风、街区和港口气息都很鲜明。", cover: "/images/travel/山东/青岛.jpg" },
      { adcode: 370600, description: "沿海风光开阔，山海之间的城市街景显得清爽舒展。", cover: "/images/travel/山东/烟台.jpg" },
      { adcode: 370900, description: "泰山雄伟的山势与古城文化相连，登高远望令人印象深刻。", cover: "/images/travel/山东/泰安.jpg" },
      { adcode: 371100, description: "海岸线清朗开阔，沙滩与港湾带来轻松的滨海氛围。", cover: "/images/travel/山东/日照.jpg" },
      { adcode: 371000, description: "海岸、岛屿与城市街区相伴，海滨生活安静而舒适。", cover: "/images/travel/山东/威海.jpg" },
      { adcode: 370800, description: "运河文化与儒家历史相连，城市风貌里沉淀着深厚的人文气息。", cover: "/images/travel/山东/济宁.jpg" },
    ],
    cities: ["济南", "青岛", "烟台", "泰安", "日照", "威海", "济宁"],
  },
  { name: "辽宁省", description: "山海与工业城市风貌并存，沿海城市展现出爽朗而开阔的一面。", adcode: 210000, cover: "/images/travel/辽宁/辽宁.jpg", areas: [{ adcode: 210200, description: "海岸、广场与近代建筑相映，城市气质开阔，带着鲜明的海滨风情。", cover: "/images/travel/辽宁/大连.jpg" }], cities: ["大连"] },
  { name: "湖北省", description: "江湖交汇、城市活力充沛，既有厚重历史，也有鲜明的当代气息。", adcode: 420000, cover: "/images/travel/湖北/湖北.jpg", areas: [{ adcode: 420100, description: "江湖交汇、街区活力十足，城市烟火气与现代节奏并存。", cover: "/images/travel/湖北/武汉.jpg" }], cities: ["武汉"] },
  {
    name: "湖南省",
    description: "山水与城市生活相映，街头风味和自然景致都很有辨识度。",
    adcode: 430000,
    cover: "/images/travel/湖南/湖南.jpg",
    areas: [{ adcode: 430100, description: "湘江沿岸与热闹街巷相连，美食、文化和年轻活力都很突出。", cover: "/images/travel/湖南/长沙.jpg" }, { adcode: 430200, description: "铁路与工业记忆鲜明，城市发展中也保留着贴近日常的生活气息。", cover: "/images/travel/湖南/株洲.jpg" }],
    cities: ["长沙", "株洲"],
  },
  {
    name: "河南省",
    description: "中原历史绵延千年，古都遗迹与当下生活在同一片土地上相遇。",
    adcode: 410000,
    cover: "/images/travel/河南/河南.jpg",
    areas: [{ adcode: 410200, description: "古都街巷与宋文化相映，历史遗迹让城市带着浓厚的故事感。", cover: "/images/travel/河南/开封.jpg" }, { adcode: 410300, description: "千年古都底蕴深厚，石窟、古迹与牡丹文化共同构成城市名片。", cover: "/images/travel/河南/洛阳.jpg" }, { adcode: 410100, description: "中原交通枢纽的繁忙与厚重历史并存，是一座不断扩展的现代城市。", cover: "/images/travel/河南/郑州.jpg" }],
    cities: ["开封", "洛阳", "郑州"],
  },
  {
    name: "江西省",
    description: "山水之间散落着古村、瓷都与历史街区，适合在旅途中放慢脚步。",
    adcode: 360000,
    cover: "/images/travel/江西/江西.jpg",
    areas: [
      { adcode: 360100, description: "赣江穿城而过，城市历史与现代生活交织，江岸风景开阔。", cover: "/images/travel/江西/南昌.jpg" },
      { adcode: 361100, description: "山水与古村资源丰富，周边风景层次多样，适合安排慢节奏旅程。", cover: "/images/travel/江西/上饶.jpg" },
      { adcode: 360500, description: "城市紧凑而平实，湖泊与周边自然景观为旅途带来宁静一面。", cover: "/images/travel/江西/新余.jpg" },
      { adcode: 360400, description: "长江与庐山相伴，江湖山色交汇，城市风景开阔而清朗。", cover: "/images/travel/江西/九江.jpg" },
      { adcode: 361000, description: "文化底蕴深厚，古街与日常生活相融，城市气质温和安静。", cover: "/images/travel/江西/抚州.jpg" },
      { adcode: 360200, description: "陶瓷文化贯穿城市生活，窑址、作坊与创意街区各有看点。", cover: "/images/travel/江西/景德镇.jpg" },
      { adcode: 360900, description: "山水环境舒展，温泉与田园风光让旅程多了几分闲适。", cover: "/images/travel/江西/宜春.jpg" },
      { adcode: 360600, description: "龙虎山丹霞风光与道教文化相映，是一处自然与人文兼具的目的地。", cover: "/images/travel/江西/鹰潭.jpg" },
      { adcode: 360700, description: "客家文化与赣南山水相伴，古城街巷里有浓郁的地方特色。", cover: "/images/travel/江西/赣州.jpg" },
    ],
    cities: ["南昌", "上饶", "新余", "九江", "抚州", "景德镇", "宜春", "鹰潭", "赣州"],
  },
  {
    name: "福建省",
    description: "山海相连，闽南街巷、港口风情与沿海景致共同组成鲜活的地域印象。",
    adcode: 350000,
    cover: "/images/travel/福建/福建.jpg",
    areas: [{ adcode: 350100, description: "榕树、老街与闽江风光相伴，城市生活里保留着温润的闽都气息。", cover: "/images/travel/福建/福州.jpg" }, { adcode: 350200, description: "海岛风光与街巷生活相融，海风、骑楼和港口景色令人放松。", cover: "/images/travel/福建/厦门.jpg" }, { adcode: 350600, description: "闽南古厝、老街与沿海风光交织，地方生活气息浓厚。", cover: "/images/travel/福建/漳州.jpg" }, { adcode: 350500, description: "海上丝绸之路的历史遗存遍布街区，多元文化在古城里交汇。", cover: "/images/travel/福建/泉州.jpg" }],
    cities: ["福州", "厦门", "漳州", "泉州"],
  },
  {
    name: "广东省",
    description: "开放、多元而充满活力，传统街区与现代都市在这里并行生长。",
    adcode: 440000,
    cover: "/images/travel/广东/广东.jpg",
    areas: [{ adcode: 440100, description: "骑楼街巷、珠江风景与丰富的饮食文化交织，城市生活鲜活而包容。", cover: "/images/travel/广东/广州.jpg" }, { adcode: 441900, description: "制造业城市的效率与丰富的街区生活并存，展现珠三角的活力。", cover: "/images/travel/广东/东莞.jpg" }, { adcode: 440300, description: "现代天际线与多元街区快速生长，城市节奏鲜明，充满创新气息。", cover: "/images/travel/广东/深圳.jpg" }],
    cities: ["广州", "东莞", "深圳"],
  },
  { name: "陕西省", description: "古都遗迹与关中风物相伴，厚重的历史感贯穿城市与日常生活。", adcode: 610000, cover: "/images/travel/陕西/陕西.jpg", areas: [{ adcode: 610100, description: "古城墙、历史遗址与热闹街区相连，厚重的历史感融入城市日常。", cover: "/images/travel/陕西/西安.jpg" }], cities: ["西安"] },
  {
    name: "安徽省",
    description: "山水、古村与徽派建筑交织，旅途里常能看到安静而雅致的风景。",
    adcode: 340000,
    cover: "/images/travel/安徽/安徽.jpg",
    areas: [
      { adcode: 341000, description: "奇松、云海与徽派村落相映，山水与人文风景都令人难忘。", cover: "/images/travel/安徽/黄山.jpg" },
      { adcode: 340100, description: "湖泊、公园与现代城区并行，呈现出不断发展的城市活力。", cover: "/images/travel/安徽/合肥.jpg" },
    ],
    cities: ["黄山", "合肥"],
  },
  {
    name: "山西省",
    description: "古建与历史遗存保存丰富，穿行其间像是在阅读一段悠长的地方记忆。",
    adcode: 140000,
    cover: "/images/travel/山西/山西.jpg",
    areas: [{ adcode: 140100, description: "汾河穿城，古迹与现代生活相邻，是了解山西城市风貌的起点。", cover: "/images/travel/山西/太原.jpg" }, { adcode: 140200, description: "古城格局与石窟艺术闻名，历史遗迹展现出鲜明的北方气质。", cover: "/images/travel/山西/大同.jpg" }, { adcode: 141000, description: "黄河文化与尧都历史相连，城市周边也有丰富的自然与人文景观。", cover: "/images/travel/山西/临汾.jpg" }, { adcode: 140700, description: "古城、院落与晋商文化保存丰富，传统建筑呈现出沉静厚重的美感。", cover: "/images/travel/山西/晋中.jpg" }],
    cities: ["太原", "大同", "临汾", "晋中"],
  },
  {
    name: "浙江省",
    description: "江南水乡与现代城市相连，山水、街巷和日常生活都显得轻巧细致。",
    adcode: 330000,
    cover: "/images/travel/浙江/浙江.jpg",
    areas: [
      { adcode: 330100, description: "西湖山水与城市生活相映，湖畔、街巷和茶香共同构成温柔的城市印象。", cover: "/images/travel/浙江/杭州.jpg" },
      { adcode: 330700, description: "商贸活力汇聚于此，来自各地的人群让城市呈现出开放、多元的面貌。", cover: "/images/travel/浙江/义乌.jpg", notes: "去过义乌市。" },
      { adcode: 330600, description: "水巷、石桥与古城人文相连，江南风景里带着清晰的历史脉络。", cover: "/images/travel/浙江/绍兴.jpg", notes: "去过诸暨市。" },
    ],
    cities: ["杭州", "义乌", "诸暨"],
    notes: "当前地图按地级市展示，义乌、诸暨分别点亮所属的金华市、绍兴市。",
  },
  {
    name: "香港特别行政区",
    description: "山海、街区与高密度都市景观并置，城市节奏鲜明而多层次。",
    adcode: 810000,
    cover: "/images/travel/香港/香港.jpg",
    areas: [
      { adcode: 810001, description: "历史建筑、坡道街巷与现代金融区相邻，浓缩了香港的城市变化。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810002, description: "传统街市与现代商业并存，街区生活多元而热闹。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810003, description: "沿海社区与住宅街区相连，能感受到香港较为日常的一面。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810004, description: "海湾、沙滩与山径相伴，在繁忙都市之外留有开阔的自然空间。", cover: "/images/travel/香港/香港各区.jpg" },
      { adcode: 810005, description: "街道密集、夜色热闹，购物、美食与城市烟火气交织。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810006, description: "老街、市场与社区生活交错，保留着亲切而真实的城市日常。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810007, description: "多元社区与历史街区相伴，饮食文化尤其丰富。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810008, description: "住宅街区与公共绿地并存，日常生活气息浓厚。", cover: "/images/travel/香港/香港各区.jpg" },
      { adcode: 810009, description: "工业记忆与创意空间相连，城市更新带来新的街区活力。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810010, description: "山海与社区街区相邻，商业生活便利，周边风景也很开阔。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810011, description: "海岸、山径与新市镇生活并存，呈现出香港西部的舒展面貌。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810012, description: "新市镇与乡郊风景交错，能看到香港更贴近田野的一面。", cover: "/images/travel/香港/香港各区.jpg" },
      { adcode: 810013, description: "边境社区与自然郊野相连，城市之外的空间感更加明显。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810014, description: "海湾、湿地与住宅区相伴，生活节奏相对从容。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810015, description: "海岸、岛屿与山径景观丰富，是香港亲近海洋与自然的代表区域。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810016, description: "河道、公园与新市镇规划相映，城市空间整洁而舒展。", cover: "/images/travel/香港/香港各区.jpg" },
      { adcode: 810017, description: "货柜码头与屋邨社区相连，工业与城市生活在山海之间交织。", cover: "/images/travel/香港/香港各区.jpg" }, { adcode: 810018, description: "岛屿风光与渔村生活相连，节奏悠缓，适合享受海边时光。", cover: "/images/travel/香港/香港各区.jpg" },
    ],
  },
  {
    name: "澳门特别行政区",
    description: "中西风格在街巷间交汇，小城尺度里藏着丰富的历史与生活细节。",
    adcode: 820000,
    cover: "/images/travel/澳门/澳门.jpg",
    areas: [
      { adcode: 820001, description: "住宅街区与传统市集相伴，展现澳门贴近日常生活的一面。", cover: "/images/travel/澳门/澳门各区.jpg" }, { adcode: 820002, description: "老街密集、生活气息浓厚，巷弄里保留着不少城市记忆。", cover: "/images/travel/澳门/澳门各区.jpg" }, { adcode: 820003, description: "街巷安静而富有文化气息，彩色建筑与小型艺术空间颇具特色。", cover: "/images/travel/澳门/澳门各区.jpg" }, { adcode: 820004, description: "历史街区与繁华商业空间相连，是感受澳门多元风貌的核心区域。", cover: "/images/travel/澳门/澳门各区.jpg" },
      { adcode: 820005, description: "临海历史街区与城市生活交织，建筑与街巷保留着浓厚的旧城韵味。", cover: "/images/travel/澳门/澳门各区.jpg" }, { adcode: 820006, description: "氹仔旧城区与现代休闲空间相邻，街区尺度亲切，漫步体验舒适。", cover: "/images/travel/澳门/澳门各区.jpg" }, { adcode: 820007, description: "大型度假设施与现代城市景观集中，展现澳门面向当代的一面。", cover: "/images/travel/澳门/澳门各区.jpg" }, { adcode: 820008, description: "远离半岛中心的海岛社区，环境清静，保留着更悠闲的生活节奏。", cover: "/images/travel/澳门/澳门各区.jpg" },
    ],
  },
]

/** 地图模块的文案，集中在此处方便改动。 */
export const travelLabels = {
  title: "旅行足迹",
  subtitle: "点亮走过的地方，记录旅途中的风景。",
  eyebrow: "TRAVEL MAP",
  legendVisited: "已点亮",
  legendUnvisited: "未点亮",
  /** 全国视图的概览文案，{visited} 与 {total} 会被替换成数字 */
  progress: "已点亮 {visited} / {total} 个省级行政区",
  /** 省内视图的概览文案，{province} {visited} {total} 会被替换成实际值 */
  progressProvince: "{province} · 已点亮 {visited} / {total} 个{unit}",
  hint: "点击省份查看市级地图",
  hintProvince: "点击{unit}查看记录",
  back: "返回全国地图",
  nationalLabel: "全国",
  emptyTitle: "还没有旅行记录",
  emptyBody: "在 src/data/travel.ts 的 visits 里添加省份，地图上就会点亮它。",
  unvisitedBody: "这里还没有旅行记录。",
  unvisitedNoDetail: "已点亮，但还没有补充详细记录。",
  coverPlaceholder: "等待放入旅途影像",
  /** 只有省级记录、还没有市级记录时的提示 */
  noAreaRecords: "这个省份已点亮，但还没有登记到具体的{unit}。",
  loadingProvince: "正在加载行政区边界…",
  errorTitle: "地图加载失败",
  errorBody: "省级边界数据没能加载，其他内容不受影响。",
  /** 某个省份缺少下一级数据时的说明 */
  areaDataMissing: "缺少下一级行政区数据",
  areaDataMissingBody: "数据源没有提供这个省级单位的下一级边界，因此无法进入市级视图。",
  provinceUnavailable: "这个省份暂时看不了市级地图。",
  visitedAreasSummary: "已登记 {count} 个{unit}",
  noVisitedAreas: "还没有登记{unit}",
} as const

export { provinces as provinceIndex } from "@/components/travel/province-index"

const visitByName = new Map(visits.map((v) => [v.name, v]))
const visitByAdcode = new Map(
  visits.filter((v) => v.adcode !== undefined).map((v) => [v.adcode as number, v]),
)

/** 按省级 adcode 取旅行记录。优先用 adcode 匹配，回退到名称。 */
export function getVisitByAdcode(adcode: number, name?: string): TravelVisit | undefined {
  const matched = visitByAdcode.get(adcode)
  if (matched) return matched
  const legacy = name ? visitByName.get(name) : undefined
  return legacy?.adcode === undefined ? legacy : undefined
}

/** 按省级名称取旅行记录，未记录时返回 undefined。 */
export function getVisit(name: string): TravelVisit | undefined {
  return visitByName.get(name)
}

/** 取某条省级记录里某个下级行政区的记录。匹配只认 adcode。 */
export function getAreaVisit(
  visit: TravelVisit | undefined,
  adcode: number,
): TravelAreaVisit | undefined {
  return visit?.areas?.find((a) => a.adcode === adcode)
}

/** 统计已去过的唯一下级行政区；提供地图 id 时只计入匹配项。 */
export function countAreas(visit: TravelVisit | undefined, regionIds?: ReadonlySet<number>): number {
  const ids = new Set(
    visit?.areas
      ?.filter((area) =>
        area.visited !== false &&
        Number.isInteger(area.adcode) &&
        area.adcode >= 100000 && area.adcode <= 999999 &&
        (!regionIds || regionIds.has(area.adcode)),
      )
      .map((area) => area.adcode),
  )
  return ids.size
}
