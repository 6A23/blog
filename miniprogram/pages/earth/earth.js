const app = getApp();
const BASE = app.globalData.apiBase;

Page({
  data: {
    tab: 'moon',     // moon | status | events
    loading: false,
    moonData: null,
    robotsData: null,
    statusData: null,
    eventsData: null,
  },

  onShow() {
    this.loadTab(this.data.tab);
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ tab });
    this.loadTab(tab);
  },

  loadTab(tab) {
    const map = {
      moon:   { q: 'moon',        key: 'moonData' },
      robots: { q: 'moon_robots', key: 'robotsData' },
      status: { q: 'status',      key: 'statusData' },
      events: { q: 'events',      key: 'eventsData' },
    };
    const cfg = map[tab];
    if (!cfg || this.data[cfg.key]) return;
    this.setData({ loading: true });
    wx.request({
      url: `${BASE}?query=${encodeURIComponent(cfg.q)}`,
      success: (res) => {
        let data = res.data;
        // 机器人数据：预处理统计数字，供 wxml 直接用
        if (tab === 'robots' && data.robots) {
          data.count_working  = data.robots.filter(r => r.status === 'working').length;
          data.count_charging = data.robots.filter(r => r.status === 'charging').length;
          data.count_standby  = data.robots.filter(r => r.status === 'standby').length;
        }
        this.setData({ [cfg.key]: data, loading: false });
      },
      fail: () => {
        wx.showToast({ title: '连接失败', icon: 'error' });
        this.setData({ loading: false });
      },
    });
  },

  onRefresh() {
    const tab = this.data.tab;
    const keyMap = { moon:'moonData', robots:'robotsData', status:'statusData', events:'eventsData' };
    if (keyMap[tab]) {
      this.setData({ [keyMap[tab]]: null });
      this.loadTab(tab);
    }
  },

  // 设置威胁等级
  onAlertInput(e) { this.setData({ alertInput: e.detail.value }); },
  setAlert() {
    const level = parseInt(this.data.alertInput || '');
    if (isNaN(level) || level < 1 || level > 10) {
      wx.showToast({ title: '请输入 1~10', icon: 'error' }); return;
    }
    wx.request({
      url: `${BASE}?action=alert&level=${level}`,
      success: (r) => {
        wx.showToast({ title: r.data.message || '已设置', icon: 'success' });
        this.setData({ statusData: null, alertInput: '' });
        setTimeout(() => this.loadTab('status'), 600);
      },
    });
  },
});
