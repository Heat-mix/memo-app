const STORAGE_KEY = "kurashi-memo-items-v2";
const THEME_STORAGE_KEY = "kurashi-memo-theme-v1";

const categories = [
  { id: "food", name: "食料品", icon: "🛒" },
  { id: "daily", name: "日用品", icon: "🧴" },
  { id: "shoppingOther", name: "その他買い物", icon: "🛍" },
  { id: "errand", name: "用事", icon: "📍" },
  { id: "memo", name: "メモ", icon: "✎" }
];

const foodWords = [
  // 米・ごはん・餅
  "米", "ごはん", "餅", "もち", "ささにしき", "あきたこまち", "銀河のしずく", "ひとめぼれ",
  "玄米", "雑穀米", "もち米", "無洗米", "パックご飯", "レトルトご飯", "オートミール", "コーンフレーク", "グラノーラ",

  // パン類
  "パン", "食パン", "ロールパン", "イギリストースト", "フランスパン", "バゲット", "クロワッサン", "ベーグル",
  "イングリッシュマフィン", "蒸しパン", "米粉パン", "ネオトースト",

  // 麺類
  "うどん", "そば", "パスタ", "ラーメン", "そうめん", "焼きそば", "冷やし中華", "冷麺", "じゃじゃ麺", "春雨",
  "中華麺", "焼きそば麺", "うどん玉", "そば乾麺", "ビーフン", "フォー", "マカロニ", "ペンネ", "スパゲッティ", "温麺", "ひっつみ",

  // 乳製品・卵・乳系素材
  "牛乳", "豆乳", "ヨーグルト", "チーズ", "バター", "卵", "たまご", "サワークリーム", "ホイップクリーム", "生クリーム", "クリーム", "ミルク",
  "生乳", "低脂肪乳", "無脂肪乳", "加工乳", "飲むヨーグルト", "ギリシャヨーグルト", "ホイップ", "クリームチーズ",
  "スライスチーズ", "とろけるチーズ", "粉チーズ", "モッツァレラ", "カマンベール", "温泉卵", "ゆで卵", "うずら卵",

  // 肉類・内臓・肉加工品
  "鶏肉", "豚肉", "牛肉", "ひき肉", "ハム", "ウインナー", "ベーコン", "肉", "チャーシュー", "焼豚", "ジンギスカン", "ウィンナー", "ソーセージ",
  "鶏もも", "鶏むね", "ささみ", "手羽先", "手羽元", "鶏皮", "豚こま", "豚バラ", "豚ロース", "豚肩ロース", "とんかつ肉",
  "牛こま", "牛バラ", "牛肩ロース", "牛切り落とし", "合いびき肉", "鶏ひき肉", "豚ひき肉", "牛ひき肉", "ラム肉", "マトン",
  "ラム肩", "ラム肩ロース", "マトンロース", "マトンモモ", "レバー", "ホルモン", "焼肉用", "しゃぶしゃぶ用", "すき焼き用", "サラダチキン", "ロースハム", "生ハム",

  // 魚介類・魚卵・水産加工品
  "魚", "鮭", "サバ", "まぐろ", "刺身", "しらす", "イワシ", "タラ", "イカ", "タコ", "ホッケ", "カニカマ", "鯖缶", "ツナ缶",
  "アジ", "ブリ", "カツオ", "タイ", "ヒラメ", "カレイ", "サケ", "ニシン", "サワラ", "キンメダイ", "シシャモ", "アユ", "イワナ", "ヤマメ",
  "アサリ", "シジミ", "ハマグリ", "ホタテ", "カキ", "サザエ", "アワビ", "ツブ貝", "エビ", "甘エビ", "ブラックタイガー",
  "ズワイガニ", "毛ガニ", "タラバガニ", "ウニ", "イクラ", "数の子", "とびっこ", "ちりめんじゃこ", "桜えび", "干しエビ", "干しえび",
  "シャケフレーク", "鮭フレーク", "めんたいこ", "明太子", "たらこ", "筋子", "どんこ", "サンマ", "さんま", "ハタハタ", "しめさば", "干物", "塩鮭",
  "ツナ", "シーチキン", "かにかま", "伊達巻", "ナルト", "なると", "つみれ", "はんぺん", "笹かま", "きく", "白子",

  // 大豆製品・こんにゃく類
  "豆腐", "納豆", "油揚げ", "こんにゃく", "ちくわ", "かまぼこ", "しらたき", "いとこん", "おから",

  // 野菜
  "野菜", "玉ねぎ", "にんじん", "じゃがいも", "キャベツ", "レタス", "トマト", "きゅうり", "大根", "白菜", "ねぎ", "ブロッコリー", "ほうれん草", "もやし",
  "玉菜", "菜葉", "なっぱ", "菜っぱ", "とうもろこし", "きみ", "里いも", "大葉", "小松菜", "みつば",
  "水菜", "春菊", "チンゲン菜", "三つ葉", "パセリ", "しそ", "クレソン", "れんこん", "里芋", "長芋", "自然薯", "ゆり根", "オクラ", "ズッキーニ",
  "パプリカ", "かぼちゃ", "ラディッシュ", "枝豆", "さやえんどう", "スナップエンドウ", "グリーンピース", "いんげん", "そら豆", "ふき", "わらび", "ぜんまい",
  "たらの芽", "こごみ", "うど", "ニラ", "ししとう", "アスパラガス", "アスパラ", "ミョウガ", "唐辛子", "モロヘイヤ", "セロリ", "山芋", "ピーマン", "なす", "ゴーヤ", "菊", "ごぼう", "牛蒡",

  // きのこ類
  "きのこ", "しめじ", "えのき", "エリンギ", "シイタケ", "しいたけ", "椎茸", "マイタケ", "まいたけ", "舞茸", "マツタケ", "松茸", "ヒラタケ", "平茸",
  "マッシュルーム", "なめたけ", "なめこ", "ぶなしめじ", "ブナシメジ", "白しめじ", "エノキ", "えのきだけ", "キクラゲ", "きくらげ", "ポルチーニ",

  // 果物・果実加工品
  "果物", "りんご", "バナナ", "みかん", "いちご", "ぶどう", "キウイ", "梨", "パイナップル", "スイカ", "さくらんぼ", "スモモ", "桃缶", "メロン", "レモン",
  "オレンジ", "グレープフルーツ", "もも", "柿", "かき", "洋梨", "マンゴー", "アボカド", "ドラゴンフルーツ", "パッションフルーツ", "ライチ", "キンカン",
  "ゆず", "かぼす", "すだち", "ラズベリー", "ブラックベリー", "クランベリー", "カシス", "レーズン", "プルーン", "ドライマンゴー", "ドライいちじく",
  "干し柿", "びわ", "いちじく", "デコポン", "はっさく", "甘夏", "ポンカン", "清見オレンジ", "ネーブル", "シャインマスカット", "ブルーベリー", "栗",
  "キャンベル", "ナイヤガラ", "レッドナイヤ", "スチューベン", "巨峰", "デラウェア", "はるか", "伊予柑", "いよかん", "クルミ", "ゴールドキウイ",

  // 粉類・ルー・製菓材料
  "小麦粉", "ホットケーキミックス", "ホケミ", "パン粉", "片栗粉", "天ぷら粉", "お好み焼き粉", "カレールー", "シチュールー", "強力粉", "薄力粉", "アラザン",
  "中力粉", "米粉", "全粒粉", "そば粉", "から揚げ粉", "唐揚げ粉", "たこ焼き粉", "チヂミ粉", "てんぷら粉", "コーンスターチ",
  "ベーキングパウダー", "重曹", "きな粉", "プロテイン", "ココアパウダー", "つぶあん", "粒あん", "ずんだ", "こし餡", "こしあん", "ゼラチン", "ゼライス", "寒天", "粉寒天",

  // 乾物・海藻・だし素材
  "ふりかけ", "海苔", "のり", "鰹節", "かつお節", "煮干し", "にぼし", "昆布", "こんぶ", "だし", "出汁", "だしパック", "出汁パック", "ひじき",
  "わかめ", "乾燥わかめ", "切り干し大根", "高野豆腐", "干ししいたけ", "車麩", "焼き麩", "とろろ昆布", "塩昆布", "乾燥海苔", "青のり", "あおさ",
  "黒胡麻", "黒ごま", "白胡麻", "白ごま", "胡麻", "ごま", "麹",

  // 調味料・香辛料・たれ・料理の素
  "醤油", "しょうゆ", "味噌", "みそ", "砂糖", "塩", "酢", "油", "ごま油", "ソース", "マヨネーズ", "ケチャップ", "ドレッシング", "コンソメ",
  "紅生姜", "豆板醤", "ココナッツオイル", "オリーブオイル", "めんつゆ", "梅干し", "みりん", "スタミナ源たれ", "源たれ", "からし", "わさび",
  "ポン酢", "味ぽん", "白だし", "顆粒だし", "だしの素", "ほんだし", "鶏ガラスープの素", "中華だし", "ブイヨン", "味の素", "焼肉のたれ",
  "すき焼きのたれ", "しゃぶしゃぶのたれ", "ごまだれ", "ごまドレッシング", "和風ドレッシング", "シーザードレッシング", "フレンチドレッシング", "青じそドレッシング",
  "タルタルソース", "オイスターソース", "ステーキソース", "七味", "一味", "山椒", "生姜", "にんにく", "ガーリックパウダー", "バジル", "ナツメグ", "シナモン",
  "サラダ油", "米油", "こめ油", "ラー油", "創味シャンタン", "香味ペースト", "麻婆豆腐の素", "麻婆茄子の素", "回鍋肉の素", "青椒肉絲の素", "八宝菜の素",
  "炊き込みご飯の素", "ローリエ", "ブラックペッパー", "ハーブソルト", "黒糖", "オリゴ糖", "ハチミツ", "はちみつ",

  // 飲料・お茶・コーヒー・清涼飲料
  "水", "お茶", "麦茶", "コーヒー", "ジュース", "炭酸", "ペットボトル飲料", "スポーツ飲料", "ポカリ", "ポカリスエット", "アクエリ", "アクエリアス",
  "コーラ", "ペプシ", "炭酸水", "ウーロン茶", "焙じ茶", "CCレモン", "ウェルチ", "ココア", "ジンジャーエール", "オロナミンC", "ヤクルト", "ファンタ",
  "天然水", "ミネラルウォーター", "い・ろ・は・す", "南アルプスの天然水", "エビアン", "ボルヴィック", "クリスタルガイザー", "緑茶", "烏龍茶", "ジャスミン茶",
  "ほうじ茶", "十六茶", "爽健美茶", "生茶", "伊右衛門", "お〜いお茶", "綾鷹", "午後の紅茶", "午後の紅茶無糖", "ブラックコーヒー", "カフェオレ", "カフェラテ",
  "BOSS", "ジョージア", "ワンダ", "クラフトボス", "コカ・コーラ", "サイダー", "三ツ矢サイダー", "C.C.レモン", "デカビタ", "グリーンダカラ", "DAKARA",
  "イオンウォーター", "オレンジジュース", "りんごジュース", "グレープジュース", "野菜ジュース", "トマトジュース", "カルピス", "カルピスウォーター", "なっちゃん", "Qoo",
  "R-1", "ピルクル", "マミー", "レッドブル", "モンスター", "ZONe", "バヤリース",

  // 酒類・料理用酒
  "焼酎", "料理酒", "ウイスキー", "のどごし生", "日本酒", "缶ビール", "ビール", "発泡酒", "第三のビール", "缶チューハイ", "チューハイ", "サワー",
  "ハイボール", "ワイン", "赤ワイン", "白ワイン", "スパークリングワイン", "梅酒", "果実酒", "清酒", "芋焼酎", "麦焼酎", "ブランデー", "ジン", "ウォッカ", "ラム",
  "ノンアルコールビール", "ノンアル",

  // お菓子・甘味・デザート
  "お菓子", "チョコ", "アイス", "せんべい", "スナック", "クッキー", "ビスケット", "ポテチ", "ポテトチップス", "ドーナツ", "ドーナッツ",
  "エンゼルパイ", "抹茶", "キャラメル", "歌舞伎揚", "じゃがりこ", "トッポ", "あられ", "ポッキー", "ゼリー", "クラッカー", "だんご", "団子", "ガム", "グミ", "飴", "キャンディー", "ラムネ",
  "フルーチェ", "かき氷シロップ", "オレオ", "ハッピーターン", "ばかうけ", "ミックス菓子", "フローレット", "かりんとう", "栗しぐれ", "和風パイ", "饅頭", "まんじゅう",
  "エクレア", "あんこ", "みつ豆", "かき氷", "ショートケーキ", "ケーキ", "ロールケーキ", "麩菓子", "ようかん", "羊羹", "かもめの玉子", "マシュマロ", "チョコレート",
  "ラムネ菓子", "ウエハース", "パイ菓子", "バウムクーヘン", "バームクーヘン", "カステラ", "プリン", "シュークリーム", "ワッフル", "マドレーヌ", "フィナンシェ",
  "大福", "どら焼き", "最中", "あんみつ", "ポップコーン", "コーンスナック", "チーズスナック", "ナッツ", "ミックスナッツ", "ドライフルーツ", "フルーツゼリー",
  "キャラパキ", "カラムーチョ", "すっぱムーチョ", "おやつカルパス", "ブタメン", "うまい棒", "ポンデリング", "クーリッシュ", "スーパーエッセルカップ", "スーパーカップ", "爽",
  "ガリガリくん", "スイカバー", "メロンバー", "あずきバー", "ミルちゃん", "メン子ちゃんゼリー", "ベビスターラーメン",

  // 惣菜・調理済み食品・加工食品
  "冷凍食品", "弁当", "惣菜", "からあげ", "カレー", "シチュー", "ピラフ", "チャーハン", "炒飯", "シュウマイ", "焼売", "冷凍餃子", "餃子",
  "春巻き", "お好み焼き", "たこ焼き", "ピザ", "いなり寿司", "寿司", "茶碗蒸し",
  "グラタン", "ドリア", "ハンバーグ", "ミートボール", "オムライス", "ドライカレー", "牛丼", "親子丼", "中華丼", "メンチカツ", "とんかつ", "チキンカツ",
  "エビフライ", "フライドポテト", "焼うどん", "ナポリタン", "ミートソース", "ペペロンチーノ", "カルボナーラ", "グラタンソース", "レトルトカレー", "おかゆ", "雑炊",
  "キムチ", "福神漬け", "紅しょうが", "なめ茸", "佃煮", "おでん", "寿司セット", "おにぎり", "のり巻き", "太巻き", "細巻き", "いなり", "焼き鳥", "つくね",
  "サンドウィッチ", "さつま揚げ", "がんもどき", "漬物", "メンマ", "かき揚げ", "コロッケ", "たくわん", "らっきょう", "らっきょ", "おつまみ", "肉まん", "あんまん", "ピザまん",

  // インスタント食品
  "ゆうげ", "あさげ", "コーンスープ", "カップラ", "カップ麺",

  // 缶詰・保存食品
  "缶詰", "ジャム", "マーガリン",

  // 分類確認用
  "仁丹"
];

const dailyWords = [
  "洗剤", "柔軟剤", "漂白剤", "ティッシュ", "トイレットペーパー", "キッチンペーパー", "ラップ", "アルミホイル",
  "シャンプー", "リンス", "コンディショナー", "ボディソープ", "石けん", "石鹸", "歯磨き", "歯みがき", "歯ブラシ",
  "ごみ袋", "ゴミ袋", "スポンジ", "電池", "マスク", "薬", "ばんそうこう", "絆創膏", "日用品", "掃除シート",
  "ハンドソープ", "おしり拭き", "口拭き", "ムーニーマン", "マミーポコ", "つよいこ", "はいはい", "メリーズ", "ウィスパー", "アンネパッド", "ナプキン", "ジョイ", "キチぺ",
  "サランラップ", "保存袋", "ジップロック", "クッキングシート", "フリーザーバッグ", "洗濯ネット", "パイプユニッシュ", "カビキラー",
  "サンポール", "トイレ洗剤", "お風呂洗剤", "ガラスクリーナー", "除菌シート", "除菌スプレー", "消臭剤", "芳香剤",
  "コロコロ", "キッチンハイター", "キッチンブリーチ", "クイックルワイパー", "ウェットティッシュ", "綿棒", "コットン", "消毒液",
  "消毒スプレー", "うがい薬", "洗顔", "化粧水", "乳液", "ハンドクリーム", "保湿クリーム", "日焼け止め",
  "カミソリ", "シェービング", "おむつ", "パンパース", "粉ミルク", "ライター", "チャッカマン", "電球",
  "防虫剤", "虫よけ", "殺虫剤", "保冷バッグ"
];

const stores = [
  "イオン", "西友", "ライフ", "業務スーパー", "コストコ", "スーパー", "コンビニ",
  "ドラッグストア", "薬局", "マツキヨ", "ウエルシア", "スギ薬局", "ダイソー",
  "百均", "セブン", "ファミマ", "ローソン", "Amazon", "楽天",
  "マックスバリュ", "ヨークベニマル", "ロピア", "オーケー", "OK", "コープ", "生協", "ドン・キホーテ",
  "ドンキ", "ミニストップ", "デイリーヤマザキ", "NewDays", "ニューデイズ", "ツルハ", "サンドラッグ", "ココカラファイン",
  "クスリのアオキ", "カワチ薬品", "カワチ", "セリア", "キャンドゥ", "ワッツ", "カインズ", "DCM",
  "コメリ", "ヤマダ電機", "ヤマダ", "ケーズデンキ", "ケーズ", "ヨドバシカメラ", "ヨドバシ", "コジマ",
  "コジマ×ビックカメラ", "コジマ電気", "ユニクロ", "GU", "ジーユー", "しまむら", "ワークマン", "Yahoo!ショッピング",
  "Yahooショッピング", "ヤフーショッピング", "メルカリ"
];

const modeConfig = {
  shopping: {
    contextLabel: "店名 任意",
    contextPlaceholder: "例：イオン、薬局、ローソン",
    itemLabel: "買うもの",
    itemPlaceholder: "例：牛乳 卵 パン 洗剤",
    hint: "スペース、読点「、」、中点「・」、改行で区切れます。買い物は食料品・日用品に自動で分けます。"
  },
  errand: {
    contextLabel: "場所 任意",
    contextPlaceholder: "例：市役所、郵便局、病院",
    itemLabel: "やること",
    itemPlaceholder: "例：料金支払い 荷物受け取り",
    hint: "用事は分類を固定します。場所を入れると、その用事だけ場所タグになります。"
  },
  memo: {
    contextLabel: "タグ 任意",
    contextPlaceholder: "例：家、子ども、仕事",
    itemLabel: "メモ",
    itemPlaceholder: "例：冷蔵庫を確認 献立を考える",
    hint: "ちょっとした覚え書き用です。スペースや改行で1件ずつ追加できます。"
  }
};

const input = document.querySelector("#item-input");
const inputPanel = document.querySelector(".input-panel");
const contextInput = document.querySelector("#context-input");
const contextLabel = document.querySelector("#context-label");
const itemLabel = document.querySelector("#item-label");
const inputHint = document.querySelector("#input-hint");
const addButton = document.querySelector("#add-button");
const modeFrame = document.querySelector(".mode-frame");
const modeOutlinePath = document.querySelector("#mode-outline-path");
const activeCount = document.querySelector("#active-count");
const activeList = document.querySelector("#active-list");
const doneList = document.querySelector("#done-list");
const activeEmpty = document.querySelector("#active-empty");
const doneEmpty = document.querySelector("#done-empty");
const finishCheckedButton = document.querySelector("#finish-checked-button");
const clearDoneButton = document.querySelector("#clear-done-button");
const resetAllButton = document.querySelector("#reset-all-button");
const grandTotal = document.querySelector("#grand-total");
const categoryTemplate = document.querySelector("#category-template");
const activeItemTemplate = document.querySelector("#active-item-template");
const doneItemTemplate = document.querySelector("#done-item-template");
const themeButtons = document.querySelectorAll(".theme-swatch");

const themes = {
  beige: "#fbf7ef",
  pink: "#fff2f7",
  purple: "#f7f0ff",
  blue: "#eef9ff",
  emerald: "#effcf6",
  gray: "#fff9df",
  orange: "#fff3e8",
  indigo: "#eef5ff"
};

let items = loadItems();
let currentMode = "shopping";

function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return Object.prototype.hasOwnProperty.call(themes, stored) ? stored : "beige";
  } catch {
    return "beige";
  }
}

function setTheme(theme, persist = true) {
  const selectedTheme = Object.prototype.hasOwnProperty.call(themes, theme) ? theme : "beige";
  document.body.dataset.theme = selectedTheme;
  document.querySelector('meta[name="theme-color"]').content = themes[selectedTheme];

  themeButtons.forEach((button) => {
    const selected = button.dataset.theme === selectedTheme;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
  }
}

function normalizeText(text) {
  return text.trim().toLowerCase();
}

function findLongestMatch(text, categoryWords) {
  const normalized = normalizeText(text);
  let bestMatch = null;

  categoryWords.forEach((categoryWord) => {
    categoryWord.words.forEach((word) => {
      if (!normalized.includes(word.toLowerCase())) return;
      if (!bestMatch || word.length > bestMatch.word.length) {
        bestMatch = { category: categoryWord.category, word };
      }
    });
  });

  return bestMatch;
}

function classifyShopping(text) {
  const match = findLongestMatch(text, [
    { category: "food", words: foodWords },
    { category: "daily", words: dailyWords }
  ]);
  return match ? match.category : "shoppingOther";
}

function cleanContext(text) {
  return text.trim();
}

function detectContextFromEntry(entry) {
  const store = stores.find((candidate) => entry.toLowerCase().startsWith(candidate.toLowerCase()));
  if (!store) return { context: "", text: entry };
  const text = entry.replace(new RegExp(`^${store}\\s*(で|にて|の|へ|に)?\\s*`, "i"), "").trim();
  return { context: store, text: text || entry };
}

function splitInput(text, fallbackContext) {
  const entries = [];
  const lines = text
    .split(/[\n。；;]/)
    .map((line) => line.trim())
    .filter(Boolean);

  lines.forEach((line) => {
    const detected = currentMode === "shopping" && !fallbackContext ? detectContextFromEntry(line) : { context: "", text: line };
    const entryContext = fallbackContext || detected.context;
    detected.text
      .split(/[、,，・･／\/]|\s+/)
      .map((entry) => entry.trim())
      .filter(Boolean)
      .forEach((entry) => {
        entries.push({
          text: entry,
          context: entryContext
        });
      });
  });

  return entries;
}

function addItems() {
  const context = cleanContext(contextInput.value);
  const entries = splitInput(input.value, context);
  if (entries.length === 0) {
    input.focus();
    return;
  }

  const now = Date.now();
  const newItems = entries.map((entry, index) => {
    const itemText = entry.text;
    const itemContext = entry.context;
    const category = currentMode === "shopping" ? classifyShopping(itemText) : currentMode;

    return {
      id: crypto.randomUUID(),
      text: itemText,
      category,
      context: itemContext,
      mode: currentMode,
      done: false,
      amount: "",
      createdAt: now + index,
      completedAt: null
    };
  });

  items = [...newItems, ...items];
  input.value = "";
  contextInput.value = "";
  saveItems();
  render();
  input.focus();
}

function setMode(mode) {
  currentMode = mode;
  inputPanel.dataset.mode = mode;
  document.querySelectorAll(".mode-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });

  const config = modeConfig[mode];
  contextLabel.textContent = config.contextLabel;
  contextInput.placeholder = config.contextPlaceholder;
  itemLabel.textContent = config.itemLabel;
  input.placeholder = config.itemPlaceholder;
  inputHint.textContent = config.hint;
  requestAnimationFrame(updateModeOutline);
}

function updateModeOutline() {
  const activeTab = document.querySelector(".mode-tab.is-active");
  if (!modeFrame || !modeOutlinePath || !activeTab) return;

  const frameBox = modeFrame.getBoundingClientRect();
  const tabBox = activeTab.getBoundingClientRect();
  const contentBox = document.querySelector(".mode-content").getBoundingClientRect();

  const w = Math.round(frameBox.width);
  const h = Math.round(frameBox.height);
  const x = Math.round(tabBox.left - frameBox.left);
  const tabW = Math.round(tabBox.width);
  const y = Math.round(contentBox.top - frameBox.top);
  const r = 14;
  const tabR = 14;
  const tabRight = x + tabW;

  // When the active tab sits flush against the frame edge (leftmost/rightmost
  // tab), there isn't enough room for the usual "corner curve + flat shelf +
  // tab curve" construction, and it collapses into a hard corner. In that
  // case, merge both curves into one continuous S-curve (same radius as the
  // normal join) instead, so every tab position gets the same smooth join.
  const leftMerged = x - tabR < r;
  const rightMerged = tabRight + tabR > w - r;
  const leftJoin = Math.max(r, x - tabR);
  const rightJoin = Math.min(w - r, tabRight + tabR);

  const startX = leftMerged ? 0 : r;
  const startY = leftMerged ? y + tabR : y;

  modeOutlinePath.ownerSVGElement.setAttribute("viewBox", `0 0 ${w} ${h}`);
  modeOutlinePath.setAttribute("d", [
    `M ${startX} ${startY}`,
    leftMerged
      ? `C 0 ${y} ${x} ${y} ${x} ${y - tabR}`
      : `H ${leftJoin}` + ` Q ${x} ${y} ${x} ${y - tabR}`,
    `V ${tabR}`,
    `Q ${x} 0 ${x + tabR} 0`,
    `H ${tabRight - tabR}`,
    `Q ${tabRight} 0 ${tabRight} ${tabR}`,
    `V ${y - tabR}`,
    rightMerged
      ? `C ${tabRight} ${y} ${w} ${y} ${w} ${y + tabR}`
      : `Q ${tabRight} ${y} ${rightJoin} ${y}` + ` H ${w - r}` + ` Q ${w} ${y} ${w} ${y + r}`,
    `V ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `H ${r}`,
    `Q 0 ${h} 0 ${h - r}`,
    `V ${leftMerged ? y + tabR : y + r}`,
    leftMerged ? "" : `Q 0 ${y} ${r} ${y}`,
    "Z"
  ].filter(Boolean).join(" "));
}

function setView(view) {
  document.querySelectorAll(".view-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  document.querySelector("#active-view").classList.toggle("is-hidden", view !== "active");
  document.querySelector("#done-view").classList.toggle("is-hidden", view !== "done");
}

function setChecked(id, checked) {
  items = items.map((item) => item.id === id ? { ...item, checked } : item);
  saveItems();
  render();
}

function finishItem(id) {
  items = items.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      done: true,
      checked: false,
      completedAt: item.completedAt || Date.now()
    };
  });
  saveItems();
  render();
}

function finishChecked() {
  const checkedIds = items.filter((item) => !item.done && item.checked).map((item) => item.id);
  if (checkedIds.length === 0) return;
  items = items.map((item) => {
    if (!checkedIds.includes(item.id)) return item;
    return {
      ...item,
      done: true,
      checked: false,
      completedAt: item.completedAt || Date.now()
    };
  });
  saveItems();
  render();
}

function restoreItem(id) {
  items = items.map((item) => item.id === id ? { ...item, done: false, completedAt: null } : item);
  saveItems();
  render();
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  saveItems();
  render();
}

function updateAmount(id, amount) {
  items = items.map((item) => item.id === id ? { ...item, amount } : item);
  saveItems();
  renderTotalsOnly();
}

function clearAmountlessDone() {
  items = items.filter((item) => !(item.done && !parseAmount(item.amount)));
  saveItems();
  render();
}

function resetAllItems() {
  const confirmed = window.confirm("すべてのメモを削除します。よろしいですか？");
  if (!confirmed) return;

  items = [];
  localStorage.removeItem(STORAGE_KEY);
  input.value = "";
  contextInput.value = "";
  setView("active");
  render();
}

function parseAmount(amount) {
  const value = Number(amount);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function formatYen(value) {
  return `${value.toLocaleString("ja-JP")}円`;
}

function render() {
  const activeItems = items.filter((item) => !item.done);
  const doneItems = items.filter((item) => item.done);

  activeCount.textContent = `${activeItems.length}件`;
  activeEmpty.classList.toggle("is-hidden", activeItems.length > 0);
  doneEmpty.classList.toggle("is-hidden", doneItems.length > 0);

  renderStoreList(activeList, activeItems);
  renderCategoryList(doneList, doneItems, "done");
  renderTotalsOnly();
}

function renderTotalsOnly() {
  const doneItems = items.filter((item) => item.done);
  const total = doneItems.reduce((sum, item) => sum + parseAmount(item.amount), 0);
  grandTotal.textContent = formatYen(total);

  document.querySelectorAll("[data-category-total]").forEach((node) => {
    const categoryId = node.dataset.categoryTotal;
    const categoryTotal = doneItems
      .filter((item) => item.category === categoryId)
      .reduce((sum, item) => sum + parseAmount(item.amount), 0);
    node.textContent = formatYen(categoryTotal);
  });
}

function renderCategoryList(container, listItems, variant) {
  container.replaceChildren();

  categories.forEach((category) => {
    const categoryItems = listItems.filter((item) => item.category === category.id);
    if (categoryItems.length === 0) return;

    const categoryNode = categoryTemplate.content.firstElementChild.cloneNode(true);
    const icon = categoryNode.querySelector(".category-icon");
    const name = categoryNode.querySelector(".category-name");
    const count = categoryNode.querySelector(".category-count");
    const storeList = categoryNode.querySelector(".store-list");

    categoryNode.dataset.category = category.id;
    icon.textContent = category.icon;
    name.textContent = category.name;
    count.textContent = variant === "done" ? formatYen(categoryItems.reduce((sum, item) => sum + parseAmount(item.amount), 0)) : `${categoryItems.length}件`;
    if (variant === "done") {
      count.dataset.categoryTotal = category.id;
    }

    groupByContext(categoryItems).forEach((contextGroup) => {
      const groupNode = document.createElement("section");
      const groupHeader = document.createElement("div");
      const groupTitle = document.createElement("span");
      const groupCount = document.createElement("span");
      const list = document.createElement("ul");

      groupNode.className = "store-group";
      groupHeader.className = "store-name";
      list.className = "items";
      groupTitle.textContent = contextGroup.context || "指定なし";
      groupCount.textContent = variant === "done"
        ? formatYen(contextGroup.items.reduce((sum, item) => sum + parseAmount(item.amount), 0))
        : `${contextGroup.items.length}件`;
      groupHeader.append(groupTitle, groupCount);

      contextGroup.items.forEach((item) => {
        list.append(variant === "done" ? createDoneItem(item) : createActiveItem(item));
      });

      groupNode.append(groupHeader, list);
      storeList.append(groupNode);
    });

    container.append(categoryNode);
  });
}

function renderStoreList(container, listItems) {
  container.replaceChildren();

  groupByContext(listItems).forEach((contextGroup) => {
    const storeNode = categoryTemplate.content.firstElementChild.cloneNode(true);
    const icon = storeNode.querySelector(".category-icon");
    const name = storeNode.querySelector(".category-name");
    const count = storeNode.querySelector(".category-count");
    const categoryListNode = storeNode.querySelector(".store-list");

    storeNode.dataset.category = "store";
    icon.textContent = "🏬";
    name.textContent = contextGroup.context || "店指定なし";
    count.textContent = `${contextGroup.items.length}件`;

    categories.forEach((category) => {
      const categoryItems = contextGroup.items.filter((item) => item.category === category.id);
      if (categoryItems.length === 0) return;

      const groupNode = document.createElement("section");
      const groupHeader = document.createElement("div");
      const groupTitle = document.createElement("span");
      const groupCount = document.createElement("span");
      const list = document.createElement("ul");

      groupNode.className = "store-group category-group";
      groupNode.dataset.category = category.id;
      groupHeader.className = "store-name";
      list.className = "items";
      groupTitle.textContent = `${category.icon} ${category.name}`;
      groupCount.textContent = `${categoryItems.length}件`;
      groupHeader.append(groupTitle, groupCount);

      categoryItems.forEach((item) => {
        list.append(createActiveItem(item));
      });

      groupNode.append(groupHeader, list);
      categoryListNode.append(groupNode);
    });

    container.append(storeNode);
  });
}

function createActiveItem(item) {
  const itemNode = activeItemTemplate.content.firstElementChild.cloneNode(true);
  const checkbox = itemNode.querySelector(".done-check");
  const text = itemNode.querySelector(".item-text");
  const finishButton = itemNode.querySelector(".finish-button");

  checkbox.checked = Boolean(item.checked);
  text.textContent = item.text;
  itemNode.classList.toggle("is-done", Boolean(item.checked));

  checkbox.addEventListener("change", () => setChecked(item.id, checkbox.checked));
  finishButton.addEventListener("click", () => finishItem(item.id));

  return itemNode;
}

function createDoneItem(item) {
  const itemNode = doneItemTemplate.content.firstElementChild.cloneNode(true);
  const text = itemNode.querySelector(".item-text");
  const meta = itemNode.querySelector(".done-meta");
  const amountInput = itemNode.querySelector(".amount-input");
  const restoreButton = itemNode.querySelector(".restore-button");
  const deleteButton = itemNode.querySelector(".delete-button");

  text.textContent = item.text;
  meta.textContent = item.completedAt ? `完了 ${new Date(item.completedAt).toLocaleDateString("ja-JP")}` : "完了済み";
  amountInput.value = item.amount || "";

  amountInput.addEventListener("input", () => updateAmount(item.id, amountInput.value));
  restoreButton.addEventListener("click", () => restoreItem(item.id));
  deleteButton.addEventListener("click", () => deleteItem(item.id));

  return itemNode;
}

function groupByContext(categoryItems) {
  const groups = new Map();
  categoryItems.forEach((item) => {
    const context = item.context || "";
    if (!groups.has(context)) {
      groups.set(context, []);
    }
    groups.get(context).push(item);
  });

  return [...groups.entries()].map(([context, groupItems]) => ({
    context,
    items: groupItems
  }));
}

document.querySelectorAll(".mode-tab").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

document.querySelectorAll(".view-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.theme));
});

addButton.addEventListener("click", addItems);
finishCheckedButton.addEventListener("click", finishChecked);
clearDoneButton.addEventListener("click", clearAmountlessDone);
resetAllButton.addEventListener("click", resetAllItems);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    addItems();
  }
});

window.addEventListener("resize", updateModeOutline);

if (window.ResizeObserver && modeFrame) {
  new ResizeObserver(updateModeOutline).observe(modeFrame);
}

setTheme(loadTheme(), false);
setMode(currentMode);
render();
requestAnimationFrame(updateModeOutline);
