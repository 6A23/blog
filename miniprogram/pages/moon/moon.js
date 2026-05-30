const app = getApp();
const BASE = app.globalData.apiBase;

Page({
  data: {
    tab: 'overview',   // overview | robots | progress | materials | request
    loading: false,
    overviewData: null,
    robotsData: null,
    progressData: null,
    materialsData: null,
    // 汇报表单
    reportRobot: 'R1',
    reportStage: '居住舱',
    reportProgress: '',
    reportMsg: '',
    // 申请表单
    reqRobot: 'R1',
    reqMaterial: '',
    reqAmount: '',
    reqReason: '',
    // 补给表单
    supplyMaterial: '',
    supplyAmount: '',
    // 选择器数据
    robotOptions: ['R1','R2','R3','R4','R5'],
    stageOptions: ['地基','骨架','居住舱','能源系统','生命保障','通信塔'],
    robotIndex: 0,
    stageIndex: 2,
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
      overview:  { q: 'moon',           key: 'overviewData' },
      robots:    { q: 'moon_robots',     key: 'robotsData' },
      progress:  { q: 'moon_progress',   key: 'progressData' },
      materials: { q: 'moon_materials',  key: 'materialsData' },
    };
    const cfg = map[tab];
    if (!cfg) return;
    if (this.data[cfg.key]) return;  // 已有数据
    this.fetchQuery(cfg.q, cfg.key);
  },

  fetchQuery(q, stateKey) {
    this.setData({ loading: true });
    wx.request({
      url: `${BASE}?query=${encodeURIComponent(q)}`,
      success: (res) => {
        let data = res.data;
        // 将 stages 对象转成数组，方便 wx:for
        if (stateKey === 'progressData' && data.stages) {
          data.stagesList = Object.entries(data.stages).map(([key, val]) => ({ ...val, key }));
        }
        // 将 inventory 对象转成数组
        if (stateKey === 'materialsData' && data.inventory) {
          data.inventoryList = Object.values(data.inventory);
        }
        this.setData({ [stateKey]: data, loading: false });
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'error' });
        this.setData({ loading: false });
      },
    });
  },

  onRefresh() {
    const tab = this.data.tab;
    const keyMap = { overview:'overviewData', robots:'robotsData', progress:'progressData', materials:'materialsData' };
    if (keyMap[tab]) {
      this.setData({ [keyMap[tab]]: null });
      this.loadTab(tab);
    }
  },

  // ── 选择器 ──
  onRobotChange(e) {
    const idx = e.detail.value;
    this.setData({ robotIndex: idx, reportRobot: this.data.robotOptions[idx], reqRobot: this.data.robotOptions[idx] });
  },
  onStageChange(e) {
    const idx = e.detail.value;
    this.setData({ stageIndex: idx, reportStage: this.data.stageOptions[idx] });
  },

  // ── 汇报进度 ──
  onReportProgress(e) { this.setData({ reportProgress: e.detail.value }); },
  onReportMsg(e)      { this.setData({ reportMsg: e.detail.value }); },

  submitReport() {
    const { reportRobot, reportStage, reportProgress, reportMsg } = this.data;
    const prog = parseInt(reportProgress);
    if (isNaN(prog) || prog < 0 || prog > 100) {
      wx.showToast({ title: '进度必须是 0~100', icon: 'error' }); return;
    }
    this.setData({ loading: true });
    wx.request({
      url: `${BASE}?action=moon_report&robot=${reportRobot}&stage=${encodeURIComponent(reportStage)}&progress=${prog}&msg=${encodeURIComponent(reportMsg || '进度更新')}`,
      success: (r) => {
        const d = r.data;
        wx.showToast({ title: d.success ? '汇报成功' : '操作失败', icon: d.success ? 'success' : 'error' });
        this.setData({ loading: false, progressData: null, overviewData: null, reportProgress: '', reportMsg: '' });
        setTimeout(() => {
          this.fetchQuery('moon_progress', 'progressData');
          this.fetchQuery('moon', 'overviewData');
        }, 500);
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'error' });
        this.setData({ loading: false });
      },
    });
  },

  // ── 申请材料 ──
  onReqMaterial(e) { this.setData({ reqMaterial: e.detail.value }); },
  onReqAmount(e)   { this.setData({ reqAmount: e.detail.value }); },
  onReqReason(e)   { this.setData({ reqReason: e.detail.value }); },

  submitRequest() {
    const { reqRobot, reqMaterial, reqAmount, reqReason } = this.data;
    if (!reqMaterial.trim()) { wx.showToast({ title: '请填写材料名', icon: 'error' }); return; }
    const amt = parseInt(reqAmount);
    if (isNaN(amt) || amt <= 0) { wx.showToast({ title: '数量必须是正整数', icon: 'error' }); return; }
    this.setData({ loading: true });
    wx.request({
      url: `${BASE}?action=moon_request&robot=${reqRobot}&material=${encodeURIComponent(reqMaterial)}&amount=${amt}&reason=${encodeURIComponent(reqReason || '建造任务需要')}`,
      success: (r) => {
        const d = r.data;
        if (d.success) {
          wx.showModal({
            title: '📦 申请已提交',
            content: `${d.message}\n\n${d.tip || ''}`,
            showCancel: false,
          });
          this.setData({ materialsData: null, reqMaterial: '', reqAmount: '', reqReason: '' });
        } else {
          wx.showToast({ title: d.message || '失败', icon: 'error' });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'error' });
        this.setData({ loading: false });
      },
    });
  },

  // ── 批准补给 ──
  onSupplyMaterial(e) { this.setData({ supplyMaterial: e.detail.value }); },
  onSupplyAmount(e)   { this.setData({ supplyAmount: e.detail.value }); },

  sendSupply() {
    const { supplyMaterial, supplyAmount } = this.data;
    if (!supplyMaterial.trim()) { wx.showToast({ title: '请填写材料名', icon: 'error' }); return; }
    const amt = parseInt(supplyAmount);
    if (isNaN(amt) || amt <= 0) { wx.showToast({ title: '数量必须是正整数', icon: 'error' }); return; }
    wx.showModal({
      title: '🚀 确认发送补给',
      content: `发送 ${supplyMaterial} × ${amt} 到月球基地？`,
      confirmColor: '#b47fff',
      success: (res) => {
        if (res.confirm) {
          this.setData({ loading: true });
          wx.request({
            url: `${BASE}?action=moon_supply&material=${encodeURIComponent(supplyMaterial)}&amount=${amt}`,
            success: (r) => {
              wx.showModal({
                title: '🚀 补给已发射',
                content: r.data.message,
                showCancel: false,
              });
              this.setData({ materialsData: null, overviewData: null, supplyMaterial: '', supplyAmount: '', loading: false });
              setTimeout(() => {
                this.fetchQuery('moon_materials', 'materialsData');
                this.fetchQuery('moon', 'overviewData');
              }, 500);
            },
            fail: () => {
              wx.showToast({ title: '请求失败', icon: 'error' });
              this.setData({ loading: false });
            },
          });
        }
      },
    });
  },

  // 快速补给（点材料卡上的按钮）
  quickSupply(e) {
    this.setData({
      tab: 'request',
      supplyMaterial: e.currentTarget.dataset.name,
    });
  },
});
