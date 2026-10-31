Page({
  data: {
    cartList: [],
    selectAll: true,
    totalPrice: 0,
    totalCount: 0
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    let cart = wx.getStorageSync('cart') || []
    cart = cart.map(item => ({
      ...item,
      selected: item.selected !== false
    }))
    this.setData({ cartList: cart })
    this.calcTotal()
  },

  toggleSelect(e) {
    const index = e.currentTarget.dataset.index
    const key = `cartList[${index}].selected`
    const val = !this.data.cartList[index].selected
    this.setData({ [key]: val })
    this.syncStorage()
    this.calcTotal()
  },

  toggleSelectAll() {
    const selectAll = !this.data.selectAll
    const cartList = this.data.cartList.map(item => ({
      ...item,
      selected: selectAll
    }))
    this.setData({ selectAll, cartList })
    this.syncStorage()
    this.calcTotal()
  },

  changeQuantity(e) {
    const { index, delta } = e.currentTarget.dataset
    const item = this.data.cartList[index]
    const newQty = item.quantity + delta
    if (newQty < 1) {
      this.removeItem(index)
      return
    }
    const key = `cartList[${index}].quantity`
    this.setData({ [key]: newQty })
    this.syncStorage()
    this.calcTotal()
  },

  removeItem(index) {
    wx.showModal({
      title: '提示',
      content: '确定移除该商品？',
      success: (res) => {
        if (res.confirm) {
          const cartList = this.data.cartList
          cartList.splice(index, 1)
          this.setData({ cartList })
          this.syncStorage()
          this.calcTotal()
        }
      }
    })
  },

  handleRemove(e) {
    const index = e.currentTarget.dataset.index
    this.removeItem(index)
  },

  calcTotal() {
    const selected = this.data.cartList.filter(item => item.selected)
    const totalPrice = selected.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalCount = selected.reduce((sum, item) => sum + item.quantity, 0)
    const selectAll = this.data.cartList.length > 0 && this.data.cartList.every(item => item.selected)
    this.setData({ totalPrice, totalCount, selectAll })
  },

  syncStorage() {
    wx.setStorageSync('cart', this.data.cartList)
  },

  checkout() {
    const selected = this.data.cartList.filter(item => item.selected)
    if (selected.length === 0) {
      wx.showToast({ title: '请选择商品', icon: 'none' })
      return
    }

    let orders = wx.getStorageSync('orders') || []
    selected.forEach(item => {
      orders.unshift({
        id: 'o_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        productId: item.id,
        title: item.title,
        price: item.price,
        brand: item.brand,
        quantity: item.quantity,
        status: 'paid',
        createdAt: new Date().toLocaleString('zh-CN')
      })
    })
    wx.setStorageSync('orders', orders)

    const remaining = this.data.cartList.filter(item => !item.selected)
    wx.setStorageSync('cart', remaining)

    wx.showToast({ title: '下单成功', icon: 'success' })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/orders/orders' })
    }, 1200)
  },

  goShopping() {
    wx.switchTab({ url: '/pages/shop/shop' })
  }
})
