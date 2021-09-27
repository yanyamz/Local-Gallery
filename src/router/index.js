import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Gallery from '@/views/Gallery'

const requireAuth = (to, from, next) => {
	if (localStorage.getItem('isAuth') === 'false') {
		next({ name: 'Home' })
	} else {
		next()
	}
}

const requireNoAuth = (to, from, next) => {
	if (localStorage.getItem('isAuth') === 'true') {
		next({ name: 'Gallery' })
	} else {
		next()
	}
}

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		beforeEnter: requireNoAuth,
	},
	{
		path: '/gallery',
		name: 'Gallery',
		component: Gallery,
		beforeEnter: requireAuth,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
