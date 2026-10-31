/**
 * 商品 Mock 数据，供商城列表、商品详情共用
 */
function getMockProducts() {
  return [
    { id: 'p_2001', category: 'zhubingren', title: '朱炳仁铜·莲纹香插', price: 399, brand: '朱炳仁铜', stock: 8, desc: '器物之美，温润有度。', specs: ['默认规格'] },
    { id: 'p_2002', category: 'wenchuang', title: '阅马草堂·书签套装', price: 88, brand: '阅马草堂', stock: 20, desc: '精致书签，伴读好物。', specs: ['套装含4枚'] },
    { id: 'p_2003', category: 'huangyulong', title: '黄玉龙·山水小品', price: 1280, brand: '黄玉龙作品', stock: 3, imageUrl: '/assets/image/shanshui.png', desc: '山水小品，意境悠远。', specs: ['默认规格'] },
    { id: 'p_2004', category: 'taohuantang', title: '淘换堂·老物件', price: 520, brand: '淘换堂', stock: 5, imageUrl: '/assets/image/laowujian.png', desc: '老物件，岁月留痕。', specs: ['单件'] },
    { id: 'p_2005', category: 'zhubingren', title: '朱炳仁铜·茶具套装', price: 899, brand: '朱炳仁铜', stock: 6, imageUrl: '/assets/image/chaju.png', desc: '茶具套装，匠心之选。', specs: ['一壶四杯'] },
    { id: 'p_2006', category: 'wenchuang', title: '阅马草堂·文房四宝', price: 299, brand: '阅马草堂', stock: 15, imageUrl: '/assets/image/wenfang.png', desc: '文房四宝，书写雅趣。', specs: ['笔墨纸砚'] }
  ]
}

function getProductById(productId) {
  const list = getMockProducts()
  return list.find(p => p.id === productId) || null
}

module.exports = {
  getMockProducts,
  getProductById
}
