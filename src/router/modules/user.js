import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/dashboard',
  name: 'User',
  meta: {
    title: '用户画像',
    icon: 'user'
  },
  children: [
    {
      path: 'base',
      name: 'User_Base',
      component: () => import('@/views/user/base'),
      meta: { title: '基本情况' }
    },
    {
      path: 'topic',
      name: 'User_Topic',
      component: () => import('@/views/user/topic'),
      meta: { title: '相关议题' }
    },
    {
      path: 'group',
      name: 'User_Group',
      component: () => import('@/views/user/group'),
      meta: { title: '群体关系' }
    }
  ]
}

export default userRouter
