import Layout from '@/layout'

const spreadRouter = {
  path: '/spread',
  component: Layout,
  redirect: '/spread/event',
  name: 'Spread',
  meta: {
    title: '传播分析',
    icon: 'drag'
  },
  children: [
    {
      path: 'event',
      component: () => import('@/views/spread/event'), // Parent router-view
      name: 'Event',
      meta: { title: '事件传播' }
    },
    {
      path: 'strategy',
      name: 'Strategy',
      component: () => import('@/views/spread/strategy'),
      meta: { title: '影响策略' }
    }
  ]
}

export default spreadRouter
