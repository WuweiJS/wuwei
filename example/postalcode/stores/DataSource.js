import { ActiveStore } from '../../../src/Wuwei'

export default class DataSource extends ActiveStore {
  constructor() {
    super(...arguments)

    this.value = {
      "台北市": {
        "中正區": "100",
        "大同區": "103",
        "中山區": "104",
        "松山區": "105",
        "大安區": "106",
        "萬華區": "108",
        "信義區": "110",
        "士林區": "111",
        "北投區": "112",
        "內湖區": "114",
        "南港區": "115",
        "文山區": "116"
      },
      "新北市": {
        "萬里區": "207",
        "金山區": "208",
        "板橋區": "220",
        "汐止區": "221",
        "深坑區": "222",
        "石碇區": "223",
        "瑞芳區": "224",
        "平溪區": "226",
        "雙溪區": "227",
        "貢寮區": "228",
        "新店區": "231",
        "坪林區": "232",
        "烏來區": "233",
        "永和區": "234",
        "中和區": "235",
        "土城區": "236",
        "三峽區": "237",
        "樹林區": "238",
        "鶯歌區": "239",
        "三重區": "241",
        "新莊區": "242",
        "泰山區": "243",
        "林口區": "244",
        "蘆洲區": "247",
        "五股區": "248",
        "八里區": "249",
        "淡水區": "251",
        "三芝區": "252",
        "石門區": "253"
      },
      "桃園市": {
        "中壢區": "320",
        "平鎮區": "324",
        "龍潭區": "325",
        "楊梅區": "326",
        "新屋區": "327",
        "觀音區": "328",
        "桃園區": "330",
        "龜山區": "333",
        "八德區": "334",
        "大溪區": "335",
        "復興區": "336",
        "大園區": "337",
        "蘆竹區": "338"
      },
      "台中市": {
        "中區": "400",
        "東區": "401",
        "南區": "402",
        "西區": "403",
        "北區": "404",
        "北屯區": "406",
        "西屯區": "407",
        "南屯區": "408",
        "太平區": "411",
        "大里區": "412",
        "霧峰區": "413",
        "烏日區": "414",
        "豐原區": "420",
        "后里區": "421",
        "石岡區": "422",
        "東勢區": "423",
        "和平區": "424",
        "新社區": "426",
        "潭子區": "427",
        "大雅區": "428",
        "神岡區": "429",
        "大肚區": "432",
        "沙鹿區": "433",
        "龍井區": "434",
        "梧棲區": "435",
        "清水區": "436",
        "大甲區": "437",
        "外埔區": "438",
        "大安區": "439"
      },
      "台南市": {
        "中西區": "700",
        "東區": "701",
        "南區": "702",
        "北區": "704",
        "安平區": "708",
        "安南區": "709",
        "永康區": "710",
        "歸仁區": "711",
        "新化區": "712",
        "左鎮區": "713",
        "玉井區": "714",
        "楠西區": "715",
        "仁德區": "717",
        "關廟區": "718",
        "南化區": "716",
        "龍崎區": "719",
        "官田區": "720",
        "麻豆區": "721",
        "佳里區": "722",
        "西港區": "723",
        "七股區": "724",
        "將軍區": "725",
        "學甲區": "726",
        "北門區": "727",
        "新營區": "730",
        "後壁區": "731",
        "白河區": "732",
        "東山區": "733",
        "六甲區": "734",
        "下營區": "735",
        "柳營區": "736",
        "鹽水區": "737",
        "善化區": "741",
        "大內區": "742",
        "新市區": "744",
        "安定區": "745",
        "山上區": "743"
      },
      "高雄市": {
        "新興區": "800",
        "前金區": "801",
        "苓雅區": "802",
        "鹽埕區": "803",
        "鼓山區": "804",
        "旗津區": "805",
        "前鎮區": "806",
        "三民區": "807",
        "楠梓區": "811",
        "小港區": "812",
        "左營區": "813",
        "仁武區": "814",
        "大社區": "815",
        "東沙群島": "817",
        "岡山區": "820",
        "路竹區": "821",
        "南沙群島": "819",
        "阿蓮區": "822",
        "田寮區": "823",
        "燕巢區": "824",
        "橋頭區": "825",
        "梓官區": "826",
        "彌陀區": "827",
        "湖內區": "829",
        "永安區": "828",
        "鳳山區": "830",
        "大寮區": "831",
        "林園區": "832",
        "鳥松區": "833",
        "大樹區": "840",
        "旗山區": "842",
        "美濃區": "843",
        "六龜區": "844",
        "內門區": "845",
        "甲仙區": "847",
        "杉林區": "846",
        "桃源區": "848",
        "茄萣區": "852",
        "茂林區": "851",
        "那瑪夏區": "849"
      }
    }
  }

  onParentsUpdate( /* Parent store */ ) {
    // this.setValue({}) use setValue to change this store value.
  }
}