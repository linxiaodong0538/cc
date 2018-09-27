export default {
  path: 'families/:alias',
  component: resolve => require(['@/pages/Families'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/pages/Families/List'], resolve)
    },
    {
      path: 'details/:id',
      component: resolve => require(['@/pages/Families/Details'], resolve)
    }
  ]
}
