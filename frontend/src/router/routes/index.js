import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/store'

// ** Merge Routes
const Routes = [
  {
    path: '/store',
    component: lazy(() => import('../../views/Stores/Store'))
  },
  {
    path: '/doctor',
    component: lazy(() => import('../../views/Doctors/Doctors'))
  },
  {
    path: '/centers',
    component: lazy(() => import('../../views/Centers/Center'))
  },
  {
    path: '/customers',
    component: lazy(() => import('../../views/Customers/Customers'))
  },
  {
    path: '/location',
    component: lazy(() => import('../../views/Location/Location'))
  },
  
  {
    path: '/facebook',
    component: lazy(() => import('../../views/Facebook/Facebook'))
  },
  {
    path: '/orderoflawyers',
    component: lazy(() => import('../../views/OrderOfLawyers/OrderOfLawyers'))
  },
  {
    path: '/orderofengineers',
    component: lazy(() => import('../../views/OrderOfEngineers/OrderOfEngineers'))
  },
  {
    path: '/orderofdoctors',
    component: lazy(() => import('../../views/OrderOfDoctors/OrderOfDoctors'))
  },
  {
    path: '/Calender',
    component: lazy(() => import('../../views/Calender/Calender'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
