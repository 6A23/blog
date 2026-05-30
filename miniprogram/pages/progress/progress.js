const app = getApp();

// R1~R5 轮流汇报
const ROBOTS = ['R1', 'R2', 'R3', 'R4', 'R5'];
let robotIdx = 0;

Page({
  data: {
    roomName: '',
    stage: '',
    robot: '',
    progress: 0,
    reportStatus: '',   // 汇报状态提示
    logs: [
      { time: '00:00:00', msg: '开始接收建设资源' },
      { time: '00:00:10', msg: '混凝土基础铺设完成' }
    ]
  },

  onLoad(options) {
    const roomName = decodeURIComponent(options.room || '未知房间');
    const stage    = decodeURIComponent(options.stage || '居住舱');
    const robot    = ROBOTS[robotIdx % ROBOTS.length];
    robotIdx++;
    this.setData({ roomName, stage, robot });
    this.startProgress();
  },

  startProgress() {
    this._timer = setInterval(() => {
      if (this.data.progress >= 100) {
        clearInterval(this._timer);
        this.onComplete();
        return;
      }
      const newProgress = Math.min(this.data.progress + 5, 100);
      const actions = [
        '金属框架组装中...',
        '太阳能板阵列校准',
        '电子系统连接测试',
        '环境密封检测',
        '气密板安装中...',
        '管线铺设完成'
      ];
      const newLogs = [...this.data.logs, {
        time: this.now(),
        msg: actions[Math.floor(Math.random() * actions.length)]
      }];

      this.setData({ progress: newProgress, logs: newLogs });

      // 每 40% 汇报一次中间进度
      if (newProgress === 40 || newProgress === 80) {
        this.reportProgress(newProgress, `${this.data.roomName}建设进行中`);
      }
    }, 1000);
  },

  // 汇报进度到地球指挥中心
  reportProgress(pct, msg) {
    const BASE = app.globalData.apiBase;
    const { robot, stage } = this.data;
    wx.request({
      url: `${BASE}?action=moon_report&robot=${robot}&stage=${encodeURIComponent(stage)}&progress=${pct}&msg=${encodeURIComponent(msg)}`,
      success: (res) => {
        this.setData({ reportStatus: `已汇报 ${pct}%` });
      }
    });
  },

  // 建设完成
  onComplete() {
    const BASE = app.globalData.apiBase;
    const { robot, stage, roomName } = this.data;

    // 1. 汇报完工
    wx.request({
      url: `${BASE}?action=moon_report&robot=${robot}&stage=${encodeURIComponent(stage)}&progress=100&msg=${encodeURIComponent(roomName + '建设完成')}`,
      success: () => {
        this.setData({ reportStatus: '✅ 已向地球汇报完工' });
      }
    });

    // 2. 申请补给材料
    const materialMap = {
      '居住舱': '气密板',
      '能源系统': '太阳能电池',
      '地基': '混凝土块',
      '骨架': '钛合金',
      '通信塔': '光纤电缆',
      '生命保障': '氧气罐'
    };
    const material = materialMap[stage] || '钛合金';
    wx.request({
      url: `${BASE}?action=moon_request&robot=${robot}&material=${encodeURIComponent(material)}&amount=20&reason=${encodeURIComponent('建设' + roomName + '消耗，申请补充')}`,
    });

    wx.showModal({
      title: '建设完成',
      content: `${roomName}已建设完成！\n已向地球指挥中心汇报，并申请补充${material}。`,
      showCancel: false,
      success: () => { wx.navigateBack(); }
    });
  },

  now() {
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map(n => n.toString().padStart(2, '0')).join(':');
  },

  goBack() {
    clearInterval(this._timer);
    wx.navigateBack();
  }
});
