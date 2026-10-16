// 省级行政区索引：adcode 与名称的对照，以及省内视图需要的少量配置。
//
// 地图数据与记录匹配一律走 adcode，名称只用于显示 —— 靠中文名匹配
// 会在「内蒙古自治区 / 内蒙古」这类写法上悄悄失效。
//
// 子级数据由 public/data/provinces/{adcode}.json 提供；数据抓取脚本不属于应用运行时。

/** 直辖市与特别行政区的下一级是市辖区，其余省级单位的下一级是地级市等。 */
export type SubLevelKind = "city" | "district"

export interface ProvinceEntry {
  name: string
  adcode: number
  /** 省内视图里对下一级单位的称呼 */
  subLevelLabel: string
  /** 子级数据的层级，取自数据源，用于校验与文案 */
  subLevel: SubLevelKind
  /**
   * 省内视图的可视范围覆盖，[minLon, minLat, maxLon, maxLat]。
   * 留空时取该省全部子级要素的合并包围盒。
   * 目前只有海南需要：三沙市把范围拉到南海深处，
   * 直接用合并包围盒会把海南岛压成一条细线。
   */
  bounds?: [number, number, number, number]
  /** 当地图数据源没有提供该省的子级边界时，说明原因；存在即表示不可进入省内视图。 */
  unavailableReason?: string
}

/** 34 个省级行政区。港澳台与直辖市同样列全，缺数据的在原位说明。 */
export const provinces: ProvinceEntry[] = [
  { name: "北京市", adcode: 110000, subLevelLabel: "市辖区", subLevel: "district" },
  { name: "天津市", adcode: 120000, subLevelLabel: "市辖区", subLevel: "district" },
  { name: "河北省", adcode: 130000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "山西省", adcode: 140000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "内蒙古自治区", adcode: 150000, subLevelLabel: "盟市", subLevel: "city" },
  { name: "辽宁省", adcode: 210000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "吉林省", adcode: 220000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "黑龙江省", adcode: 230000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "上海市", adcode: 310000, subLevelLabel: "市辖区", subLevel: "district" },
  { name: "江苏省", adcode: 320000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "浙江省", adcode: 330000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "安徽省", adcode: 340000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "福建省", adcode: 350000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "江西省", adcode: 360000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "山东省", adcode: 370000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "河南省", adcode: 410000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "湖北省", adcode: 420000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "湖南省", adcode: 430000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "广东省", adcode: 440000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "广西壮族自治区", adcode: 450000, subLevelLabel: "地级市", subLevel: "city" },
  {
    name: "海南省",
    adcode: 460000,
    subLevelLabel: "地级市",
    subLevel: "city",
    // 海南岛本岛（含海口、三亚、儋州一带）；西沙、南沙等岛礁不在首选视野内，
    // 越界也不影响它们被点亮与点击。
    bounds: [108.0, 18.0, 111.3, 20.4],
  },
  { name: "重庆市", adcode: 500000, subLevelLabel: "市辖区", subLevel: "district" },
  { name: "四川省", adcode: 510000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "贵州省", adcode: 520000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "云南省", adcode: 530000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "西藏自治区", adcode: 540000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "陕西省", adcode: 610000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "甘肃省", adcode: 620000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "青海省", adcode: 630000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "宁夏回族自治区", adcode: 640000, subLevelLabel: "地级市", subLevel: "city" },
  { name: "新疆维吾尔自治区", adcode: 650000, subLevelLabel: "地级市", subLevel: "city" },
  {
    name: "台湾省",
    adcode: 710000,
    subLevelLabel: "县市",
    subLevel: "city",
    // 数据源没有提供台湾省的下一级边界。这里只说明缺失，
    // 不用简化轮廓或示意图冒充行政区划。
    unavailableReason: "数据源未提供台湾省的下一级行政区边界。",
  },
  { name: "香港特别行政区", adcode: 810000, subLevelLabel: "区", subLevel: "district" },
  { name: "澳门特别行政区", adcode: 820000, subLevelLabel: "堂区", subLevel: "district" },
]

const byAdcode = new Map(provinces.map((p) => [p.adcode, p]))

export function findProvince(adcode: number): ProvinceEntry | undefined {
  return byAdcode.get(adcode)
}

/** 全国视图的可视范围，[minLon, minLat, maxLon, maxLat]。
 *  下界取北纬 17 度：数据整体下探到北纬 3.4 度（南海诸岛附属要素），
 *  全部纳入会把大陆部分压得很小，所以南海诸岛改用右下角的插图呈现。 */
export const NATION_BOUNDS: [number, number, number, number] = [73.4, 17, 135.2, 53.6]

/** 省内视图默认使用的经纬度范围，覆盖全国，交给各省的 bounds 覆盖。 */
export const DEFAULT_MAP_BOUNDS = NATION_BOUNDS

/** 子级 GeoJSON 的本地地址，按省份 adcode 取。 */
export function subLevelUrl(adcode: number): string {
  return `/data/provinces/${adcode}.json`
}
