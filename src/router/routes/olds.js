export default {
  path: 'olds/:alias',
  component: resolve => require(['@/pages/Olds'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/pages/Olds/List'], resolve)
    },
    {
      path: 'details/:id',
      component: resolve => require(['@/pages/Olds/Details'], resolve)
    }
  ]
}
