/**
 * 课程 Mock 数据，供课程列表、课程详情、报名页共用
 */
function getMockCourses() {
  return [
    {
      id: 'c_1001',
      type: 'public',
      title: '大咖公益课：茶与修心',
      teacher: '特邀讲师',
      date: '2026-02-08',
      time: '14:00-16:00',
      location: '阅马草堂·主厅',
      capacity: 60,
      remaining: 12,
      price: 0,
      deposit: 99,
      intro: '以茶入道，观心见性。',
      rules: ['报名预收押金，到场核销后原路退还', '名额有限，逾期视为未到场（规则二期配置）']
    },
    {
      id: 'c_1002',
      type: 'regular',
      title: '书法入门：楷书基础',
      teacher: '张老师',
      date: '2026-02-10',
      time: '10:00-12:00',
      location: '阅马草堂·书法室',
      capacity: 20,
      remaining: 5,
      price: 299,
      deposit: undefined,
      intro: '从笔画到结构，零基础入门。',
      rules: ['报名后不可退款', '请准时参加']
    },
    {
      id: 'c_1003',
      type: 'trial',
      title: '体验课：花艺入门',
      teacher: '李老师',
      date: '2026-02-12',
      time: '15:00-17:00',
      location: '阅马草堂·花艺室',
      capacity: 15,
      remaining: 8,
      price: 99,
      deposit: undefined,
      intro: '体验插花与花道基础。',
      rules: ['体验课仅限首次报名']
    },
    {
      id: 'c_1004',
      type: 'regular',
      title: '茶会：品茗论道',
      teacher: '王老师',
      date: '2026-02-15',
      time: '19:00-21:00',
      location: '阅马草堂·茶室',
      capacity: 12,
      remaining: 3,
      price: 199,
      deposit: undefined,
      intro: '品茗论道，以茶会友。',
      rules: ['报名后不可退款', '请准时参加']
    },
    {
      id: 'c_1005',
      type: 'public',
      title: '大咖公益课：国画赏析',
      teacher: '特邀讲师',
      date: '2026-02-18',
      time: '14:00-16:00',
      location: '阅马草堂·主厅',
      capacity: 50,
      remaining: 20,
      price: 0,
      deposit: 99,
      intro: '国画赏析与笔墨体验。',
      rules: ['报名预收押金，到场核销后原路退还', '名额有限']
    }
  ]
}

function getCourseById(courseId) {
  const list = getMockCourses()
  return list.find(c => c.id === courseId) || null
}

module.exports = {
  getMockCourses,
  getCourseById
}
