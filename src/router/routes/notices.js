export default {
  path: 'notices/:alias',
  component: resolve => require(['@/pages/Notices'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/pages/Notices/List'], resolve)
    }
  ]
}
