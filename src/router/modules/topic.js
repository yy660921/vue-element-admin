import Layout from '@/layout'

const topicRouter = {
  path: '/topic',
  component: Layout,
  redirect: '/topic/index',
  name: 'Topic',
  meta: {
    title: '话题分析',
    icon: 'message'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/topic/index'), // Parent router-view
      name: 'Index',
      meta: { title: '事件概览' }
    },
    {
      path: 'feature',
      name: 'Feature',
      component: () => import('@/views/topic/feature'),
      meta: { title: '专题事件' }
    },
    {
      path: 'scene',
      name: 'Scene',
      component: () => import('@/views/topic/scene'),
      meta: { title: '场景事件' }
    },
    {
      path: 'politics',
      name: 'Politics',
      component: () => import('@/views/topic/politics'),
      meta: { title: '政治议题' }
    }
  ]
}

export default topicRouter
