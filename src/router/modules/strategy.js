import Layout from '@/layout'

const strategyRouter = {
  path: '/strategy',
  component: Layout,
  redirect: '/dashboard',
  name: 'Strategy',
  meta: {
    title: '策略推荐',
    icon: 'form'
  },
  children: [
    {
      path: 'recommend',
      component: () => import('@/views/strategy/recommend'), // Parent router-view
      name: 'Strategy_Recommend',
      meta: { title: '推荐策略' }
    },
    {
      path: '',
      component: () => import('@/views/strategy/library'),
      name: 'Strategy_Library',
      meta: { title: '策略库' }
    }
  ]
}

export default strategyRouter
