import { createRouter, createWebHistory } from 'vue-router'
import DownloadView from '../views/DownloadView.vue'
import UploadView from '../views/UploadView.vue'
import ScenariosView from '../views/ScenariosView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'download',
      component: DownloadView,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
    },
    {
      path: '/scenarios',
      name: 'scenarios',
      component: ScenariosView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
})

export default router
