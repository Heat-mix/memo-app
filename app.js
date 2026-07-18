const STORAGE_KEY = "kurashi-memo-items-v2";
const THEME_STORAGE_KEY = "kurashi-memo-theme-v1";

const categories = [
  { id: "food", name: "食料品", icon: "🛒" },
  { id: "daily", name: "日用品", icon: "🧴" },
  { id: "cosmeticPersonalCare", name: "化粧品・パーソナルケア", icon: "💄" },
  { id: "medicalHygiene", name: "医薬品・衛生用品", icon: "🩹" },
  { id: "stationeryCraft", name: "文房具＆工作用品", icon: "✏️" },
  { id: "petGoods", name: "ペット用品", icon: "🐶🐈🦜" },
  { id: "seasonalGoods", name: "季節用品", icon: "☘️🌻🍂⛄️" },
  { id: "tools", name: "工具", icon: "🔧" },
  { id: "buddhistGoods", name: "仏具用品", icon: "🟣" },
  { id: "clothing", name: "衣類", icon: "👕👚" },
  { id: "applianceElectrical", name: "家電＆電気用品", icon: "💡" },
  { id: "cookingTools", name: "料理道具", icon: "🥢🥄🍳" },
  { id: "bedding", name: "寝具", icon: "🛏️" },
  { id: "gardening", name: "ガーデニング＆園芸用品", icon: "🪴" },
  { id: "footwear", name: "履き物", icon: "👞" },
  { id: "accessories", name: "アクセサリー", icon: "💍" },
  { id: "shoppingOther", name: "暮らし用品", icon: "🛍" },
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
  "天然水", "ミネラルウォーター", "いろはす", "南アルプスの天然水", "エビアン", "ボルヴィック", "クリスタルガイザー", "緑茶", "烏龍茶", "ジャスミン茶",
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
];

const dailyWords = [
  // 洗濯用品
  "洗剤", "柔軟剤", "漂白剤", "洗濯ネット", "洗濯洗剤", "液体洗剤", "粉末洗剤", "おしゃれ着洗剤",
  "中性洗剤", "洗濯用洗剤", "洗濯用漂白剤", "酸素系漂白剤", "塩素系漂白剤", "衣料用漂白剤", "柔軟仕上げ剤", "柔軟剤シート",
  "洗濯槽クリーナー", "洗濯槽洗浄剤", "洗濯槽洗剤", "洗濯ばさみ", "洗濯バサミ", "物干しハンガー", "ピンチハンガー", "ハンガー",
  "物干し竿", "アイロン", "アイロン台", "アイロン用のり", "衣類用スプレー", "しみ抜き", "染み抜き", "毛玉取り",
  "毛玉取り器", "アタック", "アリエール", "トップ", "ボールド", "ニュービーズ", "エマール", "アクロン",
  "ハイター", "ワイドハイター", "オキシクリーン", "レノア", "ソフラン", "ハミング", "さらさ", "ウタマロ石けん",
  "ウタマロせっけん", "ウタマロリキッド",

  // キッチン用品・保存用品
  "キッチンペーパー", "ラップ", "アルミホイル", "スポンジ", "ジョイ", "キチぺ", "サランラップ", "保存袋",
  "ジップロック", "クッキングシート", "フリーザーバッグ", "キッチンハイター", "キッチンブリーチ", "食品用ラップ", "ラップフィルム", "アルミ箔",
  "ホイル", "クッキングホイル", "オーブンシート", "クッキングペーパー", "キッチンタオル", "ペーパータオル", "保存容器", "密閉容器",
  "タッパー", "タッパー容器", "冷凍保存袋", "冷蔵保存袋", "チャック付き袋", "ポリ袋", "ビニール袋", "水切り袋",
  "三角コーナー用袋", "排水口ネット", "排水口用ネット", "ストックバッグ", "使い捨て手袋", "ポリエチレン手袋", "ゴム手袋", "キッチン手袋",
  "ふきん", "台ふきん", "食器用ふきん", "食器用洗剤", "台所用洗剤", "食洗機用洗剤", "食洗機洗剤", "食器洗いスポンジ",
  "キッチンスポンジ", "たわし", "亀の子たわし", "メラミンスポンジ", "ボトルブラシ", "水筒ブラシ", "排水口クリーナー", "パイプクリーナー",
  "キッチン漂白剤", "台所用漂白剤", "まな板漂白剤", "油汚れ洗剤", "レンジクリーナー", "IHクリーナー", "重曹クリーナー", "重曹スプレー",
  "掃除用重曹", "セスキクリーナー", "クエン酸クリーナー", "クレラップ", "NEWクレラップ", "リード", "リードクッキングペーパー", "リードクッキングシート",
  "クックパー", "キュキュット", "チャーミー", "マジカ", "パイプユニッシュ", "カビキラー", "ウタマロクリーナー",

  // 掃除用品
  "掃除シート", "サンポール", "トイレ洗剤", "お風呂洗剤", "ガラスクリーナー", "消臭剤", "芳香剤", "コロコロ",
  "クイックルワイパー", "掃除用洗剤", "住宅用洗剤", "多目的洗剤", "マルチクリーナー", "床用洗剤", "床クリーナー", "フローリング用洗剤",
  "フローリングシート", "ドライシート", "ウェットシート", "掃除用ウェットシート", "掃除用ドライシート", "モップ", "フロアモップ", "ハンディモップ",
  "ほうき", "ちりとり", "雑巾", "ぞうきん", "掃除用ブラシ", "デッキブラシ", "バケツ", "掃除用手袋",
  "窓用洗剤", "窓ガラスクリーナー", "鏡用クリーナー", "網戸クリーナー", "カーペットクリーナー", "粘着クリーナー", "粘着ローラー", "コロコロテープ",
  "スペアテープ", "ほこり取り", "ホコリ取り", "ほこり取りシート", "ハンディワイパー", "カビ取り剤", "カビ取りスプレー", "カビ防止剤",
  "水垢クリーナー", "水あかクリーナー", "排水口洗剤", "排水管洗浄剤", "排水管クリーナー", "パイプ洗浄剤", "クイックル", "クイックルハンディ",
  "クイックルホームリセット", "マイペット", "かんたんマイペット", "マジックリン", "フローリングマジックリン", "ガラスマジックリン", "バスマジックリン", "ドメスト",
  "激落ちくん",

  // トイレ用品・衛生用品
  "トイレ用洗剤", "トイレクリーナー", "トイレ掃除シート", "トイレ用掃除シート", "流せるトイレシート", "便器用洗剤", "便器クリーナー", "トイレブラシ",
  "トイレ用ブラシ", "トイレ用漂白剤", "トイレ用除菌剤", "トイレ用消臭剤", "トイレ用芳香剤", "トイレ芳香剤", "トイレ消臭剤", "トイレスタンプ",
  "便座シート", "便座カバー", "サニタリーバッグ", "汚物入れ用袋", "トイレマジックリン", "トイレクイックル", "スクラビングバブル", "ブルーレット",
  "ブルーレットおくだけ", "消臭力", "消臭元",

  // 家庭用紙製品・消耗品
  "ティッシュ", "トイレットペーパー", "ごみ袋", "ゴミ袋", "日用品", "箱ティッシュ", "ボックスティッシュ", "ポケットティッシュ",
  "ローションティッシュ", "トイレットロール", "ダブルトイレットペーパー", "シングルトイレットペーパー", "芯なしトイレットペーパー", "お手拭き", "おてふき", "指定ごみ袋",
  "指定ゴミ袋", "半透明ごみ袋", "半透明ゴミ袋", "黒ごみ袋", "黒ゴミ袋", "レジ袋", "新聞紙",

  // 入浴・ヘアケア用品
  "シャンプー", "リンス", "コンディショナー", "ボディソープ", "石けん", "石鹸", "トリートメント", "ヘアトリートメント",
  "ヘアパック", "ヘアマスク", "リンスインシャンプー", "スカルプシャンプー", "薬用シャンプー", "ドライシャンプー", "ボディシャンプー", "ボディウォッシュ",
  "固形石けん", "固形石鹸", "液体石けん", "液体石鹸", "泡石けん", "泡石鹸", "入浴剤", "バスソルト",
  "バスボム", "浴用剤", "あかすり", "ボディタオル", "ナイロンタオル", "浴用タオル", "浴用スポンジ", "シャンプーブラシ",
  "頭皮ブラシ", "バスブラシ", "風呂用スポンジ", "風呂椅子", "風呂いす", "洗面器", "シャワーキャップ", "メリット",
  "パンテーン", "ラックス", "エッセンシャル", "いち髪", "TSUBAKI", "ツバキ", "h&s", "エイチアンドエス",
  "ダヴ", "Dove", "ビオレu", "ミノン", "牛乳石鹸", "牛乳石けん", "バスクリン", "バブ",
  "きき湯",

  // オーラルケア用品
  "歯磨き", "歯みがき", "歯ブラシ", "歯磨き粉", "歯みがき粉", "歯磨き剤", "歯みがき剤", "子ども用歯磨き",
  "子供用歯磨き", "電動歯ブラシ", "替え歯ブラシ", "替えブラシ", "歯間ブラシ", "デンタルフロス", "フロス", "糸ようじ",
  "舌ブラシ", "舌クリーナー", "マウスウォッシュ", "洗口液", "口臭ケア", "口臭スプレー", "入れ歯洗浄剤", "義歯洗浄剤",
  "入れ歯安定剤", "歯ブラシケース", "クリニカ", "システマ", "シュミテクト", "GUM", "オーラツー", "Ora2",
  "ピュオーラ", "NONIO", "ノニオ", "モンダミン", "リステリン", "コンクール", "ポリデント", "タフデント",

  // 手洗い用品
  "ハンドソープ",

  // ベビー食品・分類保留
  "つよいこ", "はいはい", "粉ミルク",

  // 電池・火まわり・生活用品
  "ライター", "電球",

  // 防虫・季節用品
  "防虫剤", "虫よけ", "殺虫剤", "保冷バッグ"
];

const cosmeticPersonalCareWords = [
  // ベースメイク
  "ファンデーション", "リキッドファンデーション", "パウダーファンデーション", "クリームファンデーション", "クッションファンデーション", "ミネラルファンデーション", "ファンデ", "化粧下地",
  "メイク下地", "下地", "プライマー", "フェイスパウダー", "ルースパウダー", "プレストパウダー", "おしろい", "白粉",
  "コンシーラー", "コントロールカラー", "BBクリーム", "CCクリーム",

  // ポイントメイク
  "アイシャドウ", "アイカラー", "アイライナー", "リキッドアイライナー", "ペンシルアイライナー", "ジェルアイライナー", "マスカラ", "マスカラ下地",
  "アイブロウ", "眉墨", "眉ずみ", "眉ペンシル", "アイブロウペンシル", "アイブロウパウダー", "眉マスカラ", "チーク",
  "頬紅", "ハイライト", "シェーディング", "リップ", "口紅", "リップカラー", "リップグロス", "グロス",
  "リップライナー", "色付きリップ", "ティント", "リップティント",

  // 化粧落とし・洗顔
  "洗顔", "クレンジング", "クレンジングオイル", "クレンジングミルク", "クレンジングジェル", "クレンジングバーム", "クレンジングクリーム", "メイク落とし",
  "化粧落とし", "ポイントメイクリムーバー", "アイメイクリムーバー", "リムーバー", "洗顔料", "洗顔フォーム", "洗顔ジェル", "洗顔パウダー",
  "洗顔石けん", "洗顔石鹸", "泡洗顔", "ふき取りクレンジング", "拭き取りクレンジング", "クレンジングシート", "メイク落としシート",

  // 基礎化粧品・スキンケア
  "化粧水", "乳液", "ハンドクリーム", "保湿クリーム", "日焼け止め", "美容液", "保湿液", "保湿ジェル",
  "フェイスクリーム", "ナイトクリーム", "デイクリーム", "オールインワン", "オールインワンジェル", "導入液", "導入美容液", "ブースター",
  "ふき取り化粧水", "拭き取り化粧水", "収れん化粧水", "ミスト化粧水", "フェイスミスト", "アイクリーム", "目元クリーム", "リップクリーム",
  "薬用リップ", "ボディクリーム", "ボディローション", "ボディミルク", "ボディオイル", "フェイスオイル", "保湿オイル", "UVクリーム",
  "UVジェル", "UVミルク", "UVスプレー", "サンスクリーン", "フェイスパック", "シートマスク", "フェイスマスク", "泥パック",
  "クレイパック", "ナイトパック",

  // ヘアスタイリング・ヘアケア
  "ヘアワックス", "ヘアムース", "ムース", "ヘアジェル", "ヘアスプレー", "ケープ", "ヘアオイル", "ヘアミルク",
  "洗い流さないトリートメント", "アウトバストリートメント", "ヘアクリーム", "スタイリング剤", "寝ぐせ直し", "寝癖直し", "ヘアミスト", "育毛剤",
  "養毛剤", "白髪染め", "ヘアカラー", "カラー剤", "ブリーチ剤", "カラートリートメント", "カラーシャンプー",

  // ネイル用品・爪の手入れ
  "マニキュア", "ネイルカラー", "ネイルポリッシュ", "ジェルネイル", "ネイルジェル", "除光液", "ネイルリムーバー", "トップコート",
  "ベースコート", "ネイルオイル", "キューティクルオイル", "甘皮処理", "甘皮リムーバー", "爪やすり", "爪ヤスリ", "ネイルファイル",
  "爪切り", "つめ切り", "ネイルクリッパー", "爪磨き", "つめ磨き", "ネイルバッファー", "ネイルシール", "ネイルチップ",
  "付け爪", "つけ爪",

  // 化粧道具・小物
  "コットン", "化粧用コットン", "コットンパフ", "パフ", "スポンジパフ", "メイクスポンジ", "ファンデーションスポンジ", "化粧スポンジ",
  "フェイスブラシ", "メイクブラシ", "化粧ブラシ", "チークブラシ", "アイシャドウブラシ", "リップブラシ", "アイブロウブラシ", "スクリューブラシ",
  "ビューラー", "アイラッシュカーラー", "つけまつげ", "付けまつげ", "つけまつげ用のり", "まつげのり", "まつ毛美容液", "まつげ美容液",
  "眉用はさみ", "眉ばさみ", "眉毛はさみ", "毛抜き", "ピンセット", "あぶらとり紙", "脂取り紙", "化粧ポーチ",
  "コスメポーチ", "コンパクトミラー", "手鏡", "卓上鏡",

  // シェービング・身だしなみ用品
  "カミソリ", "シェービング", "剃刀", "シェーバー", "電気シェーバー", "替刃", "替え刃", "カミソリ替刃",
  "シェービングフォーム", "シェービングジェル", "シェービングクリーム", "アフターシェーブ", "アフターシェーブローション", "除毛クリーム", "脱毛クリーム", "除毛剤",
  "脱毛剤", "鼻毛カッター", "鼻毛はさみ", "耳かき", "耳掃除", "ヘアブラシ", "くし", "櫛",
  "コーム", "ヘアゴム", "髪ゴム", "ヘアピン", "カチューシャ",

  // 化粧品・パーソナルケアの商品名・ブランド名
  "ビオレ", "ビオレUV", "ビオレメイク落とし", "ニベア", "ニベアクリーム", "ニベア青缶", "メンソレータム", "メンターム",
  "肌ラボ", "極潤", "白潤", "雪肌精", "無印良品化粧水", "ちふれ", "セザンヌ", "キャンメイク",
  "資生堂", "マキアージュ", "インテグレート", "エリクシール", "プリオール", "カネボウ", "コーセー", "ソフィーナ",
  "花王ソフィーナ", "オルビス", "ファンケル", "DHC", "キュレル", "アベンヌ", "ヴァセリン", "ワセリン",
  "ユースキン", "アトリックス", "ケイト", "KATE", "メイベリン", "ロムアンド", "rom&nd", "オペラ"
];

const medicalHygieneWords = [
  // 風邪・発熱・のど・鼻
  "薬", "うがい薬", "仁丹", "風邪薬", "かぜ薬", "総合感冒薬", "解熱剤", "解熱鎮痛剤",
  "鎮痛剤", "痛み止め", "頭痛薬", "発熱薬", "せき止め", "咳止め", "咳止め薬", "鎮咳薬",
  "痰切り", "去痰薬", "鼻炎薬", "鼻水薬", "鼻づまり薬", "アレルギー薬", "抗アレルギー薬", "のど薬",
  "喉の薬", "のどスプレー", "喉スプレー", "トローチ", "薬用のど飴", "医薬品のど飴",

  // 胃腸薬・整腸薬
  "胃薬", "胃腸薬", "健胃薬", "胃酸薬", "制酸剤", "整腸薬", "整腸剤", "下痢止め",
  "下痢止め薬", "便秘薬", "下剤", "浣腸", "酔い止め", "乗り物酔い薬", "吐き気止め",

  // 外用薬・皮膚薬
  "消毒液", "消毒スプレー", "塗り薬", "軟膏", "クリーム薬", "かゆみ止め", "痒み止め", "虫刺され薬",
  "虫さされ薬", "湿疹薬", "皮膚炎薬", "あせも薬", "火傷薬", "やけど薬", "傷薬", "消毒薬",
  "殺菌消毒薬", "化膿止め", "抗菌軟膏", "水虫薬", "うおのめ薬", "魚の目薬", "たこ薬", "口内炎薬",
  "口内炎パッチ",

  // 湿布・痛みのケア
  "湿布", "湿布薬", "冷湿布", "温湿布", "貼り薬", "貼付薬", "鎮痛消炎剤", "肩こり薬",
  "腰痛薬", "筋肉痛薬", "冷却シート", "熱冷ましシート", "冷却ジェル",

  // 目・耳・鼻
  "目薬", "点眼薬", "人工涙液", "洗眼薬", "アイボン", "コンタクト洗浄液", "コンタクト保存液", "コンタクト消毒液",
  "コンタクト用品", "耳薬", "点耳薬", "鼻スプレー", "点鼻薬", "鼻洗浄", "鼻うがい",

  // 救急用品
  "マスク", "ばんそうこう", "絆創膏", "口拭き", "救急箱", "救急セット", "大型絆創膏", "防水絆創膏",
  "傷パッド", "ガーゼ", "滅菌ガーゼ", "包帯", "伸縮包帯", "ネット包帯", "三角巾", "医療用テープ",
  "サージカルテープ", "テーピング", "綿球", "脱脂綿", "消毒綿", "アルコール綿", "体温計", "電子体温計",
  "氷のう", "アイスバッグ",

  // マスク・除菌・衛生用品
  "除菌シート", "除菌スプレー", "ウェットティッシュ", "綿棒", "不織布マスク", "使い捨てマスク", "立体マスク", "子ども用マスク",
  "子供用マスク", "マスクケース", "除菌ウェットティッシュ", "除菌ティッシュ", "アルコールティッシュ", "アルコールスプレー", "アルコール消毒液", "手指消毒液",
  "手指消毒剤", "消毒ジェル", "ハンドジェル", "衛生手袋", "耳掃除用綿棒", "口ふき",

  // 生理用品・女性衛生用品
  "ウィスパー", "アンネパッド", "ナプキン", "生理用品", "生理用ナプキン", "昼用ナプキン", "夜用ナプキン", "羽つきナプキン",
  "羽なしナプキン", "おりものシート", "パンティライナー", "タンポン", "月経カップ", "吸水ショーツ", "サニタリーショーツ", "デリケートゾーンソープ",
  "デリケートゾーンシート", "ソフィ", "ロリエ", "エリス", "センターイン", "アンネ", "サラサーティ", "チャームナップ",
  "ポイズ",

  // ベビー衛生用品
  "おしり拭き", "ムーニーマン", "マミーポコ", "メリーズ", "おむつ", "パンパース", "紙おむつ", "紙オムツ",
  "新生児用おむつ", "新生児用オムツ", "テープタイプおむつ", "パンツタイプおむつ", "おむつパッド", "おむつライナー", "おしりふき", "お尻拭き",
  "赤ちゃん用おしりふき", "赤ちゃん用綿棒", "ベビー綿棒", "ベビー用爪切り", "ベビー用体温計", "おむつ用ごみ袋", "おむつ用ゴミ袋", "おむつ消臭袋",
  "母乳パッド", "授乳パッド", "ムーニー", "グーン", "GOO.N", "ゲンキ", "Genki",

  // 医薬品の商品名候補
  "バファリン", "イブ", "EVE", "ロキソニン", "ノーシン", "セデス", "タイレノール", "パブロン",
  "ルル", "ベンザブロック", "コンタック", "ストナ", "コルゲン", "新ルルA", "龍角散", "龍角散ダイレクト",
  "浅田飴", "ヴィックス", "正露丸", "新ビオフェルミンS", "ビオフェルミン", "太田胃散", "キャベジン", "ガスター10",
  "新三共胃腸薬", "ストッパ", "コーラック", "イチジク浣腸", "アネロン", "ムヒ", "液体ムヒ", "ウナコーワ",
  "オロナイン", "メンソレータム軟膏", "マキロン", "キズアワワ", "ドルマイシン", "ボラギノール", "サロンパス", "バンテリン",
  "フェイタス", "ロイヒつぼ膏", "熱さまシート", "冷えピタ", "アルガード", "サンテ", "ロート目薬", "養潤水",
  "イソジン", "コルゲンうがい薬"
];

const stationeryCraftWords = [
  // 文房具＆工作用品
  "鉛筆", "色鉛筆", "クレヨン", "絵の具", "パレット", "絵の具用バケツ", "シャープペンシル", "シャーペン", "ボールペン", "油性ペン", "水性ペン", "マーカー", "蛍光ペン",
  "消しゴム", "定規", "ものさし", "ノート", "メモ帳", "付箋", "ふせん", "封筒", "便箋", "はさみ", "ハサミ", "カッター",
  "カッター替刃", "スティックのり", "セロハンテープ", "セロテープ", "ガムテープ", "両面テープ", "ホッチキス", "ホチキス",
  "ホッチキス針", "クリップ", "輪ゴム", "ファイル", "クリアファイル", "バインダー", "修正液", "修正テープ"
];

const petGoodsWords = [
  // ペット用品
  "ペットフード", "犬用フード", "ドッグフード", "猫用フード", "キャットフード", "犬のおやつ", "猫のおやつ", "ペットのおやつ",
  "ペットシーツ", "犬用トイレシート", "猫砂", "ネコ砂", "ペット用トイレ", "ペット用消臭剤", "ペット用除菌剤",
  "ペット用シャンプー", "ペット用ブラシ", "首輪", "ハーネス", "ペット用食器", "給水器", "ペット用おむつ", "ペット用オムツ",
  "うんち袋", "ペット用ごみ袋", "犬用リード", "ペット用リード"
];

const seasonalGoodsWords = [
  // 季節用品
  "虫よけスプレー", "虫除けスプレー", "虫よけミスト", "虫除けミスト", "虫よけリング", "虫除けリング", "虫よけシール", "虫除けシール",
  "蚊取り線香", "蚊取りマット", "蚊取り器", "電気蚊取り", "蚊取りリキッド", "殺虫スプレー", "害虫駆除剤", "ゴキブリ駆除剤",
  "アリ駆除剤", "ダニ取り", "ダニよけ", "ダニ除け", "防虫シート", "衣類用防虫剤", "除湿剤", "湿気取り", "乾燥剤",
  "使い捨てカイロ", "貼るカイロ", "貼らないカイロ", "保冷剤", "日傘", "雨傘", "折りたたみ傘", "レインコート",
  "キンチョール", "金鳥", "アースジェット", "フマキラー", "ベープ", "アースノーマット", "金鳥の渦巻", "ムシューダ",
  "ミセスロイド", "タンスにゴン", "水とりぞうさん", "ドライペット", "ホカロン", "貼るホカロン"
];

const toolWords = [
  // 基本工具
  "ドライバー", "プラスドライバー", "マイナスドライバー", "精密ドライバー", "ドライバーセット", "六角レンチ", "レンチ", "モンキーレンチ",
  "スパナ", "ラチェットレンチ", "ペンチ", "ラジオペンチ", "ニッパー", "プライヤー", "ハンマー", "金づち", "かなづち", "木づち", "ゴムハンマー",

  // 測定・固定用品
  "メジャー", "巻尺", "コンベックス", "水平器", "差し金", "曲尺", "クランプ", "万力", "結束バンド", "ケーブルタイ", "針金", "ワイヤー", "S字フック", "フック",

  // 切断・研磨用品
  "のこぎり", "ノコギリ", "金切りのこぎり", "糸のこ", "カッター", "工具用カッター", "替刃", "やすり", "紙やすり", "サンドペーパー", "金属やすり",

  // 穴あけ・電動工具
  "電動ドライバー", "インパクトドライバー", "ドリル", "電動ドリル", "ドリル刃", "ビット", "ホールソー", "グルーガン", "はんだごて", "半田ごて",

  // 補修・接着用品
  "瞬間接着剤", "強力接着剤", "木工用ボンド", "エポキシ接着剤", "補修テープ", "養生テープ", "ビニールテープ", "絶縁テープ", "ダクトテープ",
  "アルミテープ", "銅テープ", "シリコン補修剤", "パテ", "コーキング剤", "潤滑油", "防錆スプレー",

  // 商品名
  "クレ556", "KURE 5-56", "ゴリラテープ", "アロンアルファ", "セメダイン", "ボンド", "スコッチ", "ネジザウルス"
];

const buddhistGoodsWords = [
  // 仏具用品
  "線香", "お線香", "仏壇用線香", "毎日香", "青雲", "香樹林", "ろうそく", "ローソク", "蝋燭", "仏壇用ろうそく",
  "仏壇用ローソク", "マッチ", "着火ライター", "チャッカマン", "お墓参り用品", "墓参り用品", "仏花", "お供え花", "お供え物", "供物",
  "盆提灯", "提灯", "精霊馬", "迎え火", "送り火", "ハイテクお盆"
];

const clothingWords = [
  // 肌着・下着
  "下着", "肌着", "インナー", "シャツ", "半袖シャツ", "長袖シャツ", "タンクトップ", "キャミソール", "ブラジャー", "ブラ", "ショーツ", "パンツ",
  "ボクサーパンツ", "トランクス", "腹巻き", "ペチコート", "ステテコ",

  // 靴下・足まわり
  "靴下", "くつ下", "ソックス", "ハイソックス", "タイツ", "ストッキング", "レギンス", "スパッツ", "足袋",

  // 上衣
  "Tシャツ", "ティーシャツ", "ポロシャツ", "ブラウス", "ワイシャツ", "カットソー", "トレーナー", "スウェット", "パーカー", "セーター", "ニット", "カーディガン", "ベスト",

  // 下衣
  "ズボン", "ジーンズ", "デニム", "チノパン", "スラックス", "スカート", "ハーフパンツ", "短パン", "ショートパンツ", "ジャージ",

  // 上着・防寒着
  "上着", "ジャケット", "コート", "スプリングコート", "ジャンパー", "ブルゾン", "ダウン", "ダウンジャケット", "ウインドブレーカー", "レインウェア", "防寒着", "フリース", "どんぶく",

  // 部屋着・睡眠着
  "部屋着", "ルームウェア", "パジャマ", "寝巻き", "ネグリジェ", "甚平", "作務衣",

  // 子ども・学校用品
  "子供服", "子ども服", "ベビー服", "ロンパース", "制服", "体操着", "体操服", "スクールシャツ", "給食着", "給食エプロン", "水着", "スクール水着",

  // 衣類小物
  "帽子", "キャップ", "ニット帽", "手袋", "マフラー", "ストール", "ネックウォーマー", "ベルト", "サスペンダー", "エプロン", "割烹着", "鈴",

  // 商品名・シリーズ名
  "ヒートテック", "エアリズム", "ウルトラライトダウン", "さら肌インナー", "あったかインナー",

  // 和服
  "着物", "帯", "半てん", "豆絞り", "浴衣"
];

const applianceElectricalWords = [
  // 家電＆電気用品
  "電池", "乾電池", "アルカリ電池", "マンガン電池", "単1電池", "単一電池", "単2電池", "単二電池", "単3電池", "単三電池",
  "単4電池", "単四電池", "ボタン電池", "コイン電池", "充電池", "充電式電池", "電池充電器", "充電器", "USB充電器",
  "USBケーブル", "充電ケーブル", "延長コード", "電源タップ", "テーブルタップ", "コンセント", "変換プラグ", "LED電球",
  "蛍光灯", "常夜灯", "豆電球", "懐中電灯", "ライト", "ランタン",

  // 調理家電
  "炊飯器", "餅つき機", "オーブン", "オーブンレンジ", "レンジ", "トースター", "オーブントースター", "フライヤー", "ガステーブル", "ホットプレート",
  "ガスコンロ", "電動ミキサー", "ミキサー", "ハンドミキサー", "ブレンダー", "フードプロセッサー", "ジューサー", "コーヒーメーカー",
  "ヨーグルトメーカー", "アイスメーカー", "かき氷機", "製氷機", "冷蔵庫", "冷凍庫",

  // 生活家電
  "洗濯機", "乾燥機", "洗濯乾燥機", "エアコン", "ヒーター", "ストーブ", "反射式ストーブ", "ガスストーブ", "掃除機", "扇風機", "送風機",
  "こたつ", "コタツ", "ドライヤー", "ヘアアイロン", "マッサージ機",

  // 映像・音響機器
  "テレビ", "ビデオデッキ", "DVDデッキ", "CDラジカセ", "CDプレーヤー", "CDプレイヤー", "ポータブルCDプレーヤー", "ポータブルCDプレイヤー",
  "携帯ラジオ", "ラジオ", "ステレオ", "拡声器", "マイク", "コンデンサーマイク", "ダイナミックマイク", "マイクロフォン", "マイクスタンド",
  "ウォークマン", "ヘッドフォン", "イヤフォン", "イヤホン",

  // カメラ・通信機器
  "Webカメラ", "カメラ", "デジタルカメラ", "使い捨てカメラ", "電話機", "電話", "携帯電話", "スマートフォン", "スマホ",

  // 計測・時計類
  "体重計", "血圧計", "時計", "目覚まし時計", "置き時計", "掛け時計", "アナログ時計", "デジタル時計", "腕時計", "ウォッチ", "ストップウォッチ"
];

const cookingToolsWords = [
  // 鍋・フライパン
  "鍋", "片手鍋", "両手鍋", "雪平鍋", "ゆきひら鍋", "土鍋", "圧力鍋", "蒸し器", "せいろ", "フライパン", "卵焼き器", "玉子焼き器",
  "中華鍋", "揚げ物鍋", "天ぷら鍋", "鍋蓋", "フライパン蓋",

  // 包丁・まな板
  "包丁", "三徳包丁", "菜切り包丁", "出刃包丁", "ペティナイフ", "パン切り包丁", "キッチンばさみ", "料理ばさみ", "包丁研ぎ", "砥石", "まな板", "カッティングボード",

  // 調理器具
  "おたま", "レードル", "フライ返し", "ターナー", "木べら", "しゃもじ", "菜箸", "トング", "泡立て器", "ホイッパー", "ヘラ", "シリコンヘラ",
  "ゴムべら", "スパチュラ", "穴あきおたま", "あく取り", "おろし金", "ピーラー", "皮むき器", "スライサー", "千切り器",

  // ボウル・ざる
  "ボウル", "ボール", "ステンレスボウル", "ざる", "ザル", "米とぎざる", "こし器", "茶こし", "計量カップ", "計量スプーン", "はかり", "キッチンスケール",

  // 保存・下ごしらえ
  "保存容器", "密閉容器", "タッパー", "ガラスタッパー", "バット", "トレー", "製氷皿", "漏斗", "じょうご", "すり鉢", "すりこぎ", "めん棒", "麺棒",
  "缶切り", "栓抜き", "ワインオープナー", "コルク抜き",

  // 食器・カトラリー
  "皿", "お皿", "茶碗", "丼", "どんぶり", "汁椀", "スープ皿", "小鉢", "コップ", "グラス", "マグカップ", "箸", "スプーン", "フォーク", "ナイフ", "箸置き", "レンゲ",

  // 弁当・携帯用品
  "弁当箱", "お弁当箱", "ランチボックス", "水筒", "マグボトル", "スープジャー", "箸箱", "弁当カップ", "おかずカップ", "ピック",

  // 商品名・シリーズ名
  "ティファール", "サーモス", "THERMOS", "ジップロックコンテナー", "iwaki", "イワキ", "野田琺瑯", "ストウブ", "ルクルーゼ", "和平フレイズ", "貝印"
];

const beddingWords = [
  // 布団・ベッド用品
  "布団", "ふとん", "掛け布団", "敷き布団", "掛布団", "敷布団", "羽毛布団", "肌掛け布団", "夏掛け布団", "こたつ布団", "ベッド", "ベッドフレーム",
  "マットレス", "敷布団マット", "折りたたみマットレス",

  // 枕
  "枕", "まくら", "抱き枕", "抱きまくら", "低反発枕", "高反発枕", "そば殻枕", "枕カバー", "まくらカバー", "ピローケース",

  // シーツ・カバー
  "シーツ", "敷きシーツ", "ボックスシーツ", "フラットシーツ", "ベッドシーツ", "布団カバー", "掛け布団カバー", "敷き布団カバー", "マットレスカバー",
  "防水シーツ", "ベッドパッド", "敷きパッド",

  // 毛布・タオルケット
  "毛布", "ブランケット", "ひざ掛け", "タオルケット", "ガーゼケット", "肌掛け", "掛け物", "電気毛布", "着る毛布",

  // 季節・快眠用品
  "冷感敷きパッド", "接触冷感シーツ", "冷感枕パッド", "あったか敷きパッド", "冬用敷きパッド", "除湿シート", "布団乾燥シート", "蚊帳",

  // 寝具周辺
  "ベッドガード", "ベッド用手すり", "布団収納袋", "圧縮袋", "枕パッド", "布団クリップ", "シーツクリップ", "すのこ", "ベッド下収納",

  // 商品名・シリーズ名
  "Nクール", "Nウォーム", "エアウィーヴ", "トゥルースリーパー", "テンピュール", "西川", "昭和西川", "ムアツ", "ニトリの敷きパッド"
];

const gardeningWords = [
  // ガーデニング＆園芸用品
  "土", "培養土", "花の土", "野菜の土", "腐葉土", "赤玉土", "鹿沼土", "堆肥", "肥料", "液体肥料", "化成肥料", "油かす", "石灰", "苦土石灰",
  "スコップ", "シャベル", "移植ごて", "ジョウロ", "じょうろ", "ホース", "ホースリール", "噴霧器", "霧吹き", "植木鉢", "プランター", "鉢底石", "鉢底ネット",
  "受け皿", "支柱", "園芸ネット", "麻ひも", "園芸用手袋", "剪定ばさみ", "園芸ばさみ", "草刈り鎌", "鎌", "熊手", "レーキ", "除草剤", "草取り", "草むしり",
  "防草シート", "種", "野菜の種", "花の種", "球根", "苗", "花苗", "野菜苗"
];

const footwearWords = [
  // 履き物
  "靴", "ハイヒール", "運動靴", "内履き", "中ズック", "外ズック", "スニーカー", "ローファー", "つっかけ", "ぞうり", "草履", "サンダル",
  "ビーチサンダル", "長靴", "長ぐつ", "ブーツ", "革靴", "上履き", "上靴", "安全靴", "レインブーツ", "パンプス", "ミュール", "スリッパ",
  "ルームシューズ", "クロッグ", "モカシン", "登山靴", "トレッキングシューズ", "瞬足", "クロックス"
];

const accessoryWords = [
  // アクセサリー
  "指輪", "ネックレス", "ブレスレット", "腕輪", "アンクレット", "イヤリング", "ピアス", "ブローチ", "コサージュ", "ヘアバンド",
  "ヘアゴム", "ヘアクリップ", "バレッタ", "シュシュ", "ヘアピン", "かんざし", "髪飾り", "カフス", "タイピン", "ネクタイピン"
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
    { category: "daily", words: dailyWords },
    { category: "cosmeticPersonalCare", words: cosmeticPersonalCareWords },
    { category: "medicalHygiene", words: medicalHygieneWords },
    { category: "stationeryCraft", words: stationeryCraftWords },
    { category: "petGoods", words: petGoodsWords },
    { category: "seasonalGoods", words: seasonalGoodsWords },
    { category: "tools", words: toolWords },
    { category: "buddhistGoods", words: buddhistGoodsWords },
    { category: "clothing", words: clothingWords },
    { category: "applianceElectrical", words: applianceElectricalWords },
    { category: "cookingTools", words: cookingToolsWords },
    { category: "bedding", words: beddingWords },
    { category: "gardening", words: gardeningWords },
    { category: "footwear", words: footwearWords },
    { category: "accessories", words: accessoryWords }
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
