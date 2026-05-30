/**
 * 🌍 地球指挥中心 API
 *
 * GET /api/earth                        → 获取地球全局状态概览
 * GET /api/earth?query=status           → 地球实时状态（温度、人口、CO₂等）
 * GET /api/earth?query=threat           → 全球威胁等级
 * GET /api/earth?query=events           → 最近事件日志
 * GET /api/earth?query=facilities       → 所有虚构设施列表
 * GET /api/earth?action=launch&id=nuke1 → 发射/激活指定设施
 * GET /api/earth?action=abort&id=nuke1  → 终止指定设施
 * GET /api/earth?action=alert&level=5   → 设置全球威胁等级（1-10）
 *
 * 🌕 月球机器人建造系统
 * GET /api/earth?query=moon             → 查看月球基地总览
 * GET /api/earth?query=moon_robots      → 查看所有机器人状态
 * GET /api/earth?query=moon_progress    → 查看建造工程进度
 * GET /api/earth?query=moon_materials   → 查看材料库存
 * GET /api/earth?action=moon_report&robot=R1&stage=地基&progress=80&msg=xxx
 *                                       → 机器人汇报工程进度
 * GET /api/earth?action=moon_request&robot=R1&material=钢梁&amount=50&reason=xxx
 *                                       → 机器人申请建造材料
 * GET /api/earth?action=moon_supply&material=钢梁&amount=50
 *                                       → 地球批准并发送补给
 */

// ── 地球实时状态（基于真实数量级的模拟数据）──
const earthStatus = {
  population:        8200000000,
  surface_temp_c:    14.8,
  co2_ppm:           424.5,
  sea_level_rise_mm: 3.7,
  ozone_index:       287,
  magnetic_field_nt: 50000,
  rotation_speed_kmh: 1670,
  moon_distance_km:  384400,
  active_volcanoes:  41,
  ongoing_earthquakes: 3,
  last_updated:      new Date().toISOString(),
};

// ── 威胁等级系统 ──
let threatLevel = 2; // 1=和平 … 10=末日
const threatLabels = {
  1: '🟢 和平',
  2: '🟢 稳定',
  3: '🟡 注意',
  4: '🟡 警戒',
  5: '🟠 中度威胁',
  6: '🟠 高度紧张',
  7: '🔴 严重威胁',
  8: '🔴 危机',
  9: '💀 极度危险',
  10: '☢️ 末日级别',
};

// ── 虚构设施数据库 ──
const facilities = {
  'nuke1': {
    id: 'nuke1',
    name: '洲际弹道导弹 MX-9',
    type: 'missile',
    icon: '🚀',
    location: '西伯利亚发射井',
    status: 'standby',
    range_km: 13000,
    warhead: '核弹头 × 3',
    last_action: null,
  },
  'sat1': {
    id: 'sat1',
    name: '侦察卫星 EAGLE-7',
    type: 'satellite',
    icon: '🛰️',
    location: '近地轨道 420km',
    status: 'active',
    orbit: 'LEO',
    resolution_m: 0.3,
    last_action: null,
  },
  'laser1': {
    id: 'laser1',
    name: '轨道激光炮 HELIOS',
    type: 'weapon',
    icon: '⚡',
    location: '地球同步轨道 35786km',
    status: 'standby',
    power_gw: 8.5,
    cooldown_min: 30,
    last_action: null,
  },
  'shield1': {
    id: 'shield1',
    name: '全球导弹防御盾 AEGIS-X',
    type: 'defense',
    icon: '🛡️',
    location: '多站点分布式',
    status: 'active',
    coverage_pct: 78,
    intercept_rate_pct: 94,
    last_action: null,
  },
  'ship1': {
    id: 'ship1',
    name: '星际飞船 PHOENIX-1',
    type: 'spacecraft',
    icon: '🚀',
    location: '月球轨道',
    status: 'docked',
    crew: 6,
    fuel_pct: 82,
    last_action: null,
  },
  'base1': {
    id: 'base1',
    name: '南极地下指挥基地',
    type: 'base',
    icon: '🏔️',
    location: '南极洲 -90°N',
    status: 'active',
    personnel: 247,
    power_source: '核聚变反应堆',
    last_action: null,
  },
};

// ── 事件日志 ──
const eventLog = [
  { time: '2026-05-09T06:12:00Z', level: 'INFO',    icon: '🌏', msg: '地球旋转速度正常，偏差 < 0.001ms/天' },
  { time: '2026-05-09T05:45:00Z', level: 'WARN',    icon: '🌋', msg: '印尼苏门答腊检测到火山活动加剧，已进入观测状态' },
  { time: '2026-05-09T04:30:00Z', level: 'INFO',    icon: '🛰️', msg: 'EAGLE-7 完成轨道校正，覆盖区域扩大 3%' },
  { time: '2026-05-09T03:18:00Z', level: 'CRITICAL',icon: '☢️', msg: '检测到未知放射源，位置：北纬 35° 东经 60°，正在追踪' },
  { time: '2026-05-09T02:00:00Z', level: 'INFO',    icon: '🌊', msg: '太平洋海平面监测站数据上传完毕，本月上升 0.3mm' },
  { time: '2026-05-09T01:10:00Z', level: 'WARN',    icon: '💨', msg: 'CO₂ 浓度突破 424ppm，已自动升级大气监控精度' },
  { time: '2026-05-08T22:55:00Z', level: 'INFO',    icon: '🚀', msg: 'PHOENIX-1 成功对接月球轨道站，补给任务完成' },
  { time: '2026-05-08T20:30:00Z', level: 'WARN',    icon: '🔴', msg: '太阳风暴 X2.1 级，通讯卫星已切换抗干扰模式' },
  { time: '2026-05-08T18:00:00Z', level: 'INFO',    icon: '🛡️', msg: 'AEGIS-X 防御盾例行维护完成，拦截率恢复至 94%' },
  { time: '2026-05-08T15:42:00Z', level: 'CRITICAL',icon: '⚡', msg: '异常引力波探测到，震源：马里亚纳海沟以西 200km' },
];

// ── 工具函数 ──
function now() { return new Date().toISOString(); }

// ══════════════════════════════════════════════
// 🌕 月球机器人建造系统
// ══════════════════════════════════════════════

// 月球基地总信息
const moonBase = {
  name: '月球静海基地 LUNA-1',
  location: '月球静海 0.67°N 23.47°E',
  established: '2026-01-15',
  total_area_m2: 0,         // 随建造增长
  phase: '第二期：居住舱建造',
  overall_progress_pct: 37,
};

// 建造阶段与进度
const buildingStages = {
  '地基': {
    name: '地基工程',
    icon: '🏗️',
    status: 'completed',
    progress_pct: 100,
    assigned_robots: ['R1', 'R2'],
    started: '2026-01-15',
    completed: '2026-02-20',
    note: '月壤夯实完毕，承重测试通过',
  },
  '骨架': {
    name: '钢架结构',
    icon: '🔩',
    status: 'completed',
    progress_pct: 100,
    assigned_robots: ['R1', 'R3'],
    started: '2026-02-21',
    completed: '2026-03-30',
    note: '主体钢架安装完毕',
  },
  '居住舱': {
    name: '居住舱安装',
    icon: '🛸',
    status: 'in_progress',
    progress_pct: 62,
    assigned_robots: ['R2', 'R4', 'R5'],
    started: '2026-04-01',
    completed: null,
    note: '气密测试进行中',
  },
  '能源系统': {
    name: '太阳能板 & 核电池',
    icon: '⚡',
    status: 'in_progress',
    progress_pct: 45,
    assigned_robots: ['R3'],
    started: '2026-04-10',
    completed: null,
    note: '太阳能板阵列铺设 45%',
  },
  '生命保障': {
    name: '空气 & 水循环系统',
    icon: '💧',
    status: 'pending',
    progress_pct: 0,
    assigned_robots: [],
    started: null,
    completed: null,
    note: '等待居住舱完工后开始',
  },
  '通信塔': {
    name: '地月通信天线塔',
    icon: '📡',
    status: 'pending',
    progress_pct: 0,
    assigned_robots: [],
    started: null,
    completed: null,
    note: '材料已申请，等待运输',
  },
};

// 机器人列表：初始为空，等待真实小程序/机器人端上报注册
const moonRobots = {};

// 月球材料库存
const moonMaterials = {
  '钢梁':     { name: '钢梁',     icon: '🔩', unit: '根', stock: 42,  capacity: 200, status: 'ok' },
  '气密板':   { name: '气密板',   icon: '🪟', unit: '块', stock: 8,   capacity: 100, status: 'low' },
  '隔热棉':   { name: '隔热棉',   icon: '🧱', unit: '卷', stock: 15,  capacity: 80,  status: 'ok' },
  '太阳能板': { name: '太阳能板', icon: '☀️', unit: '片', stock: 24,  capacity: 120, status: 'ok' },
  '水管':     { name: '水管',     icon: '🚿', unit: '米', stock: 0,   capacity: 500, status: 'empty' },
  '电缆':     { name: '电缆',     icon: '🔌', unit: '米', stock: 380, capacity: 1000,status: 'ok' },
  '月壤固化剂':{ name: '月壤固化剂',icon: '🧪', unit: '桶', stock: 3,  capacity: 50,  status: 'low' },
  '氧气罐':   { name: '氧气罐',   icon: '💨', unit: '瓶', stock: 60,  capacity: 200, status: 'ok' },
};

// 材料申请队列
const materialRequests = [
  {
    id: 'REQ-001',
    robot: 'R5',
    material: '气密板',
    amount: 30,
    reason: '居住舱 B 区外壁封闭需要，当前库存不足',
    status: 'approved',
    time: '2026-05-09T10:30:00Z',
    approved_by: '地球指挥中心',
  },
  {
    id: 'REQ-002',
    robot: 'R2',
    material: '太阳能板',
    amount: 20,
    reason: '能源系统第二阵列铺设，预计还需 20 片',
    status: 'pending',
    time: '2026-05-09T13:15:00Z',
    approved_by: null,
  },
];

let reqCounter = 3; // 申请编号计数器

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query, action, id, level, op, name, robot, stage, progress, msg, material, amount, reason } = req.query;

  // ── 无参数：返回总览 ──
  if (!query && !action) {
    return res.status(200).json({
      code: 200,
      title: '🌍 地球指挥中心',
      version: 'ECC-v3.8',
      timestamp: now(),
      threat_level: threatLevel,
      threat_label: threatLabels[threatLevel],
      earth_status: {
        population: earthStatus.population.toLocaleString(),
        co2_ppm: earthStatus.co2_ppm,
        surface_temp_c: earthStatus.surface_temp_c,
        sea_level_rise_mm: earthStatus.sea_level_rise_mm,
      },
      active_facilities: Object.values(facilities).filter(f => f.status === 'active').length,
      total_facilities: Object.keys(facilities).length,
      moon_base: {
        name: moonBase.name,
        phase: moonBase.phase,
        overall_progress_pct: moonBase.overall_progress_pct,
        active_robots: Object.values(moonRobots).filter(r => r.status === 'working').length,
        pending_requests: materialRequests.filter(r => r.status === 'pending').length,
      },
      recent_events: eventLog.slice(0, 3),
      endpoints: {
        status:          '/api/earth?query=status',
        threat:          '/api/earth?query=threat',
        events:          '/api/earth?query=events',
        facilities:      '/api/earth?query=facilities',
        launch:          '/api/earth?action=launch&id=nuke1',
        abort:           '/api/earth?action=abort&id=nuke1',
        alert:           '/api/earth?action=alert&level=5',
        moon:            '/api/earth?query=moon',
        moon_robots:     '/api/earth?query=moon_robots',
        moon_progress:   '/api/earth?query=moon_progress',
        moon_materials:  '/api/earth?query=moon_materials',
        robot_update:    '/api/earth?action=robot_update&robot=R1&status=working&battery=88&location=居住舱A区&task=气密焊接',
        moon_report:     '/api/earth?action=moon_report&robot=R1&stage=居住舱&progress=65&msg=气密焊接完成',
        moon_request:    '/api/earth?action=moon_request&robot=R1&material=气密板&amount=20&reason=B区封闭需要',
        moon_supply:     '/api/earth?action=moon_supply&material=气密板&amount=20',
      },
    });
  }

  // ── query=status：地球实时状态 ──
  if (query === 'status') {
    earthStatus.last_updated = now();
    // 模拟微小浮动
    earthStatus.co2_ppm = +(earthStatus.co2_ppm + (Math.random() * 0.1 - 0.05)).toFixed(1);
    earthStatus.surface_temp_c = +(earthStatus.surface_temp_c + (Math.random() * 0.04 - 0.02)).toFixed(2);
    return res.status(200).json({
      code: 200,
      query: 'status',
      data: {
        ...earthStatus,
        population_display: earthStatus.population.toLocaleString() + ' 人',
        co2_status: earthStatus.co2_ppm > 420 ? '⚠️ 超过安全阈值' : '✅ 正常',
        temp_status: earthStatus.surface_temp_c > 15 ? '⚠️ 偏高' : '✅ 正常',
      },
    });
  }

  // ── query=threat：威胁等级 ──
  if (query === 'threat') {
    return res.status(200).json({
      code: 200,
      query: 'threat',
      threat_level: threatLevel,
      threat_label: threatLabels[threatLevel],
      scale: Object.entries(threatLabels).map(([k, v]) => ({
        level: +k,
        label: v,
        current: +k === threatLevel,
      })),
      tip: '使用 /api/earth?action=alert&level=1~10 修改威胁等级',
    });
  }

  // ── query=events：事件日志 ──
  if (query === 'events') {
    return res.status(200).json({
      code: 200,
      query: 'events',
      total: eventLog.length,
      events: eventLog,
    });
  }

  // ── query=facilities：设施列表 ──
  if (query === 'facilities') {
    return res.status(200).json({
      code: 200,
      query: 'facilities',
      total: Object.keys(facilities).length,
      facilities: Object.values(facilities),
    });
  }

  // ── action=launch：发射/激活 ──
  if (action === 'launch') {
    if (!id || !facilities[id]) {
      return res.status(404).json({
        code: 404,
        message: `设施 "${id}" 不存在，使用 /api/earth?query=facilities 查看所有设施`,
      });
    }
    const f = facilities[id];
    if (f.status === 'launched' || f.status === 'deployed') {
      return res.status(409).json({
        code: 409,
        message: `${f.name} 已处于激活状态，无法重复发射`,
        facility: f,
      });
    }
    const prevStatus = f.status;
    f.status = f.type === 'satellite' ? 'deployed' : 'launched';
    f.last_action = now();
    const logEntry = {
      time: now(),
      level: 'WARN',
      icon: f.icon,
      msg: `[指令执行] ${f.name} 已从 ${f.location} 发射/激活，操作员：指挥官`,
    };
    eventLog.unshift(logEntry);
    // 威胁等级联动
    if (f.type === 'missile' || f.type === 'weapon') {
      threatLevel = Math.min(10, threatLevel + 2);
    }
    return res.status(200).json({
      code: 200,
      action: 'launch',
      success: true,
      facility: f,
      prev_status: prevStatus,
      new_status: f.status,
      threat_level: threatLevel,
      threat_label: threatLabels[threatLevel],
      message: `✅ ${f.name} 发射指令已执行`,
      timestamp: now(),
    });
  }

  // ── action=abort：终止 ──
  if (action === 'abort') {
    if (!id || !facilities[id]) {
      return res.status(404).json({
        code: 404,
        message: `设施 "${id}" 不存在`,
      });
    }
    const f = facilities[id];
    const prevStatus = f.status;
    f.status = 'standby';
    f.last_action = now();
    const logEntry = {
      time: now(),
      level: 'INFO',
      icon: '🛑',
      msg: `[终止指令] ${f.name} 已终止，状态归位 standby`,
    };
    eventLog.unshift(logEntry);
    if (f.type === 'missile' || f.type === 'weapon') {
      threatLevel = Math.max(1, threatLevel - 2);
    }
    return res.status(200).json({
      code: 200,
      action: 'abort',
      success: true,
      facility: f,
      prev_status: prevStatus,
      new_status: 'standby',
      threat_level: threatLevel,
      threat_label: threatLabels[threatLevel],
      message: `🛑 ${f.name} 终止指令已执行`,
      timestamp: now(),
    });
  }

  // ── action=alert：设置威胁等级 ──
  if (action === 'alert') {
    const newLevel = parseInt(level, 10);
    if (isNaN(newLevel) || newLevel < 1 || newLevel > 10) {
      return res.status(400).json({
        code: 400,
        message: 'level 参数必须是 1~10 的整数',
      });
    }
    const oldLevel = threatLevel;
    threatLevel = newLevel;
    eventLog.unshift({
      time: now(),
      level: newLevel >= 7 ? 'CRITICAL' : newLevel >= 4 ? 'WARN' : 'INFO',
      icon: '🚨',
      msg: `[威胁等级变更] ${threatLabels[oldLevel]} → ${threatLabels[newLevel]}`,
    });
    return res.status(200).json({
      code: 200,
      action: 'alert',
      old_level: oldLevel,
      old_label: threatLabels[oldLevel],
      new_level: threatLevel,
      new_label: threatLabels[threatLevel],
      message: `🚨 全球威胁等级已更新为 ${threatLabels[threatLevel]}`,
      timestamp: now(),
    });
  }

  // ════════════════════════════════════════════
  // 🌕 月球机器人建造系统 — 查询路由
  // ════════════════════════════════════════════

  // ── query=moon：月球基地总览 ──
  if (query === 'moon') {
    const stages = Object.values(buildingStages);
    const overall = Math.round(stages.reduce((s, st) => s + st.progress_pct, 0) / stages.length);
    moonBase.overall_progress_pct = overall;
    return res.status(200).json({
      code: 200,
      query: 'moon',
      base: moonBase,
      robots_summary: {
        total: Object.keys(moonRobots).length,
        working:  Object.values(moonRobots).filter(r => r.status === 'working').length,
        charging: Object.values(moonRobots).filter(r => r.status === 'charging').length,
        standby:  Object.values(moonRobots).filter(r => r.status === 'standby').length,
      },
      materials_alert: Object.values(moonMaterials)
        .filter(m => m.status === 'low' || m.status === 'empty')
        .map(m => ({ name: m.name, icon: m.icon, stock: m.stock, status: m.status })),
      pending_requests: materialRequests.filter(r => r.status === 'pending').length,
      tip: '使用 ?query=moon_robots / moon_progress / moon_materials 查看详情',
    });
  }

  // ── query=moon_robots：所有机器人状态 ──
  if (query === 'moon_robots') {
    return res.status(200).json({
      code: 200,
      query: 'moon_robots',
      total: Object.keys(moonRobots).length,
      robots: Object.values(moonRobots),
      tip: '使用 ?action=moon_report&robot=R1&stage=居住舱&progress=65&msg=... 汇报工程进度',
    });
  }

  // ── query=moon_progress：建造工程进度 ──
  if (query === 'moon_progress') {
    const stages = Object.values(buildingStages);
    const overall = Math.round(stages.reduce((s, st) => s + st.progress_pct, 0) / stages.length);
    moonBase.overall_progress_pct = overall;
    return res.status(200).json({
      code: 200,
      query: 'moon_progress',
      overall_progress_pct: overall,
      phase: moonBase.phase,
      stages: buildingStages,
      tip: '使用 ?action=moon_report 提交进度更新',
    });
  }

  // ── query=moon_materials：材料库存 & 申请记录 ──
  if (query === 'moon_materials') {
    return res.status(200).json({
      code: 200,
      query: 'moon_materials',
      inventory: moonMaterials,
      requests: materialRequests,
      alerts: Object.values(moonMaterials).filter(m => m.status !== 'ok').map(m => ({
        material: m.name,
        icon: m.icon,
        stock: m.stock,
        unit: m.unit,
        status: m.status,
        warning: m.status === 'empty' ? '⛔ 库存为零，建造将停滞' : '⚠️ 库存偏低，请尽快补给',
      })),
      tip: '使用 ?action=moon_request 申请材料，?action=moon_supply 批准发送补给',
    });
  }

  // ════════════════════════════════════════════
  // 🌕 月球机器人建造系统 — 操作路由
  // ════════════════════════════════════════════

  // ── action=robot_update：机器人上报真实状态/电量/位置/任务 ──
  if (action === 'robot_update') {
    if (!robot) {
      return res.status(400).json({
        code: 400,
        message: 'robot 参数不能为空，例如：&robot=R1',
      });
    }

    const allowedStatus = ['working', 'charging', 'standby', 'offline', 'error'];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        code: 400,
        message: `status 参数无效，可用：${allowedStatus.join(', ')}`,
      });
    }

    let batteryPct = null;
    if (battery !== undefined) {
      batteryPct = parseInt(battery, 10);
      if (isNaN(batteryPct) || batteryPct < 0 || batteryPct > 100) {
        return res.status(400).json({
          code: 400,
          message: 'battery 参数必须是 0~100 的整数',
        });
      }
    }

    const existed = !!moonRobots[robot];
    const current = moonRobots[robot] || {
      id: robot,
      name: name || `月球机器人 ${robot}`,
      icon: '🤖',
      status: 'standby',
      current_task: '等待真实状态上报',
      current_stage: null,
      battery_pct: 0,
      location: '未知位置',
      total_reports: 0,
      last_report: null,
    };

    current.name = name || current.name;
    current.status = status || current.status;
    current.current_task = task || current.current_task;
    current.location = location || current.location;
    current.battery_pct = batteryPct === null ? current.battery_pct : batteryPct;
    current.last_report = now();
    current.total_reports = (current.total_reports || 0) + 1;
    moonRobots[robot] = current;

    eventLog.unshift({
      time: now(),
      level: current.status === 'error' || current.status === 'offline' ? 'WARN' : 'INFO',
      icon: '🤖',
      msg: `[机器人状态] ${current.name}（${robot}）${existed ? '更新' : '注册'}：${current.status} · 电量 ${current.battery_pct}% · ${current.location} · ${current.current_task}`,
    });

    return res.status(200).json({
      code: 200,
      action: 'robot_update',
      success: true,
      created: !existed,
      robot: current,
      message: `✅ ${current.name} 状态已${existed ? '更新' : '注册'}：${current.status}，电量 ${current.battery_pct}%`,
      timestamp: now(),
    });
  }

  // ── action=moon_report：机器人汇报工程进度 ──
  if (action === 'moon_report') {
    if (!robot || !moonRobots[robot]) {
      return res.status(404).json({
        code: 404,
        message: `机器人 "${robot}" 不存在，可用：${Object.keys(moonRobots).join(', ')}`,
      });
    }
    if (!stage || !buildingStages[stage]) {
      return res.status(400).json({
        code: 400,
        message: `stage 参数 "${stage}" 无效，可用阶段：${Object.keys(buildingStages).join('、')}`,
      });
    }
    const prog = parseInt(progress, 10);
    if (isNaN(prog) || prog < 0 || prog > 100) {
      return res.status(400).json({
        code: 400,
        message: 'progress 参数必须是 0~100 的整数',
      });
    }

    const r = moonRobots[robot];
    const s = buildingStages[stage];
    const oldProgress = s.progress_pct;
    s.progress_pct = prog;
    if (prog === 100 && s.status !== 'completed') {
      s.status = 'completed';
      s.completed = now();
    } else if (prog > 0 && s.status === 'pending') {
      s.status = 'in_progress';
      s.started = s.started || now();
    }
    if (!s.assigned_robots.includes(robot)) s.assigned_robots.push(robot);
    r.current_stage = stage;
    r.last_report = now();
    r.total_reports += 1;
    const reportMsg = msg || `${stage}阶段进度更新至 ${prog}%`;

    // 写入事件日志
    eventLog.unshift({
      time: now(),
      level: prog === 100 ? 'INFO' : 'INFO',
      icon: '🌕',
      msg: `[月球汇报] ${r.name}（${robot}）· ${s.icon}${stage}：${oldProgress}% → ${prog}% · ${reportMsg}`,
    });

    // 重算总进度
    const allStages = Object.values(buildingStages);
    moonBase.overall_progress_pct = Math.round(allStages.reduce((acc, st) => acc + st.progress_pct, 0) / allStages.length);

    return res.status(200).json({
      code: 200,
      action: 'moon_report',
      success: true,
      robot: r,
      stage: s,
      old_progress: oldProgress,
      new_progress: prog,
      overall_progress_pct: moonBase.overall_progress_pct,
      message: `✅ 收到 ${r.name} 的工程汇报：${stage} ${prog}%`,
      timestamp: now(),
    });
  }

  // ── action=moon_request：机器人申请材料 ──
  if (action === 'moon_request') {
    if (!robot || !moonRobots[robot]) {
      return res.status(404).json({
        code: 404,
        message: `机器人 "${robot}" 不存在，可用：${Object.keys(moonRobots).join(', ')}`,
      });
    }
    if (!material) {
      return res.status(400).json({
        code: 400,
        message: 'material 参数不能为空，例如：&material=钢梁',
      });
    }
    const amt = parseInt(amount, 10);
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({
        code: 400,
        message: 'amount 参数必须是正整数',
      });
    }
    const reqId = `REQ-${String(reqCounter++).padStart(3, '0')}`;
    const newReq = {
      id: reqId,
      robot,
      material,
      amount: amt,
      reason: reason || '建造任务需要',
      status: 'pending',
      time: now(),
      approved_by: null,
    };
    materialRequests.push(newReq);
    moonRobots[robot].last_report = now();

    eventLog.unshift({
      time: now(),
      level: 'WARN',
      icon: '📦',
      msg: `[月球申请] ${moonRobots[robot].name} 申请 ${material} × ${amt} · 原因：${newReq.reason}`,
    });

    // 如果是库存为零的紧急材料，标记为 CRITICAL
    if (moonMaterials[material] && moonMaterials[material].status === 'empty') {
      eventLog[0].level = 'CRITICAL';
      eventLog[0].icon = '⛔';
    }

    return res.status(200).json({
      code: 200,
      action: 'moon_request',
      success: true,
      request: newReq,
      current_stock: moonMaterials[material]
        ? { stock: moonMaterials[material].stock, unit: moonMaterials[material].unit }
        : { note: '该材料不在已知库存中' },
      message: `📦 材料申请 ${reqId} 已提交，等待地球指挥中心审批`,
      tip: `地球指挥中心可使用 /api/earth?action=moon_supply&material=${encodeURIComponent(material)}&amount=${amt} 批准并发送补给`,
    });
  }

  // ── action=moon_supply：地球批准并发送补给 ──
  if (action === 'moon_supply') {
    if (!material) {
      return res.status(400).json({
        code: 400,
        message: 'material 参数不能为空',
      });
    }
    const amt = parseInt(amount, 10);
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({
        code: 400,
        message: 'amount 参数必须是正整数',
      });
    }

    // 更新库存
    if (moonMaterials[material]) {
      moonMaterials[material].stock += amt;
      const m = moonMaterials[material];
      const ratio = m.stock / m.capacity;
      m.status = ratio === 0 ? 'empty' : ratio < 0.2 ? 'low' : 'ok';
    } else {
      // 新材料，自动创建
      moonMaterials[material] = {
        name: material, icon: '📦', unit: '个',
        stock: amt, capacity: amt * 2, status: 'ok',
      };
    }

    // 将待审批的同类申请标为 approved
    materialRequests.forEach(r => {
      if (r.material === material && r.status === 'pending') {
        r.status = 'approved';
        r.approved_by = '地球指挥中心';
      }
    });

    // R5 如果在等待材料，改为 working
    Object.values(moonRobots).forEach(r => {
      if (r.status === 'standby' && r.current_task === '等待材料补给') {
        r.status = 'working';
        r.current_task = `处理补给材料：${material}`;
      }
    });

    eventLog.unshift({
      time: now(),
      level: 'INFO',
      icon: '🚀',
      msg: `[地球补给] 补给舱已发射 · ${material} × ${amt} → 月球静海基地，预计 3 天抵达`,
    });

    return res.status(200).json({
      code: 200,
      action: 'moon_supply',
      success: true,
      material,
      amount_sent: amt,
      new_stock: moonMaterials[material].stock,
      unit: moonMaterials[material].unit,
      approved_requests: materialRequests.filter(r => r.material === material && r.status === 'approved').length,
      message: `🚀 补给舱已发射！${material} × ${amt} 正在前往月球，预计 3 天后抵达`,
      timestamp: now(),
    });
  }

  // ── 未知参数 ──
  return res.status(400).json({
    code: 400,
    message: '未知的 query/action 参数，请访问 /api/earth 查看所有接口说明',
  });
}
