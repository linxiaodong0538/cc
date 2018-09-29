export default {
  path: 'my',
  component: resolve => require(['@/pages/My'], resolve),
  children: [
    {
      path: 'home',
      component: resolve => require(['@/pages/My/Home'], resolve)
    },
    {
      path: 'messages',
      component: resolve => require(['@/pages/My/Messages'], resolve)
    }
  ]
}
