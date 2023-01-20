import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Users',
    to: "/users",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/login',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
]

export default _nav
