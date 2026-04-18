/**
 * 小坦克 API（Supabase 版）
 *
 * GET /api/tank              → 获取当前坦克位置
 * GET /api/tank?move=up      → 移动坦克（up/down/left/right），返回新位置
 *
 * 移动后 tank-api.html 页面会通过 Supabase Realtime 自动更新坦克位置。
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vkskripbudbomgkovzaf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrc2tyaXBidWRib21na292emFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0ODE0MTQsImV4cCI6MjA5MjA1NzQxNH0.0fuzKy-LPlQgNCun6QzJaM0Kj12iY1LT3_2TUyoMal4';

const MAP_SIZE = 12;
const MIN = 0;
const MAX = MAP_SIZE - 1;

const dirMap = {
  up:    { dx:  0, dy: -1 },
  down:  { dx:  0, dy:  1 },
  left:  { dx: -1, dy:  0 },
  right: { dx:  1, dy:  0 },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // 读取当前状态
  const { data, error } = await supabase
    .from('tank_state')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    return res.status(500).json({ code: 500, message: '数据库读取失败', error: error.message });
  }

  const { move } = req.query;

  // 没有 move 参数，直接返回当前位置
  if (!move) {
    return res.status(200).json({
      code: 200,
      x: data.x,
      y: data.y,
      dir: data.dir,
      moved: false,
      map_size: MAP_SIZE,
      message: '传入 move=up/down/left/right 来移动坦克',
    });
  }

  const dir = move.toLowerCase();
  if (!dirMap[dir]) {
    return res.status(400).json({
      code: 400,
      message: `move 参数无效："${move}"，只能是 up / down / left / right`,
    });
  }

  const { dx, dy } = dirMap[dir];
  const nx = data.x + dx;
  const ny = data.y + dy;
  const blocked = nx < MIN || nx > MAX || ny < MIN || ny > MAX;
  const newX = blocked ? data.x : nx;
  const newY = blocked ? data.y : ny;

  // 写入 Supabase（触发 Realtime 推送到页面）
  const { error: updateError } = await supabase
    .from('tank_state')
    .update({ x: newX, y: newY, dir, updated_at: new Date().toISOString() })
    .eq('id', 1);

  if (updateError) {
    return res.status(500).json({ code: 500, message: '数据库写入失败', error: updateError.message });
  }

  return res.status(200).json({
    code: 200,
    x: newX,
    y: newY,
    dir,
    moved: !blocked,
    blocked,
    map_size: MAP_SIZE,
    prev: { x: data.x, y: data.y },
    next_url: `/api/tank?move=up`,
  });
}
