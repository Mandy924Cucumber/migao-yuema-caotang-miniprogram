Page({
  data: {
    loading: true,
    productId: '',
    productDetail: {}
  },

  onLoad(options) {
    const { productId } = options
    if (!productId) {
      this.setData({ loading: false })
      return
    }
    this.setData({ productId })
    this.loadDetail()
  },

  loadDetail() {
    const pid = this.data.productId
    const detailMap = {
      p_2001: { category: 'zhubingren', title: '朱炳仁铜·莲纹香插', price: 399, brand: '朱炳仁铜', stock: 8, imageUrl: '/assets/image/xiangcha.png', desc: '器物之美，温润有度。', specs: ['默认规格'] },
      p_2002: { category: 'wenchuang', title: '阅马草堂·书签套装', price: 88, brand: '阅马草堂', stock: 20, imageUrl: '/assets/image/shujian.png', desc: '精致书签，伴读好物。', specs: ['套装含4枚'] },
      p_2003: { category: 'huangyulong', title: '黄玉龙·山水小品', price: 1280, brand: '黄玉龙作品', stock: 3, imageUrl: '/assets/image/shanshui.png', desc: '名家手绘山水小品，意境深远，收藏佳品。', specs: ['含收藏证书'] },
      p_2004: { category: 'taohuantang', title: '淘换堂·老物件', price: 520, brand: '淘换堂', stock: 5, imageUrl: '/assets/image/laowujian.png', desc: '年代老物件，岁月沉淀的质感与故事。', specs: ['默认规格'] },
      p_2005: { category: 'zhubingren', title: '朱炳仁铜·茶具套装', price: 899, brand: '朱炳仁铜', stock: 6, imageUrl: '', desc: '铜制茶具套装，匠心独运，品茗雅器。', specs: ['壶×1', '杯×4', '茶盘×1'] },
      p_2006: { category: 'wenchuang', title: '阅马草堂·文房四宝', price: 299, brand: '阅马草堂', stock: 15, imageUrl: '/assets/image/wenfang.png', desc: '笔墨纸砚精选套装，传承文人雅趣。', specs: ['笔', '墨', '纸', '砚'] }
    }
    const base = detailMap[pid]
    if (!base) {
      this.setData({ loading: false, productDetail: {} })
      return
    }
    const mockDetail = { id: pid, ...base }
    setTimeout(() => {
      this.setData({ loading: false, productDetail: mockDetail })
    }, 300)
  },

  addToCart() {
    let cart = wx.getStorageSync('cart') || []
    const existIndex = cart.findIndex(c => c.id === this.data.productDetail.id)
    if (existIndex !== -1) {
      cart[existIndex].quantity += 1
    } else {
      cart.push({
        id: this.data.productDetail.id,
        title: this.data.productDetail.title,
        price: this.data.productDetail.price,
        brand: this.data.productDetail.brand,
        quantity: 1
      })
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },

  buyNow() {
    const p = this.data.productDetail
    wx.showModal({
      title: '确认购买',
      content: `${p.title}\n¥${p.price} × 1`,
      confirmText: '确认支付',
      success: (res) => {
        if (res.confirm) {
          let orders = wx.getStorageSync('orders') || []
          const order = {
            id: 'o_' + Date.now(),
            productId: p.id,
            title: p.title,
            price: p.price,
            brand: p.brand,
            quantity: 1,
            status: 'paid',
            createdAt: new Date().toLocaleString('zh-CN')
          }
          orders.unshift(order)
          wx.setStorageSync('orders', orders)
          wx.showToast({ title: '支付成功', icon: 'success' })
          setTimeout(() => {
            wx.navigateTo({ url: '/pages/orders/orders' })
          }, 1200)
        }
      }
    })
  },

  goBack() {
    wx.navigateBack()
  }
})
