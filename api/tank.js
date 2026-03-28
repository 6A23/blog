/**
 * 小坦克 API
 *
 * 用法：
 *   GET /api/tank
 *     → 返回初始位置（地图中央）
 *
 *   GET /api/tank?x=5&y=5&move=up
 *     → 传入当前坐标 + 移动方向，返回移动后的新坐标
 *
 * 参数：
 *   x     当前列（0~11，默认 5）
 *   y     当前行（0~11，默认 5）
 *   move  方向：up / down / left / right（可选）
 *
 * 返回示例：
 *   { "code": 200, "x": 5, "y": 4, "dir": "up", "moved": true, "map_size": 12 }
 */

const MAP_SIZE = 12;   // 地图格数（12×12）
const MIN = 0;
const MAX = MAP_SIZE - 1;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(200).end();

  let { x, y, move } = req.query;

  // 解析坐标，默认在地图中央
  x = parseInt(x, 10);
  y = parseInt(y, 10);
  if (isNaN(x)) x = Math.floor(MAP_SIZE / 2);
  if (isNaN(y)) y = Math.floor(MAP_SIZE / 2);

  // 限制在地图范围内
  x = Math.max(MIN, Math.min(MAX, x));
  y = Math.max(MIN, Math.min(MAX, y));

  // 如果没有 move 参数，直接返回当前位置
  if (!move) {
    return res.status(200).json({
      code: 200,
      x, y,
      dir: null,
      moved: false,
      map_size: MAP_SIZE,
      message: '传入 move=up/down/left/right 来移动坦克',
    });
  }

  // 方向映射
  const dirMap = {
    up:    { dx:  0, dy: -1 },
    down:  { dx:  0, dy:  1 },
    left:  { dx: -1, dy:  0 },
    right: { dx:  1, dy:  0 },
  };

  const validDirs = ['up', 'down', 'left', 'right'];
  const dir = move.toLowerCase();

  if (!validDirs.includes(dir)) {
    return res.status(400).json({
      code: 400,
      message: `move 参数无效："${move}"，只能是 up / down / left / right`,
    });
  }

  const { dx, dy } = dirMap[dir];
  const nx = x + dx;
  const ny = y + dy;

  // 判断是否撞墙（地图边界）
  const blocked = nx < MIN || nx > MAX || ny < MIN || ny > MAX;

  const newX = blocked ? x : nx;
  const newY = blocked ? y : ny;

  return res.status(200).json({
    code: 200,
    x: newX,
    y: newY,
    dir,
    moved: !blocked,
    blocked,
    map_size: MAP_SIZE,
    prev: { x, y },
    next_url: `/api/tank?x=${newX}&y=${newY}`,
  });
}
