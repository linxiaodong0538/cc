export default {
  path: 'products/:alias',
  component: resolve => require(['@/pages/Products'], resolve),
  children: [
    {
      path: 'list/:categoryId',
      component: resolve => require(['@/pages/Products/List'], resolve)
    },
    {
      path: 'details/:id',
      component: resolve => require(['@/pages/Products/Details'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/pages/Categories/List'], resolve)
    }
  ]
}
