export default {
  path: 'cars/:alias',
  component: resolve => require(['@/pages/Cars'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/pages/Cars/List'], resolve)
    },
    {
      path: 'details/:id',
      component: resolve => require(['@/pages/Cars/Details'], resolve)
    },
    {
      path: 'breakdowns/form/:carId',
      component: resolve => require(['@/pages/Cars/Breakdowns/Form'], resolve)
    },
    {
      path: 'breakdowns/list/:carId',
      component: resolve => require(['@/pages/Cars/Breakdowns/List'], resolve)
    },
    {
      path: 'breakdowns/details/:id',
      component: resolve => require(['@/pages/Cars/Breakdowns/Details'], resolve)
    },
    {
      path: 'trips/form/:carId',
      component: resolve => require(['@/pages/Cars/Trips/Form'], resolve)
    },
    {
      path: 'trips/list/:carId',
      component: resolve => require(['@/pages/Cars/Trips/List'], resolve)
    },
    {
      path: 'trips/details/:id',
      component: resolve => require(['@/pages/Cars/Trips/Details'], resolve)
    }
  ]
}
