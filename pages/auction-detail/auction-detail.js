Page({
  data: {
    auctionId: '',
    auctionDetail: {},
    isDeposited: false,
    payingDeposit: false,
    bidAmount: '',
    bidRecords: [],
    countdown: '',
    timer: null
  },

  onLoad(options) {
    const { auctionId } = options
    if (!auctionId) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      return
    }
    this.setData({ auctionId })
    this.loadDetail()
    this.startCountdown()
  },

  onUnload() {
    // 清理定时器
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
  },

  loadDetail() {
    // Mock数据
    const auctionDetail = {
      id: this.data.auctionId,
      title: '公益拍卖：手作花器',
      currentPrice: 520,
      step: 20,
      deposit: 99,
      endTime: '2026-02-10 21:00',
      status: 'live'
    }
    this.setData({ auctionDetail })
    this.loadBidRecords()
  },

  loadBidRecords() {
    // Mock出价记录
    const records = [
      {
        id: 'b_1',
        userName: '访客',
        amount: 540,
        time: '2026-01-22 10:20'
      },
      {
        id: 'b_2',
        userName: '用户A',
        amount: 520,
        time: '2026-01-22 10:15'
      }
    ]
    this.setData({ bidRecords: records })
  },

  startCountdown() {
    const updateCountdown = () => {
      const endTime = new Date(this.data.auctionDetail.endTime).getTime()
      const now = new Date().getTime()
      const diff = endTime - now

      if (diff <= 0) {
        this.setData({ countdown: '已结束' })
        if (this.data.timer) {
          clearInterval(this.data.timer)
        }
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      let countdown = ''
      if (days > 0) {
        countdown = `${days}天${hours}小时`
      } else if (hours > 0) {
        countdown = `${hours}小时${minutes}分钟`
      } else {
        countdown = `${minutes}分${seconds}秒`
      }

      this.setData({ countdown })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    this.setData({ timer })
  },

  payDeposit() {
    if (this.data.payingDeposit) return
    this.setData({ payingDeposit: true })

    // 模拟支付
    setTimeout(() => {
      this.setData({
        isDeposited: true,
        payingDeposit: false
      })
      wx.showToast({
        title: '保证金缴纳成功',
        icon: 'success'
      })
    }, 1000)
  },

  onBidAmountInput(e) {
    this.setData({ bidAmount: e.detail.value })
  },

  quickBid() {
    const newAmount = this.data.auctionDetail.currentPrice + this.data.auctionDetail.step
    this.setData({ bidAmount: newAmount.toString() })
  },

  submitBid() {
    if (!this.data.isDeposited) {
      wx.showToast({
        title: '请先缴纳保证金',
        icon: 'none'
      })
      return
    }

    const bidAmount = parseFloat(this.data.bidAmount)
    const minBid = this.data.auctionDetail.currentPrice + this.data.auctionDetail.step

    if (!bidAmount || bidAmount < minBid) {
      wx.showToast({
        title: `出价不能低于¥${minBid}`,
        icon: 'none'
      })
      return
    }

    // 更新当前价
    const auctionDetail = { ...this.data.auctionDetail }
    auctionDetail.currentPrice = bidAmount

    // 添加出价记录
    const newRecord = {
      id: 'b_' + Date.now(),
      userName: '访客',
      amount: bidAmount,
      time: new Date().toLocaleString('zh-CN')
    }

    const bidRecords = [newRecord, ...this.data.bidRecords]

    this.setData({
      auctionDetail,
      bidRecords,
      bidAmount: ''
    })

    wx.showToast({
      title: '出价成功',
      icon: 'success'
    })
  }
})
