const app = getApp()

Page({
  data: {
    activeTab: 'works',
    refreshing: false,
    worksList: [],
    auctionList: []
  },

  onLoad(options) {
    // 读取全局默认Tab或URL参数
    if (app.globalData.defaultDiscoverTab) {
      this.setData({ activeTab: app.globalData.defaultDiscoverTab })
      app.globalData.defaultDiscoverTab = null
    } else if (options.tab) {
      this.setData({ activeTab: options.tab })
    }
    this.loadData()
  },

  loadData() {
    this.loadWorks()
    this.loadAuctions()
  },

  loadWorks() {
    // 从storage读取
    let works = wx.getStorageSync('works') || []
    if (works.length === 0) {
      // 初始mock数据
      works = [
        {
          id: 'w_3001',
          title: '墨韵·山居',
          author: '学员A',
          votes: 128,
          voted: false
        },
        {
          id: 'w_3002',
          title: '茶香四溢',
          author: '学员B',
          votes: 95,
          voted: false
        }
      ]
      wx.setStorageSync('works', works)
    }
    this.setData({ worksList: works })
  },

  loadAuctions() {
    const auctions = [
      {
        id: 'a_4001',
        title: '公益拍卖：手作花器',
        currentPrice: 520,
        endTime: '2026-02-10 21:00',
        status: 'live'
      },
      {
        id: 'a_4002',
        title: '公益拍卖：书法作品',
        currentPrice: 380,
        endTime: '2026-02-12 20:00',
        status: 'live'
      },
      {
        id: 'a_4003',
        title: '公益拍卖：茶具套装',
        currentPrice: 0,
        endTime: '2026-02-15 19:00',
        status: 'upcoming'
      }
    ]
    this.setData({ auctionList: auctions })
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  goToSubmit() {
    wx.navigateTo({
      url: '/pages/work-submit/work-submit?from=discover'
    })
  },

  voteWork(e) {
    const work = e.currentTarget.dataset.work
    // 检查今日投票次数
    const today = new Date().toDateString()
    const voteKey = `votes_${today}`
    let voteCount = wx.getStorageSync(voteKey) || 0
    const maxVotes = 3 // 每天最多3次

    if (voteCount >= maxVotes) {
      wx.showToast({
        title: '今日投票次数已用完',
        icon: 'none'
      })
      return
    }

    // 更新票数
    let works = this.data.worksList
    const index = works.findIndex(w => w.id === work.id)
    if (index !== -1) {
      works[index].votes += 1
      works[index].voted = true
      voteCount += 1
      wx.setStorageSync(voteKey, voteCount)
      wx.setStorageSync('works', works)
      this.setData({ worksList: works })
      wx.showToast({
        title: '投票成功',
        icon: 'success'
      })
    }
  },

  goToAuctionDetail(e) {
    const auction = e.currentTarget.dataset.auction
    wx.navigateTo({
      url: `/pages/auction-detail/auction-detail?auctionId=${auction.id}`
    })
  },

  onRefresh() {
    this.setData({ refreshing: true })
    this.loadData()
    setTimeout(() => {
      this.setData({ refreshing: false })
    }, 500)
  }
})
