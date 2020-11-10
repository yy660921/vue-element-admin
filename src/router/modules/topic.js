import Layout from '@/layout'

const topicRouter = {
  path: '/topic',
  component: Layout,
  redirect: '/dashboard',
  name: 'Topic',
  meta: {
    title: '议题画像',
    icon: 'message'
  },
  children: [
    {
      path: 'base',
      component: () => import('@/views/topic/base'), // Parent router-view
      name: 'Topic_Base',
      meta: { title: '基本情况' }
    },
    {
      path: 'topic',
      component: () => import('@/views/topic/topic'), // Parent router-view
      name: 'Topic_Topic',
      meta: { title: '相关话题' }
    },
    {
      path: 'user',
      component: () => import('@/views/topic/user'), // Parent router-view
      name: 'Topic_User',
      meta: { title: '关键用户' }
    },
    {
      path: 'spread',
      component: () => import('@/views/topic/spread'), // Parent router-view
      name: 'Topic_Spread',
      meta: { title: '扩散传播' }
    },
    {
      path: 'strategy',
      component: () => import('@/views/topic/strategy'), // Parent router-view
      name: 'Topic_Strategy',
      meta: { title: '推荐策略' }
    }
  ]
}

export default topicRouter
