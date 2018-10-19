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
    },
    {
      path: 'comments',
      component: resolve => require(['@/pages/My/Comments'], resolve)
    },
    {
      path: 'feedback',
      component: resolve => require(['@/pages/My/Feedback'], resolve)
    },
    {
      path: 'contact',
      component: resolve => require(['@/pages/My/Contact'], resolve)
    }
  ]
}
