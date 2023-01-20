import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tickets = React.lazy(() => import('./views/Tickets'))
const TicketsReply = React.lazy(() => import('./views/TicketsReply'))
const BypassPayment = React.lazy(() => import('./views/ByPassPayment'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'tickets', element: Tickets },
  { path: '/raised-ticket', name: 'raisedTicket', element: TicketsReply },
  { path: '/Bypass-payment', name: 'bypass-payment', element: BypassPayment },
]

export default routes
