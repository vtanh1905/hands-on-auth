import React from 'react'
import Home from './pages/Home'
import Registry from './pages/Registry'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'

export default [
  {
    path: '/',
    component: <Home />
  },
  {
    path: '/registry',
    component: <Registry />,
    authenticate: {
      mustLogin: false
    }
  },
  {
    path: '/dashboard',
    component: <Dashboard />,
    authenticate: {
      mustLogin: true
    }
  },
  {
    path: '*',
    component: <NotFound />
  }
]
