/**
 * 左侧菜单
 */
export const navigation = [{
  name: '用户管理',
  url: '/user',
  icon: 'icon-star',
  role: 'superadmin'
}, {
  name: '部门管理',
  url: '/department',
  icon: 'icon-star',
  role: 'superadmin'
}, {
  name: '商户管理',
  url: '/shop',
  icon: 'icon-star',
  role: 'admin'
}, {
  name: '产品管理',
  url: '/product',
  icon: 'icon-star',
  role: 'admin'
}
  , {
  name: 'Base',
  url: '/base',
  icon: 'icon-puzzle',
  role: 'admin',
  children: [
    {
      name: 'Cards',
      url: '/base/cards',
      icon: 'icon-puzzle'
    },
    {
      name: 'Carousels',
      url: '/base/carousels',
      icon: 'icon-puzzle'
    }]
}
];
