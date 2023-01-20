import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserList = React.lazy(() => import('./views/Tickets'))
const TicketsReply = React.lazy(() => import('./views/TicketsReply'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'tickets', element: UserList },
  { path: '/raised-ticket', name: 'raisedTicket', element: TicketsReply }
]

export default routes
