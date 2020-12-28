import Layout from '@/layout'

const backgroundRouter = {
  path: '/background',
  component: Layout,
  redirect: '/dashboard',
  name: 'Background',
  meta: {
    title: '社会背景',
    icon: 'education'
  },
  children: [
    {
      path: 'base',
      component: () => import('@/views/topic/base'), // Parent router-view
      name: 'Background_Base',
      meta: { title: '基本情况' }
    },
    {
      path: 'topic',
      component: () => import('@/views/topic/topic'), // Parent router-view
      name: 'Background_Topic',
      meta: { title: '相关话题' }
    },
    {
      path: 'user',
      component: () => import('@/views/topic/user'), // Parent router-view
      name: 'Background_User',
      meta: { title: '关键用户' }
    }
  ]
}

export default backgroundRouter
