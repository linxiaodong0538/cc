export default {
  path: 'staffs/:alias',
  component: resolve => require(['@/pages/Staffs'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/pages/Staffs/List'], resolve)
    },
    {
      path: 'details/:id/:whose?',
      component: resolve => require(['@/pages/Staffs/Details'], resolve)
    }
  ]
}
