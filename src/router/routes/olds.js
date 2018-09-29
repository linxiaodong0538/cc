export default {
  path: 'olds',
  component: resolve => require(['@/pages/Olds'], resolve),
  children: [
    {
      path: 'trends',
      component: resolve => require(['@/pages/Olds/Trends'], resolve)
    },
    {
      path: 'data',
      component: resolve => require(['@/pages/Olds/Data'], resolve)
    }
  ]
}
