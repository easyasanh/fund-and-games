const STORAGE_KEY = "fund-and-games-save-v1";
const EXPORT_PREFIX = "FUNDGAMES1:";
const SAVE_INTERVAL_MS = 5000;
const upgradeMilestones = [
  { count: 10, bonus: 0.5, label: "+50% output" },
  { count: 25, bonus: 1, label: "+100% output" },
  { count: 50, bonus: 2, label: "+200% output" },
  { count: 100, bonus: 4, label: "+400% output" },
  { count: 250, bonus: 8, label: "+800% output" }
];

const speedOptions = [1, 5, 20, 100];

const eras = [
  {
    name: "Retail Investor",
    goal: 25000,
    copy: "You are trading your own account. Research is everything and every click still feels personal.",
    unlocks: "Era 2 unlocks People upgrades and the prestige tree.",
    categories: ["research"],
    buyModes: ["one"]
  },
  {
    name: "Fund Manager",
    goal: 1250000,
    copy: "Outside capital arrives. You can now hire analysts and start shaping a real investment process.",
    unlocks: "Era 3 unlocks Strategy upgrades and the Next buy mode.",
    categories: ["research", "people"],
    buyModes: ["one", "milestone"]
  },
  {
    name: "Multi-Strategy Firm",
    goal: 60000000,
    copy: "The firm expands beyond one playbook. Strategy desks come online and scaling gets more operational.",
    unlocks: "Era 4 makes Reputation and Data materially boost production, and unlocks Max buy mode.",
    categories: ["research", "people", "strategy"],
    buyModes: ["one", "milestone", "max"]
  },
  {
    name: "Institutional Platform",
    goal: 1800000000,
    copy: "Relationships and information edge now matter as much as raw output. Institutional trust starts to compound.",
    unlocks: "Era 5 unlocks the empire bonus, where your whole platform starts feeding on itself.",
    categories: ["research", "people", "strategy"],
    buyModes: ["one", "milestone", "max"]
  },
  {
    name: "Capital Empire",
    goal: 400000000000,
    copy: "You are no longer building a fund. You are building infrastructure around capital itself.",
    unlocks: "Final era: loop this endgame for more permanent power.",
    categories: ["research", "people", "strategy"],
    buyModes: ["one", "milestone", "max"]
  }
];

const upgrades = [
  {
    id: "hunch",
    category: "research",
    name: "Lucky Hunch",
    copy: "A sharper instinct for finding tiny pricing mistakes.",
    baseCost: 15,
    growth: 1.18,
    click: 1.6,
    data: 0.02
  },
  {
    id: "spreadsheet",
    category: "research",
    name: "Spreadsheet Model",
    copy: "Tabs, formulas, and a suspicious amount of conditional formatting.",
    baseCost: 90,
    growth: 1.22,
    click: 7,
    income: 0.35,
    data: 0.08
  },
  {
    id: "terminal",
    category: "research",
    name: "Market Terminal",
    copy: "Faster quotes and fewer decisions made from comment sections.",
    baseCost: 850,
    growth: 1.25,
    click: 40,
    income: 4,
    data: 0.25
  },
  {
    id: "altdata",
    category: "research",
    name: "Alternative Data",
    copy: "Satellite lots, app rankings, shipment traces, and noisy edge.",
    baseCost: 12000,
    growth: 1.28,
    click: 210,
    income: 55,
    data: 1.2,
    reputation: 0.05
  },
  {
    id: "intern",
    category: "people",
    name: "Part-Time Analyst",
    copy: "Someone to clean datasets and ask the useful naive question.",
    baseCost: 140,
    growth: 1.2,
    income: 1.2,
    reputation: 0.02
  },
  {
    id: "analyst",
    category: "people",
    name: "Sector Analyst",
    copy: "Coverage lists, model updates, and better coffee consumption.",
    baseCost: 1600,
    growth: 1.23,
    income: 11,
    click: 28,
    reputation: 0.08
  },
  {
    id: "pm",
    category: "people",
    name: "Portfolio Manager",
    copy: "Turns research into positions without turning sleep into myth.",
    baseCost: 28000,
    growth: 1.26,
    income: 165,
    reputation: 0.32,
    risk: 0.04
  },
  {
    id: "risk",
    category: "people",
    name: "Risk Officer",
    copy: "Prevents one exciting chart from becoming the whole business.",
    baseCost: 220000,
    growth: 1.3,
    income: 900,
    reputation: 0.9,
    risk: -0.35
  },
  {
    id: "momentum",
    category: "strategy",
    name: "Momentum Book",
    copy: "Ride winners, cut losers, repeat before everyone names it.",
    baseCost: 550,
    growth: 1.24,
    income: 5.5,
    risk: 0.18
  },
  {
    id: "longshort",
    category: "strategy",
    name: "Long / Short Desk",
    copy: "Own the loved names, short the overcaffeinated stories.",
    baseCost: 7200,
    growth: 1.27,
    income: 48,
    click: 95,
    risk: 0.22,
    reputation: 0.1
  },
  {
    id: "quant",
    category: "strategy",
    name: "Quant Signals",
    copy: "Models that whisper, backtests that brag, servers that bill.",
    baseCost: 95000,
    growth: 1.29,
    income: 720,
    data: 2.3,
    risk: 0.28
  },
  {
    id: "private",
    category: "strategy",
    name: "Private Deals",
    copy: "Longer lockups, bigger checks, thicker documents.",
    baseCost: 1100000,
    growth: 1.32,
    income: 5200,
    reputation: 1.8,
    risk: 0.12
  }
];

const prestigeStore = [
  {
    id: "seed",
    name: "Seed Capital",
    copy: "Begin each new fund with cash already committed.",
    tier: 0,
    requires: null,
    max: 8,
    baseCost: 1,
    growth: 1.65
  },
  {
    id: "research",
    name: "Research Network",
    copy: "Permanent boost to research from every click.",
    tier: 1,
    requires: "seed",
    max: 10,
    baseCost: 1,
    growth: 1.7
  },
  {
    id: "carry",
    name: "Carry Structure",
    copy: "Permanent boost to automatic returns.",
    tier: 1,
    requires: "seed",
    max: 10,
    baseCost: 2,
    growth: 1.75
  },
  {
    id: "partners",
    name: "Partner Network",
    copy: "Earn more prestige points when closing funds.",
    tier: 2,
    requires: "research",
    max: 6,
    baseCost: 3,
    growth: 2
  }
];

const defaultState = {
  capital: 0,
  lifetimeCapital: 0,
  careerStage: 0,
  legacy: 0,
  prestigePoints: 0,
  prestigeUpgrades: Object.fromEntries(prestigeStore.map((item) => [item.id, 0])),
  devSpeed: 1,
  selectedCategory: "research",
  buyMode: "one",
  owned: Object.fromEntries(upgrades.map((upgrade) => [upgrade.id, 0])),
  lastSavedAt: Date.now()
};

let state = loadState();
let lastTick = Date.now();
let chartPoints = [130, 128, 122, 126, 118, 110, 103, 96, 88, 79];
let toastTimer;
const buyModeCycle = ["one", "milestone", "max"];
const buyModeLabels = {
  one: "1x",
  milestone: "Next",
  max: "Max"
};

const elements = {
  capital: document.querySelector("#capital-value"),
  income: document.querySelector("#income-value"),
  click: document.querySelector("#click-value"),
  aum: document.querySelector("#aum-value"),
  reputation: document.querySelector("#reputation-value"),
  data: document.querySelector("#data-value"),
  risk: document.querySelector("#risk-value"),
  stageName: document.querySelector("#stage-name"),
  stageProgressLabel: document.querySelector("#stage-progress-label"),
  stageProgressPercent: document.querySelector("#stage-progress-percent"),
  stageProgressBar: document.querySelector("#stage-progress-bar"),
  nextStageCopy: document.querySelector("#next-stage-copy"),
  upgradeList: document.querySelector("#upgrade-list"),
  stageList: document.querySelector("#stage-list"),
  closeFundTitle: document.querySelector("#close-fund-title"),
  closeFundCopy: document.querySelector("#close-fund-copy"),
  legacy: document.querySelector("#legacy-value"),
  prestigePoints: document.querySelector("#prestige-points-value"),
  prestigeGain: document.querySelector("#prestige-gain-value"),
  prestigeStore: document.querySelector("#prestige-store"),
  prestigeStoreBalance: document.querySelector("#prestige-store-balance"),
  speedButtons: document.querySelector("#dev-speed-buttons"),
  speedLabel: document.querySelector("#dev-speed-label"),
  prestigeButton: document.querySelector("#prestige-button"),
  researchButton: document.querySelector("#research-button"),
  researchSubtitle: document.querySelector("#research-button-subtitle"),
  saveButton: document.querySelector("#save-button"),
  exportButton: document.querySelector("#export-button"),
  copySaveButton: document.querySelector("#copy-save-button"),
  importSaveButton: document.querySelector("#import-save-button"),
  saveCode: document.querySelector("#save-code"),
  resetButton: document.querySelector("#reset-button"),
  buyModeToggle: document.querySelector("#buy-mode-toggle"),
  toast: document.querySelector("#toast"),
  chartLine: document.querySelector("#chart-line"),
  chartArea: document.querySelector("#chart-area"),
  chartDots: document.querySelector("#chart-dots"),
  terminalStatus: document.querySelector("#terminal-status")
};

const categoryButtons = Object.fromEntries(
  Array.from(document.querySelectorAll(".tab")).map((button) => [button.dataset.category, button])
);

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    if (!getCurrentEra().categories.includes(tab.dataset.category)) {
      return;
    }
    state.selectedCategory = tab.dataset.category;
    render();
  });
});

elements.buyModeToggle.addEventListener("click", () => {
  const currentIndex = buyModeCycle.indexOf(state.buyMode);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % buyModeCycle.length;
  state.buyMode = buyModeCycle[nextIndex];
  render();
});

elements.researchButton.addEventListener("click", () => {
  const gain = getClickValue();
  addCapital(gain);
  elements.researchSubtitle.textContent = `+$${formatNumber(gain)} capital`;
  pulseChart();
  render();
});

elements.saveButton.addEventListener("click", () => {
  saveState();
  showToast("Game saved.");
});

elements.exportButton.addEventListener("click", () => {
  writeExportCode();
});

elements.copySaveButton.addEventListener("click", async () => {
  const code = writeExportCode();
  try {
    await navigator.clipboard.writeText(code);
    showToast("Save code copied.");
  } catch {
    elements.saveCode.select();
    showToast("Save code generated. Select and copy it.");
  }
});

elements.importSaveButton.addEventListener("click", () => {
  importSaveCode(elements.saveCode.value);
});

elements.resetButton.addEventListener("click", () => {
  if (!confirm("Reset your Fund and Games save?")) {
    return;
  }

  state = structuredClone(defaultState);
  state.lastSavedAt = Date.now();
  saveState();
  render();
  showToast("Save reset.");
});

elements.prestigeButton.addEventListener("click", () => {
  if (!canCloseFund()) {
    return;
  }

  const careerStage = getCareerStageIndex();
  const advancedStage = Math.min(eras.length - 1, careerStage + 1);
  const advanced = advancedStage > careerStage;
  const bonus = getPrestigeGain();
  const points = getPrestigePointGain();
  const prestigePoints = state.prestigePoints + points;
  const prestigeUpgrades = { ...state.prestigeUpgrades };
  state = {
    ...structuredClone(defaultState),
    careerStage: advanced ? advancedStage : careerStage,
    legacy: state.legacy + bonus,
    prestigePoints,
    prestigeUpgrades,
    devSpeed: state.devSpeed,
    capital: getStartingCapital(prestigeUpgrades),
    lifetimeCapital: getStartingCapital(prestigeUpgrades),
    lastSavedAt: Date.now()
  };
  saveState();
  render();
  showToast(
    advanced
      ? `Fund closed. Advanced to ${eras[advancedStage].name}. Track Record +${bonus.toFixed(2)}x. Prestige +${points}.`
      : `Fund closed. Track Record +${bonus.toFixed(2)}x. Prestige +${points}.`
  );
});

elements.prestigeStore.addEventListener("click", (event) => {
  const button = event.target.closest("[data-prestige-upgrade]");
  if (!button) {
    return;
  }

  buyPrestigeUpgrade(button.dataset.prestigeUpgrade);
});

elements.speedButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speed]");
  if (!button) {
    return;
  }

  const speed = getSafeNumber(button.dataset.speed, 1);
  if (!speedOptions.includes(speed)) {
    return;
  }

  state.devSpeed = speed;
  saveState();
  render();
  showToast(`Sim speed set to ${speed}x.`);
});

window.addEventListener("beforeunload", saveState);

setInterval(() => {
  saveState();
}, SAVE_INTERVAL_MS);

applyOfflineProgress();
render();
setInterval(gameLoop, 250);

function gameLoop() {
  const now = Date.now();
  const elapsedSeconds = Math.min((now - lastTick) / 1000, 5) * state.devSpeed;
  lastTick = now;
  addCapital(getIncomePerSecond() * elapsedSeconds);

  if (Math.random() < 0.02) {
    pulseChart();
  }

  render();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) {
      return structuredClone(defaultState);
    }

    return normalizeImportedState({
      ...structuredClone(defaultState),
      ...saved,
      owned: { ...defaultState.owned, ...(saved.owned ?? {}) },
      prestigeUpgrades: { ...defaultState.prestigeUpgrades, ...(saved.prestigeUpgrades ?? {}) }
    });
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeImportedState(importedState) {
  const normalized = {
    ...structuredClone(defaultState),
    ...importedState,
    owned: { ...defaultState.owned, ...(importedState.owned ?? {}) },
    prestigeUpgrades: { ...defaultState.prestigeUpgrades, ...(importedState.prestigeUpgrades ?? {}) }
  };

  normalized.capital = getSafeNumber(normalized.capital, 0);
  normalized.lifetimeCapital = Math.max(getSafeNumber(normalized.lifetimeCapital, 0), normalized.capital);
  normalized.careerStage = Math.min(
    eras.length - 1,
    Math.max(0, Math.floor(getSafeNumber(normalized.careerStage, inferCareerStageFromLifetimeCapital(normalized.lifetimeCapital))))
  );
  normalized.legacy = Math.max(0, getSafeNumber(normalized.legacy, 0));
  normalized.prestigePoints = Math.max(0, Math.floor(getSafeNumber(normalized.prestigePoints, 0)));
  normalized.devSpeed = speedOptions.includes(getSafeNumber(normalized.devSpeed, 1))
    ? getSafeNumber(normalized.devSpeed, 1)
    : 1;
  normalized.lastSavedAt = getSafeNumber(normalized.lastSavedAt, Date.now());
  normalized.selectedCategory = ["research", "people", "strategy"].includes(normalized.selectedCategory)
    ? normalized.selectedCategory
    : "research";
  normalized.buyMode = ["one", "milestone", "max"].includes(normalized.buyMode) ? normalized.buyMode : "one";
  normalized.owned = Object.fromEntries(
    upgrades.map((upgrade) => {
      const owned = Math.max(0, Math.floor(getSafeNumber(normalized.owned[upgrade.id], 0)));
      return [upgrade.id, owned];
    })
  );
  normalized.prestigeUpgrades = Object.fromEntries(
    prestigeStore.map((upgrade) => {
      const level = Math.max(0, Math.floor(getSafeNumber(normalized.prestigeUpgrades[upgrade.id], 0)));
      return [upgrade.id, Math.min(upgrade.max, level)];
    })
  );
  const unlockedCategories = getEraAtIndex(normalized.careerStage).categories;
  if (!unlockedCategories.includes(normalized.selectedCategory)) {
    normalized.selectedCategory = unlockedCategories[0];
  }
  if (!getEraAtIndex(normalized.careerStage).buyModes.includes(normalized.buyMode)) {
    normalized.buyMode = getEraAtIndex(normalized.careerStage).buyModes[0];
  }

  return normalized;
}

function getSafeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getSerializableState() {
  return {
    capital: state.capital,
    lifetimeCapital: state.lifetimeCapital,
    careerStage: state.careerStage,
    legacy: state.legacy,
    prestigePoints: state.prestigePoints,
    prestigeUpgrades: state.prestigeUpgrades,
    devSpeed: state.devSpeed,
    selectedCategory: state.selectedCategory,
    buyMode: state.buyMode,
    owned: state.owned,
    lastSavedAt: Date.now()
  };
}

function encodeSaveState(saveState) {
  const json = JSON.stringify({ version: 1, state: saveState });
  return `${EXPORT_PREFIX}${btoa(json)}`;
}

function decodeSaveState(code) {
  const trimmedCode = code.trim();
  const payload = trimmedCode.startsWith(EXPORT_PREFIX)
    ? trimmedCode.slice(EXPORT_PREFIX.length)
    : trimmedCode;
  const json = atob(payload);
  const parsed = JSON.parse(json);

  if (parsed.version !== 1 || !parsed.state) {
    throw new Error("Unsupported save format");
  }

  return normalizeImportedState(parsed.state);
}

function writeExportCode() {
  saveState();
  const code = encodeSaveState(getSerializableState());
  elements.saveCode.value = code;
  showToast("Save code generated.");
  return code;
}

function importSaveCode(code) {
  try {
    const importedState = decodeSaveState(code);
    state = importedState;
    state.lastSavedAt = Date.now();
    lastTick = Date.now();
    saveState();
    render();
    showToast("Save code imported.");
  } catch {
    showToast("That save code could not be imported.");
  }
}

function saveState() {
  state.lastSavedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyOfflineProgress() {
  const elapsedSeconds = Math.max(0, (Date.now() - state.lastSavedAt) / 1000) * state.devSpeed;
  const gain = getIncomePerSecond() * elapsedSeconds;
  if (gain > 0) {
    addCapital(gain);
    showToast(`Welcome back. Offline returns added $${formatNumber(gain)}.`);
  }
}

function addCapital(amount) {
  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  state.capital += amount;
  state.lifetimeCapital += amount;
}

function inferCareerStageFromLifetimeCapital(lifetimeCapital) {
  let index = 0;
  eras.forEach((era, eraIndex) => {
    if (lifetimeCapital >= era.goal) {
      index = eraIndex;
    }
  });
  return index;
}

function getCareerStageIndex() {
  return Math.min(eras.length - 1, Math.max(0, state.careerStage ?? 0));
}

function getCareerStageGoal(stageIndex = getCareerStageIndex()) {
  return getEraAtIndex(stageIndex).goal;
}

function getEraAtIndex(index) {
  return eras[Math.min(eras.length - 1, Math.max(0, index))];
}

function getCurrentEra() {
  return getEraAtIndex(getCareerStageIndex());
}

function getInstitutionalMultiplier() {
  if (getCareerStageIndex() < 3) {
    return 1;
  }

  return 1 + getReputation() * 0.015 + getData() * 0.01;
}

function getEmpireMultiplier() {
  if (getCareerStageIndex() < 4) {
    return 1;
  }

  const totalOwned = upgrades.reduce((sum, upgrade) => sum + getOwned(upgrade.id), 0);
  return 1 + Math.log10(Math.max(10, totalOwned + state.lifetimeCapital / 1000000)) * 0.18;
}

function getMultiplier() {
  return 1 + state.legacy;
}

function getClickValue() {
  const raw = upgrades.reduce((sum, upgrade) => {
    const owned = getOwned(upgrade.id);
    return sum + (upgrade.click ?? 0) * owned * getUpgradeMilestoneMultiplier(owned);
  }, 2);
  return raw * getMultiplier() * getPrestigeResearchMultiplier() * getInstitutionalMultiplier() * getEmpireMultiplier();
}

function getIncomePerSecond() {
  const raw = upgrades.reduce((sum, upgrade) => {
    const owned = getOwned(upgrade.id);
    return sum + (upgrade.income ?? 0) * owned * getUpgradeMilestoneMultiplier(owned);
  }, 0);
  return raw * getMultiplier() * getPrestigeCarryMultiplier() * getInstitutionalMultiplier() * getEmpireMultiplier();
}

function getReputation() {
  return upgrades.reduce((sum, upgrade) => {
    const owned = getOwned(upgrade.id);
    return sum + (upgrade.reputation ?? 0) * owned * getUpgradeMilestoneMultiplier(owned);
  }, 0);
}

function getData() {
  return upgrades.reduce((sum, upgrade) => {
    const owned = getOwned(upgrade.id);
    return sum + (upgrade.data ?? 0) * owned * getUpgradeMilestoneMultiplier(owned);
  }, 0);
}

function getRisk() {
  const risk = upgrades.reduce((sum, upgrade) => {
    const owned = getOwned(upgrade.id);
    return sum + (upgrade.risk ?? 0) * owned * getUpgradeMilestoneMultiplier(owned);
  }, 0);
  return Math.max(0, Math.min(98, risk * 10));
}

function getOwned(upgradeId) {
  return state.owned[upgradeId] ?? 0;
}

function getUpgradeCost(upgrade) {
  return Math.ceil(upgrade.baseCost * upgrade.growth ** getOwned(upgrade.id));
}

function getUpgradeCostAtCount(upgrade, owned) {
  return Math.ceil(upgrade.baseCost * upgrade.growth ** owned);
}

function getUpgradeMilestoneMultiplier(owned) {
  return upgradeMilestones.reduce((multiplier, milestone) => {
    return owned >= milestone.count ? multiplier + milestone.bonus : multiplier;
  }, 1);
}

function getPrestigeLevel(upgradeId) {
  return state.prestigeUpgrades?.[upgradeId] ?? 0;
}

function getPrestigeUpgradeCost(upgrade) {
  return Math.ceil(upgrade.baseCost * upgrade.growth ** getPrestigeLevel(upgrade.id));
}

function isPrestigeUnlocked(upgrade) {
  if (!upgrade.requires) {
    return true;
  }

  return getPrestigeLevel(upgrade.requires) > 0;
}

function getPrestigeResearchMultiplier() {
  return 1 + getPrestigeLevel("research") * 0.12;
}

function getPrestigeCarryMultiplier() {
  return 1 + getPrestigeLevel("carry") * 0.1;
}

function getPrestigePointMultiplier() {
  return 1 + getPrestigeLevel("partners") * 0.15;
}

function getStartingCapital(prestigeUpgrades = state.prestigeUpgrades) {
  const level = prestigeUpgrades?.seed ?? 0;
  return level === 0 ? 0 : Math.round(500 * level ** 2.15);
}

function getPrestigeEffectLabel(upgrade, level = getPrestigeLevel(upgrade.id)) {
  if (upgrade.id === "seed") {
    return `Start $${formatNumber(getStartingCapital({ ...state.prestigeUpgrades, seed: level }))}`;
  }

  if (upgrade.id === "research") {
    return `Click x${(1 + level * 0.12).toFixed(2)}`;
  }

  if (upgrade.id === "carry") {
    return `Returns x${(1 + level * 0.1).toFixed(2)}`;
  }

  return `Points x${(1 + level * 0.15).toFixed(2)}`;
}

function getNextMilestone(owned) {
  return upgradeMilestones.find((milestone) => owned < milestone.count) ?? null;
}

function getMilestoneAtCount(owned) {
  return upgradeMilestones.find((milestone) => owned === milestone.count) ?? null;
}

function getUpgradeEffectValue(upgrade, key, owned) {
  const base = upgrade[key] ?? 0;
  const milestoneValue = base * owned * getUpgradeMilestoneMultiplier(owned);

  if (key === "click" || key === "income") {
    return milestoneValue * getMultiplier();
  }

  if (key === "risk") {
    return milestoneValue * 10;
  }

  return milestoneValue;
}

function getUpgradeEffects(upgrade, owned, targetOwned = owned + 1) {
  const effectTypes = [
    { key: "click", label: "Research / click", prefix: "$" },
    { key: "income", label: "Returns / sec", prefix: "$" },
    { key: "reputation", label: "Reputation", prefix: "" },
    { key: "data", label: "Data", prefix: "" },
    { key: "risk", label: "Risk", prefix: "", suffix: " pts" }
  ];

  return effectTypes
    .filter((effect) => upgrade[effect.key])
    .map((effect) => {
      const current = getUpgradeEffectValue(upgrade, effect.key, owned);
      const next = getUpgradeEffectValue(upgrade, effect.key, Math.max(owned, targetOwned)) - current;
      return {
        ...effect,
        current,
        next
      };
    });
}

function formatSignedEffect(value, effect) {
  const sign = value >= 0 ? "+" : "-";
  const absoluteValue = Math.abs(value);
  return `${sign}${effect.prefix}${formatNumber(absoluteValue)}${effect.suffix ?? ""}`;
}

function getBulkPurchase(upgrade) {
  const startingOwned = getOwned(upgrade.id);
  const targetMilestone = getNextMilestone(startingOwned);

  if (state.buyMode === "one") {
    const totalCost = getUpgradeCostAtCount(upgrade, startingOwned);
    return {
      quantity: state.capital >= totalCost ? 1 : 0,
      totalCost,
      targetOwned: startingOwned + 1,
      mode: "one"
    };
  }

  if (state.buyMode === "milestone" && targetMilestone) {
    let totalCost = 0;
    for (let owned = startingOwned; owned < targetMilestone.count; owned += 1) {
      totalCost += getUpgradeCostAtCount(upgrade, owned);
    }

    const canAfford = state.capital >= totalCost;
    return {
      quantity: canAfford ? targetMilestone.count - startingOwned : 0,
      totalCost,
      targetOwned: targetMilestone.count,
      mode: "milestone",
      canAfford
    };
  }

  if (state.buyMode === "milestone") {
    return {
      quantity: 0,
      totalCost: 0,
      targetOwned: startingOwned,
      mode: "milestone",
      canAfford: false,
      complete: true
    };
  }

  let quantity = 0;
  let totalCost = 0;
  let owned = startingOwned;

  while (quantity < 5000) {
    const cost = getUpgradeCostAtCount(upgrade, owned);
    if (totalCost + cost > state.capital) {
      break;
    }

    totalCost += cost;
    owned += 1;
    quantity += 1;
  }

  const nextCost = getUpgradeCostAtCount(upgrade, startingOwned);
  return {
    quantity,
    totalCost: quantity > 0 ? totalCost : nextCost,
    targetOwned: quantity > 0 ? startingOwned + quantity : startingOwned + 1,
    mode: "max"
  };
}

function buyUpgrade(upgradeId) {
  const upgrade = upgrades.find((item) => item.id === upgradeId);
  if (!upgrade) {
    return;
  }

  const purchase = getBulkPurchase(upgrade);
  if (purchase.quantity < 1 || state.capital < purchase.totalCost) {
    return;
  }

  const previousOwned = state.owned[upgrade.id];
  state.capital -= purchase.totalCost;
  state.owned[upgrade.id] += purchase.quantity;
  const reachedMilestones = upgradeMilestones.filter((milestone) => {
    return previousOwned < milestone.count && state.owned[upgrade.id] >= milestone.count;
  });
  saveState();
  render();
  if (reachedMilestones.length > 0) {
    const latestMilestone = reachedMilestones.at(-1);
    showToast(`${upgrade.name} reached ${latestMilestone.count}. ${latestMilestone.label} unlocked.`);
  }
}

function canCloseFund() {
  return state.lifetimeCapital >= getCareerStageGoal();
}

function getPrestigeGain() {
  if (!canCloseFund()) {
    return 0;
  }
  const stageIndex = getCareerStageIndex();
  const goal = getCareerStageGoal(stageIndex);
  const overage = Math.max(1, state.lifetimeCapital / Math.max(1, goal));
  return Math.max(0.15, 0.15 + stageIndex * 0.05 + Math.log10(overage) * 0.08);
}

function getPrestigePointGain() {
  if (!canCloseFund()) {
    return 0;
  }
  const basePoints = 1 + Math.floor(getCareerStageIndex() / 2);
  return Math.max(1, Math.floor(basePoints * getPrestigePointMultiplier()));
}

function canAccessPrestigeTree() {
  return getCareerStageIndex() >= 1 || state.prestigePoints > 0;
}

function buyPrestigeUpgrade(upgradeId) {
  const upgrade = prestigeStore.find((item) => item.id === upgradeId);
  if (!upgrade) {
    return;
  }

  if (!isPrestigeUnlocked(upgrade)) {
    return;
  }

  const level = getPrestigeLevel(upgrade.id);
  const cost = getPrestigeUpgradeCost(upgrade);
  if (level >= upgrade.max || state.prestigePoints < cost) {
    return;
  }

  state.prestigePoints -= cost;
  state.prestigeUpgrades[upgrade.id] = level + 1;
  saveState();
  render();
  showToast(`${upgrade.name} upgraded to ${level + 1}.`);
}

function render() {
  const era = getCurrentEra();
  const income = getIncomePerSecond();
  const click = getClickValue();
  const stageIndex = getCareerStageIndex();
  const nextStage = eras[stageIndex + 1];
  const goal = getCareerStageGoal(stageIndex);
  const progress = Math.max(0, Math.min(1, state.lifetimeCapital / Math.max(1, goal)));

  elements.capital.textContent = `$${formatNumber(state.capital)}`;
  elements.income.textContent = `$${formatNumber(income)}`;
  elements.click.textContent = `$${formatNumber(click)}`;
  elements.aum.textContent = `$${formatNumber(state.lifetimeCapital)}`;
  elements.reputation.textContent = formatNumber(getReputation());
  elements.data.textContent = formatNumber(getData());
  elements.risk.textContent = `${Math.round(getRisk())}%`;
  elements.stageName.textContent = era.name;
  elements.stageProgressLabel.textContent = `Era ${stageIndex + 1} / ${eras.length}`;
  elements.legacy.textContent = `${getMultiplier().toFixed(2)}x`;
  elements.prestigePoints.textContent = formatNumber(state.prestigePoints);
  elements.prestigeStoreBalance.textContent = `${formatNumber(state.prestigePoints)} pts`;
  elements.prestigeGain.textContent = `+${getPrestigePointGain()}`;
  elements.speedLabel.textContent = `${state.devSpeed}x`;
  Array.from(elements.speedButtons.querySelectorAll("[data-speed]")).forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.speed) === state.devSpeed);
  });
  elements.prestigeButton.disabled = !canCloseFund();
  elements.terminalStatus.textContent = era.copy;
  elements.prestigeStore.closest(".prestige-panel").hidden = !canAccessPrestigeTree();

  if (nextStage) {
    elements.nextStageCopy.textContent = canCloseFund()
      ? `Close fund to enter ${nextStage.name}`
      : `Raise $${formatNumber(goal)} this run. ${era.unlocks}`;
    elements.stageProgressPercent.textContent = `${Math.round(progress * 100)}%`;
    elements.stageProgressBar.style.width = `${progress * 100}%`;
    elements.closeFundTitle.textContent = `Advance to ${nextStage.name}`;
    elements.closeFundCopy.textContent =
      `Finish ${era.name}, bank your track record, and start ${nextStage.name} with new systems unlocked.`;
    elements.prestigeButton.textContent = `Enter ${nextStage.name}`;
  } else {
    elements.nextStageCopy.textContent = canCloseFund()
      ? "Final era cleared. Close the fund to loop the endgame with more permanent power."
      : `Raise $${formatNumber(goal)} this run to complete the final era`;
    elements.stageProgressPercent.textContent = `${Math.round(progress * 100)}%`;
    elements.stageProgressBar.style.width = `${progress * 100}%`;
    elements.closeFundTitle.textContent = "Close the Fund";
    elements.closeFundCopy.textContent =
      "This is the final era. Closing now restarts the same endgame chapter with more permanent power.";
    elements.prestigeButton.textContent = "Close Fund";
  }

  renderTabs();
  renderUpgrades();
  renderStages(stageIndex);
  renderPrestigeStore();
  renderChart();
}

function renderTabs() {
  const era = getCurrentEra();
  if (!era.categories.includes(state.selectedCategory)) {
    state.selectedCategory = era.categories[0];
  }
  if (!era.buyModes.includes(state.buyMode)) {
    state.buyMode = era.buyModes[0];
  }

  Object.entries(categoryButtons).forEach(([category, button]) => {
    const unlocked = era.categories.includes(category);
    button.hidden = !unlocked;
    button.classList.toggle("is-active", unlocked && category === state.selectedCategory);
  });

  elements.buyModeToggle.hidden = era.buyModes.length < 2;
  elements.buyModeToggle.textContent = buyModeLabels[state.buyMode] ?? era.buyModes[0] ?? "1x";
}

function renderUpgrades() {
  const visibleUpgrades = upgrades.filter((upgrade) => upgrade.category === state.selectedCategory);
  elements.upgradeList.innerHTML = visibleUpgrades
    .map((upgrade) => {
      const owned = getOwned(upgrade.id);
      const purchase = getBulkPurchase(upgrade);
      const nextMilestone = getNextMilestone(owned);
      const multiplier = getUpgradeMilestoneMultiplier(owned);
      const milestoneProgress = nextMilestone ? Math.min(100, (owned / nextMilestone.count) * 100) : 100;
      const canBuy = purchase.quantity > 0;
      const effects = getUpgradeEffects(upgrade, owned, purchase.targetOwned);
      const effectRows = effects
        .map((effect) => {
          return `
            <span class="effect-row">
              <span>${effect.label}: ${formatSignedEffect(effect.current, effect)}</span>
              <span class="effect-row__delta">(${formatSignedEffect(effect.next, effect)})</span>
            </span>
          `;
        })
        .join("");
      const buyLabel =
        purchase.complete
          ? "Milestones complete"
          : purchase.mode === "milestone"
          ? `Buy ${purchase.targetOwned - owned} to ${purchase.targetOwned} - $${formatNumber(purchase.totalCost)}`
          : purchase.quantity > 1
            ? `Buy ${purchase.quantity} - $${formatNumber(purchase.totalCost)}`
            : `Buy $${formatNumber(purchase.totalCost)}`;
      return `
        <article class="upgrade-card">
          <div class="upgrade-card__top">
            <div>
              <h3>${upgrade.name}</h3>
              <p>${upgrade.copy}</p>
            </div>
            <span class="upgrade-card__owned">${owned}</span>
          </div>
          <div class="effect-list">${effectRows}</div>
          <div class="milestone-meter">
            <div class="milestone-meter__label">
              <span>${nextMilestone ? `Next milestone: ${nextMilestone.count}` : "All listed milestones reached"}</span>
              <strong>${multiplier.toFixed(1)}x</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${milestoneProgress}%"></div>
            </div>
          </div>
          <button class="buy-button" type="button" data-upgrade="${upgrade.id}" ${canBuy ? "" : "disabled"}>
            ${buyLabel}
          </button>
        </article>
      `;
    })
    .join("");

  elements.upgradeList.querySelectorAll("[data-upgrade]").forEach((button) => {
    button.addEventListener("click", () => buyUpgrade(button.dataset.upgrade));
  });
}

function renderStages(currentStageIndex) {
  elements.stageList.innerHTML = eras
    .map((stage, index) => {
      const unlocked = index <= currentStageIndex;
      const current = index === currentStageIndex;
      return `
        <article class="stage-row ${unlocked ? "is-unlocked" : ""} ${current ? "is-current" : ""}">
          <span class="stage-row__number">${index + 1}</span>
          <div>
            <h3>${stage.name}</h3>
            <p>${stage.unlocks}</p>
          </div>
          <strong>$${formatNumber(stage.goal)}</strong>
        </article>
      `;
    })
    .join("");
}

function renderPrestigeStore() {
  const tiers = [...new Set(prestigeStore.map((upgrade) => upgrade.tier))].sort((a, b) => a - b);
  elements.prestigeStore.innerHTML = tiers
    .map((tier) => {
      const nodes = prestigeStore.filter((upgrade) => upgrade.tier === tier);
      return `
        <div class="prestige-tree__row" data-tier="${tier}">
          ${nodes
            .map((upgrade) => {
      const level = getPrestigeLevel(upgrade.id);
      const cost = getPrestigeUpgradeCost(upgrade);
      const complete = level >= upgrade.max;
      const unlocked = isPrestigeUnlocked(upgrade);
      const canBuy = unlocked && !complete && state.prestigePoints >= cost;
      const current = getPrestigeEffectLabel(upgrade, level);
      const next = complete ? "Maxed" : getPrestigeEffectLabel(upgrade, level + 1);
      const requirement = upgrade.requires
        ? prestigeStore.find((item) => item.id === upgrade.requires)?.name ?? "Prior node"
        : "";
      return `
        <article class="prestige-card ${unlocked ? "" : "is-locked"} ${complete ? "is-maxed" : ""}">
          <span class="prestige-card__branch" aria-hidden="true"></span>
          <div>
            <h3>${upgrade.name}</h3>
            <p>${upgrade.copy}</p>
          </div>
          <div class="prestige-card__meta">
            <span>${level}/${upgrade.max}</span>
            <strong>${current} <span>${complete ? "" : `&rarr; ${next}`}</span></strong>
          </div>
          <div class="prestige-card__status">${unlocked ? (complete ? "Maxed" : `Cost ${cost} pts`) : `Unlock via ${requirement}`}</div>
          <button class="prestige-buy" type="button" data-prestige-upgrade="${upgrade.id}" ${canBuy ? "" : "disabled"}>
            ${complete ? "Maxed" : `Spend ${cost}`}
          </button>
        </article>
      `;
    })
            .join("")}
        </div>
      `;
    })
    .join("");
}

function pulseChart() {
  const drift = Math.max(18, 132 - Math.log10(Math.max(10, state.lifetimeCapital + 10)) * 12);
  const next = Math.max(24, drift + (Math.random() - 0.38) * 28);
  chartPoints = [...chartPoints.slice(1), next];
}

function renderChart() {
  const width = 620;
  const height = 260;
  const step = width / (chartPoints.length - 1);
  const points = chartPoints.map((value, index) => [index * step, value]);
  const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  elements.chartLine.setAttribute("d", line);
  elements.chartArea.setAttribute("d", area);
  elements.chartDots.innerHTML = points
    .filter((_, index) => index === points.length - 1 || index % 3 === 0)
    .map(([x, y]) => `<circle class="chart-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"></circle>`)
    .join("");
}

function formatNumber(value) {
  if (value < 1000) {
    return value.toFixed(value < 10 ? 1 : 0);
  }

  const units = [
    ["T", 1000000000000],
    ["B", 1000000000],
    ["M", 1000000],
    ["K", 1000]
  ];
  const unit = units.find(([, amount]) => value >= amount);
  return `${(value / unit[1]).toFixed(value / unit[1] >= 100 ? 0 : 1)}${unit[0]}`;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2600);
}
