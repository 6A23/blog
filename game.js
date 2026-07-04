const planets = [
  {
    name: '水星', icon: '☿', desc: '灼热岩地中藏着高速突袭型怪物。', colors: ['#35151a', '#7f1d1d', '#f97316'],
    monsters: [
      { name: '火岩虫', avatar: '🪱', hp: 42, atk: 7, reward: 18, speed: 72 },
      { name: '熔斑蝎', avatar: '🦂', hp: 52, atk: 8, reward: 24, speed: 66 },
      { name: '日灼蝠', avatar: '🦇', hp: 58, atk: 9, reward: 28, speed: 86 }
    ],
    boss: { name: '水星熔核巨像', avatar: '🗿', hp: 96, atk: 12, reward: 70, speed: 48 }
  },
  {
    name: '金星', icon: '♀', desc: '酸雾与硫云遮蔽视野，敌人擅长持续腐蚀。', colors: ['#2d1b0e', '#92400e', '#fde68a'],
    monsters: [
      { name: '酸雾花妖', avatar: '🌺', hp: 70, atk: 11, reward: 32, speed: 64 },
      { name: '硫云蜥', avatar: '🦎', hp: 82, atk: 12, reward: 38, speed: 76 },
      { name: '腐蚀浮囊', avatar: '🎈', hp: 88, atk: 13, reward: 44, speed: 58 }
    ],
    boss: { name: '金星酸雾女王', avatar: '👑', hp: 150, atk: 17, reward: 105, speed: 46 }
  },
  {
    name: '地球', icon: '🌍', desc: '生态力量被黑暗能量污染，森林与深海怪物苏醒。', colors: ['#082f49', '#166534', '#38bdf8'],
    monsters: [
      { name: '深林藤怪', avatar: '🌿', hp: 96, atk: 15, reward: 48, speed: 62 },
      { name: '海沟甲兽', avatar: '🦀', hp: 110, atk: 16, reward: 54, speed: 54 },
      { name: '雷羽鹰', avatar: '🦅', hp: 118, atk: 17, reward: 60, speed: 92 }
    ],
    boss: { name: '地球守护泰坦', avatar: '🛡️', hp: 215, atk: 22, reward: 145, speed: 44 }
  },
  {
    name: '火星', icon: '♂', desc: '红沙战场遍布机械残骸，敌人攻击更猛烈。', colors: ['#250902', '#991b1b', '#fb923c'],
    monsters: [
      { name: '红沙盗', avatar: '🥷', hp: 132, atk: 20, reward: 66, speed: 82 },
      { name: '铁甲蝎', avatar: '🦂', hp: 148, atk: 21, reward: 72, speed: 64 },
      { name: '沙暴炮台', avatar: '🛰️', hp: 158, atk: 22, reward: 80, speed: 42 }
    ],
    boss: { name: '火星战争机甲', avatar: '🤖', hp: 290, atk: 28, reward: 190, speed: 48 }
  },
  {
    name: '木星', icon: '♃', desc: '大红斑风暴吞没一切，雷电型怪物成群出现。', colors: ['#1f1308', '#9a3412', '#facc15'],
    monsters: [
      { name: '风暴水母', avatar: '🪼', hp: 178, atk: 25, reward: 88, speed: 60 },
      { name: '雷云巨鸟', avatar: '🦅', hp: 194, atk: 27, reward: 96, speed: 88 },
      { name: '气旋独眼', avatar: '👁️', hp: 210, atk: 28, reward: 106, speed: 56 }
    ],
    boss: { name: '木星大红斑吞噬者', avatar: '🌀', hp: 390, atk: 35, reward: 250, speed: 42 }
  },
  {
    name: '土星', icon: '♄', desc: '星环像刀刃一样旋转，敌人拥有更厚护甲。', colors: ['#1f1b16', '#854d0e', '#fde68a'],
    monsters: [
      { name: '环带幽灵', avatar: '👻', hp: 230, atk: 31, reward: 116, speed: 74 },
      { name: '冰晶螳螂', avatar: '🦗', hp: 250, atk: 32, reward: 128, speed: 78 },
      { name: '星环石卫', avatar: '🪨', hp: 270, atk: 34, reward: 140, speed: 40 }
    ],
    boss: { name: '土星环刃领主', avatar: '🪐', hp: 520, atk: 42, reward: 320, speed: 38 }
  },
  {
    name: '天王星', icon: '♅', desc: '极寒与甲烷风暴冻结装甲，怪物行动诡异。', colors: ['#082f49', '#0e7490', '#a5f3fc'],
    monsters: [
      { name: '极寒幽狼', avatar: '🐺', hp: 292, atk: 38, reward: 154, speed: 88 },
      { name: '甲烷影怪', avatar: '🫥', hp: 315, atk: 40, reward: 168, speed: 76 },
      { name: '蓝冰钻虫', avatar: '💎', hp: 338, atk: 42, reward: 184, speed: 54 }
    ],
    boss: { name: '天王星冰冠巨兽', avatar: '🐲', hp: 675, atk: 52, reward: 410, speed: 42 }
  },
  {
    name: '海王星', icon: '♆', desc: '太阳系边境的深蓝风暴，最终 Boss 正等待挑战者。', colors: ['#0f172a', '#1d4ed8', '#60a5fa'],
    monsters: [
      { name: '深蓝鱼人', avatar: '🧜', hp: 365, atk: 48, reward: 200, speed: 72 },
      { name: '暴潮灵', avatar: '🌊', hp: 395, atk: 50, reward: 218, speed: 68 },
      { name: '海渊电鳗', avatar: '⚡', hp: 430, atk: 53, reward: 238, speed: 92 }
    ],
    boss: { name: '海王星深渊海皇', avatar: '🔱', hp: 860, atk: 64, reward: 700, speed: 44 }
  }
];

const state = {
  planetIndex: 0,
  waveIndex: 0,
  coins: 0,
  weaponLevel: 1,
  playerHp: 100,
  playerMaxHp: 100,
  medkits: 2,
  enemy: null,
  inBattle: false,
  waitingForNextWave: false,
  levelCompleted: false,
  gameOver: false,
  wonGame: false,
  lastShotAt: 0,
  skillReadyAt: 0,
  lastTime: 0,
  victoryAnimation: null,
  medals: [],
  projectiles: [],
  particles: [],
  kills: 0,
  gameStartTime: 0,
  elapsedTime: 0
};

const medalDefinitions = [
  { id: 'mercury-core', planet: '水星', boss: '水星熔核巨像', name: '熔核勇者勋章', icon: '☄️', desc: '击败水星熔核巨像' },
  { id: 'venus-mist', planet: '金星', boss: '金星酸雾女王', name: '酸雾破晓勋章', icon: '🌫️', desc: '击败金星酸雾女王' },
  { id: 'earth-guardian', planet: '地球', boss: '地球守护泰坦', name: '蓝星守护勋章', icon: '🌍', desc: '击败地球守护泰坦' },
  { id: 'mars-war', planet: '火星', boss: '火星战争机甲', name: '红沙战神勋章', icon: '🔴', desc: '击败火星战争机甲' },
  { id: 'jupiter-storm', planet: '木星', boss: '木星大红斑吞噬者', name: '风暴征服勋章', icon: '🌀', desc: '击败木星大红斑吞噬者' },
  { id: 'saturn-ring', planet: '土星', boss: '土星环刃领主', name: '星环骑士勋章', icon: '🪐', desc: '击败土星环刃领主' },
  { id: 'uranus-ice', planet: '天王星', boss: '天王星冰冠巨兽', name: '冰冠龙骑勋章', icon: '❄️', desc: '击败天王星冰冠巨兽' },
  { id: 'neptune-king', planet: '海王星', boss: '海王星深渊海皇', name: '深海星皇勋章', icon: '🔱', desc: '击败海王星深渊海皇' }
];

const player = {

  spawnX: 86,
  x: 86,
  y: 0,
  baseY: 0,
  width: 58,
  height: 82,
  speed: 260,
  isJumping: false,
  jumpTime: 0,
  jumpDuration: 0.72,
  jumpHeight: 118
};

const playerForms = [
  { title: '新手探索者', icon: '🚀', body: '#e0f2fe', armor: '#38bdf8', visor: '#0ea5e9', glow: 'rgba(56, 189, 248, 0.2)', weapon: '#94a3b8' },
  { title: '水星熔甲', icon: '🔥', body: '#fee2e2', armor: '#f97316', visor: '#fb7185', glow: 'rgba(249, 115, 22, 0.28)', weapon: '#f59e0b' },
  { title: '金星酸雾装甲', icon: '🟡', body: '#fef3c7', armor: '#facc15', visor: '#84cc16', glow: 'rgba(250, 204, 21, 0.3)', weapon: '#bef264' },
  { title: '地球守护战士', icon: '🌍', body: '#dcfce7', armor: '#22c55e', visor: '#38bdf8', glow: 'rgba(34, 197, 94, 0.3)', weapon: '#60a5fa' },
  { title: '火星机甲战将', icon: '🔴', body: '#fee2e2', armor: '#dc2626', visor: '#f97316', glow: 'rgba(220, 38, 38, 0.34)', weapon: '#facc15' },
  { title: '木星雷霆统帅', icon: '⚡', body: '#fef9c3', armor: '#a855f7', visor: '#facc15', glow: 'rgba(168, 85, 247, 0.34)', weapon: '#fde047' },
  { title: '土星星环骑士', icon: '🪐', body: '#fff7ed', armor: '#d97706', visor: '#fde68a', glow: 'rgba(217, 119, 6, 0.34)', weapon: '#fbbf24' },
  { title: '天王星冰龙机甲', icon: '🐲', body: '#cffafe', armor: '#06b6d4', visor: '#a5f3fc', glow: 'rgba(6, 182, 212, 0.36)', weapon: '#67e8f9' },
  { title: '海王星终极星皇', icon: '👑', body: '#dbeafe', armor: '#2563eb', visor: '#c4b5fd', glow: 'rgba(37, 99, 235, 0.42)', weapon: '#a78bfa' }
];

const keys = new Set();

const $ = (id) => document.getElementById(id);

const els = {
  restartBtn: $('restartBtn'),
  startBtn: $('startBtn'),
  attackBtn: $('attackBtn'),
  jumpBtn: $('jumpBtn'),
  skillBtn: $('skillBtn'),
  playerAvatar: $('playerAvatar'),
  medkitBtn: $('medkitBtn'),

  upgradeBtn: $('upgradeBtn'),
  healBtn: $('healBtn'),
  playerLevel: $('playerLevel'),
  playerHpText: $('playerHpText'),
  playerHpBar: $('playerHpBar'),
  playerAtk: $('playerAtk'),
  coins: $('coins'),
  medkits: $('medkits'),
  planetName: $('planetName'),
  planetIcon: $('planetIcon'),
  planetDesc: $('planetDesc'),
  stageText: $('stageText'),
  progressDots: $('progressDots'),
  upgradeCost: $('upgradeCost'),
  enemyType: $('enemyType'),
  enemyReward: $('enemyReward'),
  enemyAvatar: $('enemyAvatar'),
  enemyName: $('enemyName'),
  enemyHpText: $('enemyHpText'),
  enemyHpBar: $('enemyHpBar'),
  message: $('message'),
  battleLog: $('battleLog'),
  canvas: $('gameCanvas'),
  stageClearOverlay: $('stageClearOverlay'),
  stageClearConfetti: $('stageClearConfetti'),
  stageClearIcon: $('stageClearIcon'),
  stageClearTitle: $('stageClearTitle'),
  stageClearUpgrade: $('stageClearUpgrade'),
  stageClearMedal: $('stageClearMedal'),
  medalCount: $('medalCount'),
  medalsGrid: $('medalsGrid')
};


const ctx = els.canvas.getContext('2d');
const groundY = els.canvas.height - 74;
player.baseY = groundY - player.height;
player.y = player.baseY;


function playerAttack() {
  return 16 + (state.weaponLevel - 1) * 10;
}

function upgradeCost() {
  return 50 + (state.weaponLevel - 1) * 45;
}

function currentPlanet() {
  return planets[Math.min(state.planetIndex, planets.length - 1)];
}

function playerEvolutionLevel() {
  return clamp(state.planetIndex + (state.levelCompleted || state.wonGame ? 1 : 0), 0, playerForms.length - 1);
}

function currentPlayerForm() {
  return playerForms[playerEvolutionLevel()];
}

function medalForPlanet(index) {
  return medalDefinitions[index];
}

function hasMedal(id) {
  return state.medals.includes(id);
}

function awardMedal(index) {
  const medal = medalForPlanet(index);
  if (medal && !hasMedal(medal.id)) {
    state.medals.push(medal.id);
    return medal;
  }
  return medal;
}

function enemyForCurrentWave() {

  const planet = currentPlanet();
  const template = state.waveIndex < planet.monsters.length ? planet.monsters[state.waveIndex] : planet.boss;
  const isBoss = state.waveIndex === planet.monsters.length;
  const width = isBoss ? 104 : 76;
  const height = isBoss ? 120 : 86;
  const stageBoost = state.planetIndex;
  const waveBoost = state.waveIndex;
  const hpMultiplier = 1 + stageBoost * 0.16 + waveBoost * 0.04 + (isBoss ? 0.12 : 0);
  const atkMultiplier = 1 + stageBoost * 0.2 + waveBoost * 0.06 + (isBoss ? 0.16 : 0);
  const speedMultiplier = 1 + stageBoost * 0.035;
  const scaledHp = Math.round(template.hp * hpMultiplier);
  const scaledAtk = Math.round(template.atk * atkMultiplier);

  return {
    ...template,
    hp: scaledHp,
    atk: scaledAtk,
    maxHp: scaledHp,
    baseHp: template.hp,
    baseAtk: template.atk,
    powerLevel: stageBoost + 1,
    isBoss,
    width,
    height,
    x: els.canvas.width - width - 90,
    y: groundY - height,
    speed: Math.round(template.speed * speedMultiplier),
    shootAt: performance.now() + 900,
    touchAt: 0
  };
}


function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function addLog(text, className = '') {
  const item = document.createElement('li');
  item.textContent = text;
  if (className) item.className = className;
  els.battleLog.prepend(item);
}

function addParticle(x, y, text, color = '#facc15') {
  state.particles.push({ x, y, text, color, life: 0.9 });
}

function setMessage(text, className = '') {
  els.message.textContent = text;
  els.message.className = `message ${className}`.trim();
}

function renderMedals() {
  els.medalCount.textContent = `${state.medals.length} / ${medalDefinitions.length}`;
  els.medalsGrid.innerHTML = '';

  for (const medal of medalDefinitions) {
    const unlocked = hasMedal(medal.id);
    const item = document.createElement('div');
    item.className = `medal-item ${unlocked ? 'unlocked' : ''}`.trim();
    item.title = unlocked ? `${medal.name}：${medal.desc}` : `未获得：击败${medal.boss}`;
    item.innerHTML = `
      <span class="medal-icon">${unlocked ? medal.icon : '🔒'}</span>
      <span class="medal-name">${unlocked ? medal.name : medal.planet}</span>
      <span class="medal-desc">${unlocked ? medal.desc : '未获得'}</span>
    `;
    els.medalsGrid.appendChild(item);
  }
}

function renderHud() {
  const planet = currentPlanet();

  const form = currentPlayerForm();
  const atk = playerAttack();
  const cost = upgradeCost();

  const playerHpPercent = clamp((state.playerHp / state.playerMaxHp) * 100, 0, 100);

  els.playerLevel.textContent = `${form.title} · 武器 Lv.${state.weaponLevel}`;
  els.playerAvatar.textContent = form.icon;
  els.playerAvatar.style.background = `linear-gradient(135deg, ${form.glow}, rgba(167, 139, 250, 0.24))`;
  els.playerHpText.textContent = `${state.playerHp} / ${state.playerMaxHp}`;

  els.playerHpBar.style.width = `${playerHpPercent}%`;
  els.playerAtk.textContent = atk;
  els.coins.textContent = state.coins;
  els.medkits.textContent = state.medkits;
  els.planetName.textContent = planet.name;
  els.planetIcon.textContent = planet.icon;
  els.planetDesc.textContent = planet.desc;
  els.stageText.textContent = `第 ${Math.min(state.planetIndex + 1, 8)} / 8 关`;
  els.upgradeCost.textContent = `${cost} 星币`;
  els.upgradeBtn.disabled = state.coins < cost || state.gameOver || state.inBattle;
  els.healBtn.disabled = state.coins < 35 || state.gameOver;

  els.progressDots.innerHTML = '';
  for (let index = 0; index < 4; index += 1) {
    const dot = document.createElement('span');
    if (index < state.waveIndex || state.levelCompleted) dot.classList.add('done');
    els.progressDots.appendChild(dot);
  }

  if (state.enemy) {
    const enemyHpPercent = clamp((state.enemy.hp / state.enemy.maxHp) * 100, 0, 100);
    els.enemyType.textContent = state.enemy.isBoss ? 'Boss 战' : `第 ${state.waveIndex + 1} 波怪物`;
    els.enemyReward.textContent = `奖励 ${state.enemy.reward} 星币`;
    els.enemyAvatar.textContent = state.enemy.avatar;
    els.enemyName.textContent = state.enemy.name;
    els.enemyHpText.textContent = `${state.enemy.hp} / ${state.enemy.maxHp}`;
    els.enemyHpBar.style.width = `${enemyHpPercent}%`;
  } else {
    els.enemyType.textContent = state.levelCompleted ? '关卡已打赢' : '2D 横版战斗';
    els.enemyReward.textContent = state.levelCompleted && !state.wonGame ? '可进入下一关' : '奖励 0 星币';
    els.enemyAvatar.textContent = state.levelCompleted ? '🏆' : '👾';
    els.enemyName.textContent = state.levelCompleted ? `${planet.name}已通关` : '准备战斗';
    els.enemyHpText.textContent = '0 / 0';
    els.enemyHpBar.style.width = '0%';
  }

  const skillLeft = Math.max(0, Math.ceil((state.skillReadyAt - performance.now()) / 1000));
  els.startBtn.disabled = state.inBattle || state.waitingForNextWave || state.gameOver;
  els.startBtn.textContent = startButtonText();
  els.attackBtn.disabled = !state.inBattle || state.gameOver;
  els.jumpBtn.disabled = !state.inBattle || player.isJumping || state.gameOver;
  els.skillBtn.disabled = !state.inBattle || skillLeft > 0 || state.gameOver;

  els.skillBtn.textContent = skillLeft > 0 ? `蓄能炮（${skillLeft}s）` : '蓄能炮';
  els.medkitBtn.disabled = !state.inBattle || state.medkits <= 0 || state.playerHp === state.playerMaxHp || state.gameOver;
  renderMedals();
}


function startButtonText() {
  if (state.gameOver) return state.wonGame ? '已全部通关' : '已失败';
  if (state.waitingForNextWave) return '下一波准备中';
  if (state.inBattle) return '战斗中';
  if (state.levelCompleted) return '进入下一关';
  if (state.waveIndex >= currentPlanet().monsters.length) return `挑战${currentPlanet().name}Boss`;
  if (state.waveIndex > 0) return `继续第 ${state.waveIndex + 1} 波`;
  return `开始${currentPlanet().name}关`;
}


function handleStartButton() {
  console.log('handleStartButton called', JSON.stringify({ gameOver: state.gameOver, inBattle: state.inBattle, waitingForNextWave: state.waitingForNextWave, victoryAnimation: !!state.victoryAnimation, levelCompleted: state.levelCompleted }));
  if (state.gameOver || state.inBattle || state.waitingForNextWave || state.victoryAnimation) return;

  if (state.gameStartTime === 0) {
    state.gameStartTime = performance.now();
  }

  if (state.levelCompleted) {
    state.planetIndex += 1;
    state.waveIndex = 0;
    state.levelCompleted = false;
    state.projectiles = [];
    setMessage(`进入第 ${state.planetIndex + 1} 关：${currentPlanet().name}。先击败 3 波怪物，最后挑战 Boss。`);
    addLog(`抵达 ${currentPlanet().name}。`);
    startWave();
    return;
  }

  startWave();
}

function startWave() {
  console.log('startWave called', state.gameOver, state.levelCompleted);
  if (state.gameOver || state.levelCompleted) return;
  state.enemy = enemyForCurrentWave();
  state.inBattle = true;
  state.projectiles = [];
  state.particles = [];
  const type = state.enemy.isBoss ? 'Boss' : '怪物';
  setMessage(`${currentPlanet().name}${type}「${state.enemy.name}」出现！当前强度 ${state.enemy.powerLevel}，攻击 ${state.enemy.atk}。`);
  addLog(`${state.enemy.name} 出现在战场右侧，本关怪物比上一关更强。`);

  renderHud();
}

function shoot(multiplier = 1, isSkill = false) {
  const now = performance.now();
  if (!state.inBattle || !state.enemy || state.gameOver) return;
  if (!isSkill && now - state.lastShotAt < 260) return;
  if (isSkill && now < state.skillReadyAt) return;

  const damage = Math.round(playerAttack() * multiplier + Math.floor(Math.random() * 7));
  state.projectiles.push({
    owner: 'player',
    x: player.x + player.width - 4,
    y: player.y + 26,
    width: isSkill ? 34 : 18,
    height: isSkill ? 12 : 7,
    vx: isSkill ? 760 : 620,
    damage,
    color: isSkill ? '#a78bfa' : '#6ee7ff'
  });

  state.lastShotAt = now;
  if (isSkill) state.skillReadyAt = now + 5200;
}

function enemyShoot(now) {
  const enemy = state.enemy;
  if (!enemy || now < enemy.shootAt) return;

  enemy.shootAt = now + (enemy.isBoss ? 900 : 1250);
  state.projectiles.push({
    owner: 'enemy',
    x: enemy.x + 4,
    y: enemy.y + enemy.height * 0.45,
    width: enemy.isBoss ? 20 : 15,
    height: enemy.isBoss ? 20 : 15,
    vx: enemy.isBoss ? -390 : -330,
    damage: enemy.atk,
    color: '#fb7185'
  });
}

function damageEnemy(amount) {
  if (!state.enemy) return;
  state.enemy.hp = clamp(state.enemy.hp - amount, 0, state.enemy.maxHp);
  addParticle(state.enemy.x + state.enemy.width / 2, state.enemy.y, `-${amount}`, '#facc15');

  if (state.enemy.hp <= 0) {
    defeatEnemy();
  }
}

function jumpPlayer() {
  if (!state.inBattle || state.gameOver || player.isJumping) return;
  player.isJumping = true;
  player.jumpTime = 0;
  player.y = player.baseY;
  addParticle(player.x + player.width / 2, player.y, '跳跃躲避', '#6ee7ff');
}


function startVictoryAnimation(planetName, form, medal) {
  const colors = ['#facc15', '#34d399', '#6ee7ff', '#a78bfa', '#fb7185', '#f97316'];

  const confetti = Array.from({ length: 70 }, (_, index) => ({
    x: (index * 73) % els.canvas.width,
    y: -30 - ((index * 41) % 220),
    size: 5 + (index % 5),
    speed: 90 + (index % 7) * 18,
    drift: ((index % 9) - 4) * 8,
    color: colors[index % colors.length],
    rotate: index * 0.37
  }));

  els.stageClearTitle.textContent = `恭喜通过${planetName}关卡！`;
  els.stageClearUpgrade.textContent = `你的飞船已经升级成「${form.title}」`;
  els.stageClearMedal.textContent = medal ? `获得勋章：${medal.icon} ${medal.name}` : '获得独特勋章';
  els.stageClearIcon.textContent = medal ? medal.icon : form.icon;

  els.stageClearIcon.style.boxShadow = `0 0 54px ${form.weapon}`;
  els.stageClearConfetti.innerHTML = '';

  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement('span');
    piece.style.left = `${(index * 37) % 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty('--fall-duration', `${2 + (index % 5) * 0.25}s`);
    piece.style.setProperty('--fall-delay', `${-(index % 8) * 0.18}s`);
    piece.style.setProperty('--fall-drift', `${((index % 9) - 4) * 18}px`);
    els.stageClearConfetti.appendChild(piece);
  }

  els.stageClearOverlay.classList.add('show');
  els.stageClearOverlay.setAttribute('aria-hidden', 'false');

  state.victoryAnimation = {
    startedAt: performance.now(),
    duration: 3400,
    planetName,
    formTitle: form.title,
    formIcon: form.icon,
    formColor: form.weapon,
    medalName: medal?.name || '',
    medalIcon: medal?.icon || '',
    confetti
  };
}


function updateVictoryAnimation(now) {
  if (!state.victoryAnimation) return;
  if (now - state.victoryAnimation.startedAt >= state.victoryAnimation.duration) {
    state.victoryAnimation = null;
    els.stageClearOverlay.classList.remove('show');
    els.stageClearOverlay.setAttribute('aria-hidden', 'true');
    els.stageClearConfetti.innerHTML = '';
    renderHud();
  }
}


function damagePlayer(amount) {
  state.playerHp = clamp(state.playerHp - amount, 0, state.playerMaxHp);


  addParticle(player.x + player.width / 2, player.y, `-${amount}`, '#fb7185');

  if (state.playerHp <= 0) {
    state.inBattle = false;
    state.gameOver = true;
    state.enemy = null;
    setMessage('飞船被击毁了！你还没有打赢本关，不能进入下一关。点击"重新开始"再挑战。', 'lose');
    addLog('挑战失败，关卡进度没有解锁。', 'lose');
    addToLeaderboard();
  }
}

function defeatEnemy() {
  const defeated = state.enemy;
  state.coins += defeated.reward;
  state.kills += 1;
  addLog(`击败 ${defeated.name}，获得 ${defeated.reward} 星币。`, 'win');
  addParticle(defeated.x, defeated.y, `+${defeated.reward} 星币`, '#34d399');
  state.enemy = null;
  state.inBattle = false;
  player.y = player.baseY;
  player.isJumping = false;
  player.jumpTime = 0;
  state.projectiles = state.projectiles.filter((projectile) => projectile.owner === 'player');


  if (defeated.isBoss) {
    const clearedPlanetIndex = state.planetIndex;
    const clearedPlanetName = currentPlanet().name;
    state.levelCompleted = true;
    state.playerHp = clamp(state.playerHp + 35, 0, state.playerMaxHp);
    const evolvedForm = currentPlayerForm();
    const earnedMedal = awardMedal(clearedPlanetIndex);
    addLog(`${clearedPlanetName}通关！获得勋章：${earnedMedal.icon} ${earnedMedal.name}。`, 'win');
    addLog(`外形进化为：${evolvedForm.title}。`, 'win');
    addParticle(player.x + player.width / 2, player.y - 24, `获得${earnedMedal.name}`, evolvedForm.weapon);
    startVictoryAnimation(clearedPlanetName, evolvedForm, earnedMedal);


    if (state.planetIndex === planets.length - 1) {
      state.gameOver = true;
      state.wonGame = true;
      setMessage(`胜利庆祝！你进化为「${evolvedForm.title}」，八大行星全部通关！`, 'win');
      addToLeaderboard();
    } else {
      setMessage(`${clearedPlanetName}通关庆祝！外形进化为「${evolvedForm.title}」，动画结束后可进入下一关。`, 'win');
    }
    renderHud();
    return;
  }


  state.waveIndex += 1;
  state.waitingForNextWave = true;
  setMessage(`第 ${state.waveIndex} 波已击败！下一波马上出现，Boss 打赢后才能进入下一关。`, 'win');
  renderHud();

  setTimeout(() => {
    if (!state.gameOver && state.waitingForNextWave) {
      state.waitingForNextWave = false;
      startWave();
    }
  }, 950);
}

function useMedkit() {
  if (!state.inBattle || state.medkits <= 0 || state.playerHp === state.playerMaxHp) return;
  state.medkits -= 1;
  const heal = 45 + state.weaponLevel * 5;
  state.playerHp = clamp(state.playerHp + heal, 0, state.playerMaxHp);
  addLog(`使用治疗包，恢复 ${heal} 点生命。`, 'win');
  renderHud();
}

function upgradeWeapon() {
  const cost = upgradeCost();
  if (state.coins < cost || state.gameOver || state.inBattle) return;
  state.coins -= cost;
  state.weaponLevel += 1;
  state.playerMaxHp += 8;
  state.playerHp = clamp(state.playerHp + 22, 0, state.playerMaxHp);
  addLog(`武器升级到 Lv.${state.weaponLevel}，攻击提升，生命上限增加。`, 'win');
  setMessage(`升级成功！当前普通射击约 ${playerAttack()} 点伤害。`);
  renderHud();
}

function buyMedkit() {
  if (state.coins < 35 || state.gameOver) return;
  state.coins -= 35;
  state.medkits += 1;
  addLog('购买 1 个治疗包。');
  renderHud();
}

function restartGame() {
  Object.assign(state, {
    planetIndex: 0,
    waveIndex: 0,
    coins: 0,
    weaponLevel: 1,
    playerHp: 100,
    playerMaxHp: 100,
    medkits: 2,
    enemy: null,
    inBattle: false,
    waitingForNextWave: false,
    levelCompleted: false,
    gameOver: false,
    wonGame: false,
    lastShotAt: 0,
    skillReadyAt: 0,
    victoryAnimation: null,
    medals: [],
    projectiles: [],
    particles: [],
    kills: 0,
    gameStartTime: 0,
    elapsedTime: 0
  });

  els.stageClearOverlay.classList.remove('show');
  els.stageClearOverlay.setAttribute('aria-hidden', 'true');
  els.stageClearConfetti.innerHTML = '';
  player.x = player.spawnX;

  player.y = player.baseY;

  player.isJumping = false;
  player.jumpTime = 0;
  els.battleLog.innerHTML = '';


  setMessage('点击"开始本关"，进入水星第一波。必须打赢本关 Boss 才能进入下一关。');
  renderHud();
}

function updateGame(delta, now) {
  if (!state.inBattle || state.gameOver) return;

  const movingLeft = keys.has('a') || keys.has('arrowleft');
  const movingRight = keys.has('d') || keys.has('arrowright');
  if (movingLeft) player.x -= player.speed * delta;
  if (movingRight) player.x += player.speed * delta;
  player.x = clamp(player.x, 28, 360);

  if (player.isJumping) {
    player.jumpTime += delta;
    const progress = clamp(player.jumpTime / player.jumpDuration, 0, 1);
    player.y = player.baseY - Math.sin(progress * Math.PI) * player.jumpHeight;

    if (progress >= 1) {
      player.y = player.baseY;
      player.isJumping = false;
      player.jumpTime = 0;
    }
  } else {
    player.y = player.baseY;
  }

  const enemy = state.enemy;


  if (enemy) {
    const targetX = player.x + 315;
    if (enemy.x > targetX) enemy.x -= enemy.speed * delta;
    if (enemy.x < targetX - 34) enemy.x += enemy.speed * delta;
    enemy.x = clamp(enemy.x, 430, els.canvas.width - enemy.width - 28);
    enemyShoot(now);

    if (rectsOverlap(player, enemy) && now > enemy.touchAt) {
      enemy.touchAt = now + 900;
      damagePlayer(Math.max(1, enemy.atk - 2));
    }
  }

  for (const projectile of state.projectiles) {
    projectile.x += projectile.vx * delta;
  }

  for (const projectile of state.projectiles) {
    if (projectile.owner === 'player' && state.enemy && rectsOverlap(projectile, state.enemy)) {
      projectile.hit = true;
      damageEnemy(projectile.damage);
    }

    if (projectile.owner === 'enemy' && rectsOverlap(projectile, player)) {
      projectile.hit = true;
      damagePlayer(projectile.damage);
    }
  }

  state.projectiles = state.projectiles.filter((projectile) => !projectile.hit && projectile.x > -80 && projectile.x < els.canvas.width + 80);
  state.particles.forEach((particle) => {
    particle.y -= 36 * delta;
    particle.life -= delta;
  });
  state.particles = state.particles.filter((particle) => particle.life > 0);
}

function drawBackground() {
  const planet = currentPlanet();
  const [top, middle, accent] = planet.colors;
  const gradient = ctx.createLinearGradient(0, 0, 0, els.canvas.height);
  gradient.addColorStop(0, top);
  gradient.addColorStop(0.52, middle);
  gradient.addColorStop(1, '#111827');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, els.canvas.width, els.canvas.height);

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  for (let i = 0; i < 36; i += 1) {
    const x = (i * 127 + state.planetIndex * 41) % els.canvas.width;
    const y = (i * 53 + 23) % 210;
    ctx.fillRect(x, y, i % 3 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1);
  }

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(els.canvas.width - 120, 110, 78, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.fillRect(0, groundY, els.canvas.width, els.canvas.height - groundY);
  ctx.fillStyle = accent;
  ctx.fillRect(0, groundY, els.canvas.width, 5);

  const startX = player.spawnX + player.width / 2;
  ctx.save();
  ctx.fillStyle = 'rgba(52, 211, 153, 0.22)';
  ctx.save();
  ctx.translate(startX, groundY + 9);
  ctx.scale(46, 12);
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(startX - 30, groundY + 2);
  ctx.lineTo(startX + 30, groundY + 2);
  ctx.stroke();
  ctx.fillStyle = '#bbf7d0';
  ctx.font = '800 15px Microsoft YaHei, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('初始点', startX, groundY + 34);
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.82)';

  ctx.font = '700 20px Microsoft YaHei, sans-serif';
  ctx.fillText(`${planet.icon} ${planet.name}  第 ${state.waveIndex + 1 > 4 ? 4 : state.waveIndex + 1}/4 波`, 24, 36);
}

function drawHealthBar(x, y, width, value, max, color) {
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x, y, width, 8);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width * clamp(value / max, 0, 1), 8);
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.strokeRect(x, y, width, 8);
}

function fillRoundedRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function drawPlayer() {
  const form = currentPlayerForm();
  const evolution = playerEvolutionLevel();
  const armorScale = 1 + evolution * 0.025;

  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
  ctx.scale(armorScale, armorScale);
  ctx.translate(-player.width / 2, -player.height / 2);

  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.fillStyle = form.glow;
  ctx.beginPath();
  ctx.arc(30, 38, 34 + evolution * 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (evolution >= 2) {
    ctx.fillStyle = evolution >= 6 ? 'rgba(167, 139, 250, 0.72)' : 'rgba(56, 189, 248, 0.55)';
    ctx.beginPath();
    ctx.moveTo(10, 34);
    ctx.lineTo(-18 - evolution * 2, 20);
    ctx.lineTo(4, 62);
    ctx.closePath();
    ctx.fill();
  }

  if (evolution >= 4) {
    ctx.strokeStyle = form.weapon;
    ctx.lineWidth = 3;
    ctx.save();
    ctx.translate(30, 38);
    ctx.rotate(-0.18);
    ctx.scale(42, 15);
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

  }

  ctx.fillStyle = form.body;
  fillRoundedRect(10, 24, 38, 50, 9);

  ctx.fillStyle = form.armor;
  ctx.fillRect(14, 29, 30, 12);
  ctx.fillRect(9, 47, 40, 10);

  if (evolution >= 3) {
    ctx.fillStyle = form.weapon;
    ctx.fillRect(6, 22, 10, 12);
    ctx.fillRect(42, 22, 10, 12);
  }

  ctx.fillStyle = form.weapon;
  ctx.fillRect(42, 39, 22 + evolution * 3, 10);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(49, 42, 17 + evolution * 2, 4);

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(29, 16, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = form.visor;
  ctx.beginPath();
  ctx.arc(34, 16, 10 + Math.min(evolution, 4), 0, Math.PI * 2);
  ctx.fill();

  if (evolution >= 5) {
    ctx.strokeStyle = form.weapon;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(29, 16, 24, Math.PI * 1.05, Math.PI * 1.95);
    ctx.stroke();
  }

  if (evolution >= 8) {
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(16, -7);
    ctx.lineTo(23, 6);
    ctx.lineTo(30, -8);
    ctx.lineTo(38, 6);
    ctx.lineTo(44, -7);
    ctx.lineTo(43, 8);
    ctx.lineTo(17, 8);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = player.isJumping ? '#facc15' : form.weapon;
  ctx.fillRect(16, 74, 9, 10);
  ctx.fillRect(36, 74, 9, 10);

  ctx.fillStyle = evolution >= 6 ? '#facc15' : '#f97316';
  ctx.beginPath();
  ctx.moveTo(4, 57);
  ctx.lineTo(-14 - evolution * 2, 48);
  ctx.lineTo(4, 39);
  ctx.closePath();
  ctx.fill();

  if (evolution >= 1) {
    ctx.fillStyle = form.weapon;
    ctx.font = '700 17px serif';
    ctx.textAlign = 'center';
    ctx.fillText(form.icon, 30, -11);
  }

  ctx.restore();
  drawHealthBar(player.x, player.y - 18, player.width, state.playerHp, state.playerMaxHp, '#34d399');
}


function drawEnemy() {
  const enemy = state.enemy;
  if (!enemy) return;

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.fillStyle = enemy.isBoss ? '#7c2d12' : '#4c1d95';
  fillRoundedRect(0, 12, enemy.width, enemy.height - 12, enemy.isBoss ? 26 : 18);

  ctx.fillStyle = enemy.isBoss ? '#f97316' : '#a78bfa';
  ctx.beginPath();
  ctx.arc(enemy.width * 0.5, 18, enemy.isBoss ? 28 : 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = `${enemy.isBoss ? 48 : 34}px serif`;
  ctx.textAlign = 'center';
  ctx.fillText(enemy.avatar, enemy.width / 2, enemy.isBoss ? 74 : 62);
  ctx.restore();

  drawHealthBar(enemy.x, enemy.y - 18, enemy.width, enemy.hp, enemy.maxHp, '#fb7185');
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 14px Microsoft YaHei, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(enemy.name, enemy.x + enemy.width / 2, enemy.y - 24);
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    ctx.save();
    ctx.shadowBlur = 14;
    ctx.shadowColor = projectile.color;
    ctx.fillStyle = projectile.color;
    fillRoundedRect(projectile.x, projectile.y, projectile.width, projectile.height, 999);
    ctx.restore();

  }
}

function drawParticles() {
  ctx.font = '800 18px Microsoft YaHei, sans-serif';
  ctx.textAlign = 'center';
  for (const particle of state.particles) {
    ctx.save();
    ctx.globalAlpha = clamp(particle.life, 0, 1);
    ctx.fillStyle = particle.color;
    ctx.fillText(particle.text, particle.x, particle.y);
    ctx.restore();
  }
}

function drawVictoryAnimation() {
  const animation = state.victoryAnimation;
  if (!animation) return;

  const elapsed = performance.now() - animation.startedAt;
  const progress = clamp(elapsed / animation.duration, 0, 1);
  const pulse = 1 + Math.sin(progress * Math.PI * 6) * 0.04;

  ctx.save();
  ctx.fillStyle = 'rgba(2, 6, 23, 0.58)';
  ctx.fillRect(0, 0, els.canvas.width, els.canvas.height);

  for (const piece of animation.confetti) {
    const y = (piece.y + piece.speed * progress * 3.3) % (els.canvas.height + 80);
    const x = piece.x + Math.sin(progress * Math.PI * 4 + piece.rotate) * piece.drift;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(piece.rotate + progress * Math.PI * 5);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 1.7);
    ctx.restore();
  }

  ctx.translate(els.canvas.width / 2, els.canvas.height / 2);
  ctx.scale(pulse, pulse);
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(250, 204, 21, 0.22)';
  ctx.beginPath();
  ctx.arc(0, -44, 112 + Math.sin(progress * Math.PI) * 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fef3c7';
  ctx.font = '900 46px Microsoft YaHei, sans-serif';
  ctx.fillText(`${animation.planetName}通关！`, 0, -72);
  ctx.font = '900 64px serif';
  ctx.fillText(animation.formIcon, 0, 2);
  ctx.fillStyle = animation.formColor;
  ctx.font = '900 28px Microsoft YaHei, sans-serif';
  ctx.fillText(`外形进化：${animation.formTitle}`, 0, 48);
  if (animation.medalName) {
    ctx.fillStyle = '#fef3c7';
    ctx.font = '900 22px Microsoft YaHei, sans-serif';
    ctx.fillText(`获得勋章：${animation.medalIcon} ${animation.medalName}`, 0, 82);
  }
  ctx.fillStyle = '#dff8ff';
  ctx.font = '700 18px Microsoft YaHei, sans-serif';
  ctx.fillText(progress < 0.88 ? '庆祝胜利中...' : '可以进入下一关了', 0, 114);

  ctx.restore();
}

function drawIdleText() {
  if (state.inBattle || state.victoryAnimation) return;
  ctx.save();

  // 半透明底部文字背景条
  ctx.fillStyle = 'rgba(2, 6, 23, 0.45)';
  ctx.fillRect(0, els.canvas.height - 80, els.canvas.width, 80);
  
  // 文字阴影增强可读性
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 6;
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.font = 'bold 22px Microsoft YaHei, sans-serif';
  const text = state.levelCompleted && !state.gameOver ? '本关已打赢，点击"进入下一关"' : state.wonGame ? '八大行星全部通关' : '点击"开始本关"进入 2D 战斗';
  ctx.fillText(text, els.canvas.width / 2, els.canvas.height - 50);
  ctx.font = '14px Microsoft YaHei, sans-serif';
  ctx.fillText('只有击败当前行星 Boss 才会解锁下一关', els.canvas.width / 2, els.canvas.height - 22);
  ctx.restore();
}

function drawGame() {
  drawBackground();
  drawPlayer();
  drawEnemy();
  drawProjectiles();
  drawParticles();
  drawIdleText();
}

function gameLoop(time) {
  const delta = Math.min(0.033, (time - state.lastTime) / 1000 || 0);
  state.lastTime = time;

  if (!state.gameOver && state.gameStartTime > 0) {
    state.elapsedTime = Math.floor((time - state.gameStartTime) / 1000);
  }

  updateVictoryAnimation(time);
  updateGame(delta, time);

  drawGame();
  renderHud();
  requestAnimationFrame(gameLoop);
}

console.log('game.js fully loaded, starting game loop...');

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if ([' ', 'arrowleft', 'arrowright', 'arrowup'].includes(key)) event.preventDefault();
  keys.add(key === ' ' ? 'space' : key);
  if (key === 'enter') handleStartButton();
  if ((key === 'w' || key === 'arrowup') && !event.repeat) jumpPlayer();
  if (key === ' ' || key === 'j') shoot(1, false);

  if (key === 'k') shoot(2.55, true);
});


window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  keys.delete(key === ' ' ? 'space' : key);
});

els.canvas.addEventListener('click', () => {
  els.canvas.focus();
  if (!state.inBattle && !state.gameOver && !state.waitingForNextWave) handleStartButton();
});

els.startBtn.addEventListener('click', () => {
  els.canvas.focus();
  handleStartButton();
});

els.attackBtn.addEventListener('click', () => shoot(1, false));
els.jumpBtn.addEventListener('click', jumpPlayer);
els.skillBtn.addEventListener('click', () => shoot(2.55, true));

els.medkitBtn.addEventListener('click', useMedkit);
els.upgradeBtn.addEventListener('click', upgradeWeapon);
els.healBtn.addEventListener('click', buyMedkit);
els.restartBtn.addEventListener('click', restartGame);

// ========== 排行榜 ==========

const LEADERBOARD_KEY = 'solar_boss_rush_leaderboard';
const MAX_LEADERBOARD_ENTRIES = 30;
let currentLeaderboardTab = 'kills';

function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

function addToLeaderboard() {
  const entries = loadLeaderboard();

  const entry = {
    kills: state.kills,
    score: state.coins,
    stage: state.planetIndex + 1,
    weaponLevel: state.weaponLevel,
    medals: state.medals.length,
    coins: state.coins,
    elapsedTime: state.elapsedTime,
    wonGame: state.wonGame,
    time: new Date().toLocaleString('zh-CN')
  };

  entries.push(entry);
  entries.sort((a, b) => b.score - a.score);
  const trimmed = entries.slice(0, MAX_LEADERBOARD_ENTRIES);
  saveLeaderboard(trimmed);
  renderLeaderboard();
}

function clearLeaderboard() {
  localStorage.removeItem(LEADERBOARD_KEY);
  renderLeaderboard();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}分${s.toString().padStart(2, '0')}秒`;
}

function renderLeaderboard() {
  const entries = loadLeaderboard();
  const countEl = document.getElementById('leaderboardCount');
  const listEl = document.getElementById('leaderboardList');

  countEl.textContent = `${entries.length} 条记录`;

  if (entries.length === 0) {
    listEl.innerHTML = '<div class="leaderboard-empty">还没有通关记录，快去挑战吧！</div>';
    return;
  }

  let sortedEntries;
  let headers;
  let rowRenderer;

  if (currentLeaderboardTab === 'kills') {
    sortedEntries = [...entries].sort((a, b) => b.kills - a.kills);
    headers = ['排名', '击杀数', '进度', '武器', '勋章', '星币', '用时', '时间'];
    rowRenderer = (entry, rankClass) => `
      <td class="kills-cell">⚔️ ${entry.kills}</td>
      <td class="stage-cell">第 ${entry.stage} 关</td>
      <td>Lv.${entry.weaponLevel}</td>
      <td>${entry.medals} 枚</td>
      <td>${entry.coins} 币</td>
      <td class="time-cell">${formatTime(entry.elapsedTime)}</td>
      <td class="time-cell">${entry.time}</td>
    `;
  } else if (currentLeaderboardTab === 'score') {
    sortedEntries = [...entries].sort((a, b) => b.score - a.score);
    headers = ['排名', '总积分', '进度', '武器', '击杀', '勋章', '用时', '时间'];
    rowRenderer = (entry, rankClass) => `
      <td class="score-cell">💰 ${entry.score}</td>
      <td class="stage-cell">第 ${entry.stage} 关</td>
      <td>Lv.${entry.weaponLevel}</td>
      <td>${entry.kills} 杀</td>
      <td>${entry.medals} 枚</td>
      <td class="time-cell">${formatTime(entry.elapsedTime)}</td>
      <td class="time-cell">${entry.time}</td>
    `;
  } else {
    // speed: 按通关等级（最高优先） + 用时（最少优先）
    sortedEntries = [...entries].sort((a, b) => {
      if (b.stage !== a.stage) return b.stage - a.stage;
      return a.elapsedTime - b.elapsedTime;
    });
    headers = ['排名', '通关', '用时', '击杀', '武器', '勋章', '积分', '时间'];
    rowRenderer = (entry, rankClass) => `
      <td class="stage-cell">第 ${entry.stage} 关${entry.wonGame ? ' 🏆' : ''}</td>
      <td class="speed-cell">${formatTime(entry.elapsedTime)}</td>
      <td>${entry.kills} 杀</td>
      <td>Lv.${entry.weaponLevel}</td>
      <td>${entry.medals} 枚</td>
      <td class="score-cell">${entry.score}</td>
      <td class="time-cell">${entry.time}</td>
    `;
  }

  const rankMedals = ['🥇', '🥈', '🥉'];
  const rows = sortedEntries.map((entry, index) => {
    const rankDisplay = index < 3 ? rankMedals[index] : `#${index + 1}`;
    const rankClass = index < 3 ? `rank-${index + 1}` : '';
    return `
      <tr>
        <td class="rank-cell ${rankClass}">${rankDisplay}</td>
        ${rowRenderer(entry, rankClass)}
      </tr>
    `;
  }).join('');

  listEl.innerHTML = `
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>排名</th>
          ${headers.slice(1).map(h => `<th>${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// 标签页切换
document.querySelectorAll('.leaderboard-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentLeaderboardTab = tab.dataset.tab;
    renderLeaderboard();
  });
});

document.getElementById('clearLeaderboardBtn').addEventListener('click', () => {
  if (confirm('确定要清空排行榜吗？此操作不可恢复。')) {
    clearLeaderboard();
  }
});

// 初始加载排行榜
renderLeaderboard();

renderHud();
requestAnimationFrame(gameLoop);
