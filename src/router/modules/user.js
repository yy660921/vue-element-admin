import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/graph',
  name: 'User',
  meta: {
    title: '用户分析',
    icon: 'user'
  },
  children: [
    {
      path: 'graph',
      component: () => import('@/views/user/graph'), // Parent router-view
      name: 'Graph',
      meta: { title: '用户画像' }
    },
    {
      path: 'group',
      name: 'Group',
      component: () => import('@/views/user/group'),
      meta: { title: '社群检测' }
    },
    {
      path: 'search',
      name: 'Search',
      component: () => import('@/views/user/search'),
      meta: { title: '关联检索' }
    }
  ]
}

export default userRouter
