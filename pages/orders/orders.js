Page({
  data: {
    activeTab: 'all',
    orderList: [],
    filteredList: []
  },

  onShow() {
    this.loadOrders()
  },

  loadOrders() {
    const orders = wx.getStorageSync('orders') || []
    this.setData({ orderList: orders })
    this.filterOrders()
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    this.filterOrders()
  },

  filterOrders() {
    const { activeTab, orderList } = this.data
    let filtered = orderList
    if (activeTab !== 'all') {
      filtered = orderList.filter(o => o.status === activeTab)
    }
    this.setData({ filteredList: filtered })
  },

  cancelOrder(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定取消此订单？',
      success: (res) => {
        if (res.confirm) {
          let orders = this.data.orderList
          const idx = orders.findIndex(o => o.id === orderId)
          if (idx !== -1) {
            orders[idx].status = 'cancelled'
            wx.setStorageSync('orders', orders)
            this.setData({ orderList: orders })
            this.filterOrders()
            wx.showToast({ title: '已取消', icon: 'success' })
          }
        }
      }
    })
  },

  confirmReceive(e) {
    const orderId = e.currentTarget.dataset.id
    let orders = this.data.orderList
    const idx = orders.findIndex(o => o.id === orderId)
    if (idx !== -1) {
      orders[idx].status = 'completed'
      wx.setStorageSync('orders', orders)
      this.setData({ orderList: orders })
      this.filterOrders()
      wx.showToast({ title: '已确认收货', icon: 'success' })
    }
  },

  payOrder(e) {
    const orderId = e.currentTarget.dataset.id
    let orders = this.data.orderList
    const idx = orders.findIndex(o => o.id === orderId)
    if (idx !== -1) {
      orders[idx].status = 'paid'
      wx.setStorageSync('orders', orders)
      this.setData({ orderList: orders })
      this.filterOrders()
      wx.showToast({ title: '支付成功', icon: 'success' })
    }
  },

  deleteOrder(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定删除此订单？',
      success: (res) => {
        if (res.confirm) {
          let orders = this.data.orderList.filter(o => o.id !== orderId)
          wx.setStorageSync('orders', orders)
          this.setData({ orderList: orders })
          this.filterOrders()
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  goShopping() {
    wx.switchTab({ url: '/pages/shop/shop' })
  }
})
