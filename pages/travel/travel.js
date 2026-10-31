Page({
  data: {
    searchKeyword: '',
    selectedDays: 'all',
    refreshing: false,
    travelList: []
  },

  onLoad(options) {
    this.loadTravels()
  },

  loadTravels() {
    // Mock数据
    const travels = [
      {
        id: 't_5001',
        title: '山海慢行·茶旅',
        days: 3,
        city: '杭州',
        priceFrom: 1999,
        highlights: '茶山采制+书院夜读',
        tags: ['小团', '深度']
      },
      {
        id: 't_5002',
        title: '古韵江南·书法行',
        days: 2,
        city: '苏州',
        priceFrom: 1299,
        highlights: '园林写生+名师指导',
        tags: ['文化', '体验']
      },
      {
        id: 't_5003',
        title: '禅意之旅·七日',
        days: 7,
        city: '五台山',
        priceFrom: 3999,
        highlights: '禅修+茶道+书法',
        tags: ['深度', '禅修']
      }
    ]

    let filtered = travels

    // 筛选天数
    if (this.data.selectedDays !== 'all') {
      if (this.data.selectedDays === '1-2') {
        filtered = filtered.filter(t => t.days <= 2)
      } else if (this.data.selectedDays === '3-5') {
        filtered = filtered.filter(t => t.days >= 3 && t.days <= 5)
      } else if (this.data.selectedDays === '7+') {
        filtered = filtered.filter(t => t.days >= 7)
      }
    }

    // 搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase()
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(keyword) ||
        t.city.toLowerCase().includes(keyword)
      )
    }

    this.setData({ travelList: filtered })
  },

  selectDays(e) {
    const days = e.currentTarget.dataset.days
    this.setData({ selectedDays: days })
    this.loadTravels()
  },

  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.loadTravels()
    }, 300)
  },

  onRefresh() {
    this.setData({ refreshing: true })
    this.loadTravels()
    setTimeout(() => {
      this.setData({ refreshing: false })
    }, 500)
  },

  showDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.showModal({
      title: item.title,
      content: `${item.highlights}\n${item.days}天 · ${item.city}\n参考价：¥${item.priceFrom}起`,
      showCancel: false,
      confirmText: '知道了'
    })
  },

  goToCustom() {
    wx.navigateTo({
      url: '/pages/custom/custom?from=travel&type=travel'
    })
  }
})
