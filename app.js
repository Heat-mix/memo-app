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
  "米", "ごはん", "餅", "もち", "パン", "食パン", "ロールパン", "うどん", "そば", "パスタ", "ラーメン", "そうめん",
  "牛乳", "豆乳", "ヨーグルト", "チーズ", "バター", "卵", "たまご",
  "鶏肉", "豚肉", "牛肉", "ひき肉", "ハム", "ウインナー", "ベーコン", "魚", "鮭", "サバ", "まぐろ", "刺身", "しらす",
  "豆腐", "納豆", "油揚げ", "こんにゃく", "ちくわ", "かまぼこ",
  "野菜", "玉ねぎ", "にんじん", "じゃがいも", "キャベツ", "レタス", "トマト", "きゅうり", "大根", "白菜", "ねぎ", "ブロッコリー", "ほうれん草", "もやし", "きのこ", "しめじ", "えのき",
  "果物", "りんご", "バナナ", "みかん", "いちご", "ぶどう", "キウイ", "梨",
  "水", "お茶", "麦茶", "コーヒー", "ジュース", "炭酸", "牛乳",
  "醤油", "しょうゆ", "味噌", "みそ", "砂糖", "塩", "酢", "油", "ごま油", "ソース", "マヨネーズ", "ケチャップ", "ドレッシング", "だし", "コンソメ",
  "お菓子", "チョコ", "アイス", "せんべい", "スナック", "クッキー",
  "冷凍食品", "弁当", "惣菜", "からあげ", "カレー", "シチュー", "ふりかけ", "海苔", "のり",
  "肉", "イワシ", "タラ", "イカ", "タコ",
  "エリンギ", "シイタケ", "しいたけ", "椎茸", "マイタケ", "まいたけ", "舞茸", "マツタケ", "松茸", "ヒラタケ", "平茸",
  "小麦粉", "ホットケーキミックス", "ホケミ", "パン粉", "片栗粉", "天ぷら粉", "お好み焼き粉", "カレールー", "シチュールー",
  "鰹節", "かつお節", "煮干し", "にぼし", "昆布", "こんぶ", "出汁", "だしパック", "出汁パック",
  "ビスケット", "ポテチ", "ポテトチップス", "ドーナツ", "ドーナッツ",
  "ペットボトル飲料", "スポーツ飲料", "ポカリ", "ポカリスエット", "アクエリ", "アクエリアス", "コーラ", "ペプシ", "炭酸水", "ウーロン茶",
  "パイナップル", "スイカ", "さくらんぼ", "スモモ",
  "焼きそば", "冷やし中華", "冷麺", "じゃじゃ麺",
  "玉菜", "菜葉", "なっぱ", "菜っぱ",
  "エンゼルパイ", "抹茶", "ささにしき", "あきたこまち", "銀河のしずく", "ひとめぼれ", "紅生姜", "キャラメル", "桃缶", "歌舞伎揚",
  "豆板醤", "ココナッツオイル", "オリーブオイル", "じゃがりこ", "トッポ", "ポッケ", "とうもろこし", "きみ", "焙じ茶", "サワークリーム",
  "マッシュルーム", "里いも", "ひじき", "おから", "焼酎", "料理酒", "ウイスキー", "のどごし生", "日本酒", "缶ビール",
  "チャーシュー", "焼豚", "春巻き", "大葉", "めんつゆ", "ゆうげ", "あさげ", "しらたき", "いとこん", "CCレモン",
  "ウェルチ", "ピラフ", "チャーハン", "炒飯", "シュウマイ", "焼売", "冷凍餃子", "餃子", "ジャム", "マーガリン",
  "梅干し", "みりん", "イギリストースト", "スタミナ源たれ", "源たれ", "ジンギスカン", "ココア", "アラザン", "仁丹", "メロン",
  "レモン", "お好み焼き", "たこ焼き", "からし", "わさび", "ホイップクリーム", "生クリーム", "クリーム", "あられ", "ジンジャーエール",
  "コーンスープ", "ポッキー", "ピザ", "オロナミンC", "ヤクルト", "ゼリー", "クラッカー", "ファンタ", "小松菜", "強力粉",
  "薄力粉", "だんご", "団子", "いなり寿司", "寿司", "茶碗蒸し", "カップラ", "カップ麺", "春雨", "ガム",
  "グミ", "飴", "キャンディー", "ラムネ", "カニカマ", "缶詰", "鯖缶", "ツナ缶", "ウィンナー", "ソーセージ",
  "みつば", "なめたけ", "なめこ", "ミルク"
];

const dailyWords = [
  "洗剤", "柔軟剤", "漂白剤", "ティッシュ", "トイレットペーパー", "キッチンペーパー", "ラップ", "アルミホイル",
  "シャンプー", "リンス", "コンディショナー", "ボディソープ", "石けん", "石鹸", "歯磨き", "歯みがき", "歯ブラシ",
  "ごみ袋", "ゴミ袋", "スポンジ", "電池", "マスク", "薬", "ばんそうこう", "絆創膏", "日用品", "掃除シート",
  "ハンドソープ", "おしり拭き", "口拭き", "ムーニーマン", "マミーポコ", "つよいこ", "はいはい", "メリーズ", "ウィスパー", "アンネパッド", "ナプキン", "ジョイ", "キチぺ"
];

const stores = [
  "イオン", "西友", "ライフ", "業務スーパー", "コストコ", "スーパー", "コンビニ",
  "ドラッグストア", "薬局", "マツキヨ", "ウエルシア", "スギ薬局", "ダイソー",
  "百均", "セブン", "ファミマ", "ローソン", "Amazon", "楽天"
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

function includesAny(text, words) {
  const normalized = normalizeText(text);
  return words.some((word) => normalized.includes(word.toLowerCase()));
}

function classifyShopping(text) {
  if (includesAny(text, foodWords)) return "food";
  if (includesAny(text, dailyWords)) return "daily";
  return "shoppingOther";
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
