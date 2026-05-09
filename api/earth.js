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
 * GET /api/earth?action=satellite&op=deploy&name=ISS-X → 部署卫星
 * GET /api/earth?action=alert&level=5   → 设置全球威胁等级（1-10）
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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { query, action, id, level, op, name } = req.query;

  // ── 无参数：返回总览 ──
  if (!query && !action) {
    return res.status(200).json({
      code: 200,
      title: '🌍 地球指挥中心',
      version: 'ECC-v3.7',
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
      recent_events: eventLog.slice(0, 3),
      endpoints: {
        status:     '/api/earth?query=status',
        threat:     '/api/earth?query=threat',
        events:     '/api/earth?query=events',
        facilities: '/api/earth?query=facilities',
        launch:     '/api/earth?action=launch&id=nuke1',
        abort:      '/api/earth?action=abort&id=nuke1',
        alert:      '/api/earth?action=alert&level=5',
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

  // ── 未知参数 ──
  return res.status(400).json({
    code: 400,
    message: '未知的 query/action 参数，请访问 /api/earth 查看所有接口说明',
  });
}
