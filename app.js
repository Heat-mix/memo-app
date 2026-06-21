const STORAGE_KEY = "kurashi-memo-items-v2";

const categories = [
  { id: "food", name: "食べ物", icon: "🍎" },
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
  "冷凍食品", "弁当", "惣菜", "からあげ", "カレー", "シチュー", "ふりかけ", "海苔", "のり"
];

const dailyWords = [
  "洗剤", "柔軟剤", "漂白剤", "ティッシュ", "トイレットペーパー", "キッチンペーパー", "ラップ", "アルミホイル",
  "シャンプー", "リンス", "コンディショナー", "ボディソープ", "石けん", "石鹸", "歯磨き", "歯みがき", "歯ブラシ",
  "ごみ袋", "ゴミ袋", "スポンジ", "電池", "マスク", "薬", "ばんそうこう", "絆創膏", "日用品", "掃除シート"
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
    hint: "スペース、読点「、」、中点「・」、改行で区切れます。買い物は食べ物・日用品に自動で分けます。"
  },
  errand: {
    contextLabel: "場所 任意",
    contextPlaceholder: "例：ローソン、郵便局、病院",
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
const contextInput = document.querySelector("#context-input");
const contextLabel = document.querySelector("#context-label");
const itemLabel = document.querySelector("#item-label");
const inputHint = document.querySelector("#input-hint");
const addButton = document.querySelector("#add-button");
const activeCount = document.querySelector("#active-count");
const activeList = document.querySelector("#active-list");
const doneList = document.querySelector("#done-list");
const activeEmpty = document.querySelector("#active-empty");
const doneEmpty = document.querySelector("#done-empty");
const finishCheckedButton = document.querySelector("#finish-checked-button");
const clearDoneButton = document.querySelector("#clear-done-button");
const grandTotal = document.querySelector("#grand-total");
const categoryTemplate = document.querySelector("#category-template");
const activeItemTemplate = document.querySelector("#active-item-template");
const doneItemTemplate = document.querySelector("#done-item-template");

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
  document.querySelectorAll(".mode-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });

  const config = modeConfig[mode];
  contextLabel.textContent = config.contextLabel;
  contextInput.placeholder = config.contextPlaceholder;
  itemLabel.textContent = config.itemLabel;
  input.placeholder = config.itemPlaceholder;
  inputHint.textContent = config.hint;
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

  renderCategoryList(activeList, activeItems, "active");
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

addButton.addEventListener("click", addItems);
finishCheckedButton.addEventListener("click", finishChecked);
clearDoneButton.addEventListener("click", clearAmountlessDone);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    addItems();
  }
});

setMode(currentMode);
render();
