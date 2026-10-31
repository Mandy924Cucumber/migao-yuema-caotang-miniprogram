Page({
  data: {
    loading: false,
    refreshing: false,
    searchKeyword: '',
    selectedCategory: 'all',
    productList: [],
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadProducts()
  },

  loadProducts(reset = false) {
    if (reset) {
      this.setData({ page: 1, productList: [], hasMore: true })
    }

    const mockProducts = this.getMockProducts()
    let filtered = mockProducts

    // 筛选品类
    if (this.data.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.data.selectedCategory)
    }

    // 搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(keyword) ||
        p.brand.toLowerCase().includes(keyword)
      )
    }

    const start = (this.data.page - 1) * this.data.pageSize
    const end = start + this.data.pageSize
    const pageData = filtered.slice(start, end)

    this.setData({
      productList: reset ? pageData : [...this.data.productList, ...pageData],
      hasMore: end < filtered.length,
      loading: false,
      refreshing: false
    })
  },

  getMockProducts() {
    return [
      {
        id: 'p_2001',
        category: 'zhubingren',
        title: '朱炳仁铜·莲纹香插',
        price: 399,
        brand: '朱炳仁铜',
        stock: 8,
        imageUrl: '/assets/image/xiangcha.png'
      },
      {
        id: 'p_2002',
        category: 'wenchuang',
        title: '阅马草堂·书签套装',
        price: 88,
        brand: '阅马草堂',
        stock: 20,
        imageUrl: '/assets/image/shujian.png'
      },
      {
        id: 'p_2003',
        category: 'huangyulong',
        title: '黄玉龙·山水小品',
        price: 1280,
        brand: '黄玉龙作品',
        stock: 3,
        imageUrl: '/assets/image/shanshui.png'
      },
      {
        id: 'p_2004',
        category: 'taohuantang',
        title: '淘换堂·老物件',
        price: 520,
        brand: '淘换堂',
        stock: 5,
        imageUrl: '/assets/image/laowujian.png'
      },
      {
        id: 'p_2005',
        category: 'zhubingren',
        title: '朱炳仁铜·茶具套装',
        price: 899,
        brand: '朱炳仁铜',
        stock: 6,
        imageUrl: '/assets/image/chaju.png'
      },
      {
        id: 'p_2006',
        category: 'wenchuang',
        title: '阅马草堂·文房四宝',
        price: 299,
        brand: '阅马草堂',
        stock: 15,
        imageUrl: '/assets/image/wenfang.png'
      }
    ]
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ selectedCategory: category })
    this.loadProducts(true)
  },

  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.loadProducts(true)
    }, 300)
  },

  onRefresh() {
    this.setData({ refreshing: true })
    this.loadProducts(true)
  },

  onLoadMore() {
    if (!this.data.hasMore || this.data.loading) return
    this.setData({ 
      page: this.data.page + 1,
      loading: true
    })
    this.loadProducts()
  },

  goToDetail(e) {
    const product = e.currentTarget.dataset.product
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?productId=${product.id}`
    })
  }
})
