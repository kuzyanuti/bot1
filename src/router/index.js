import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UpgradeView from '../views/UpgradeView.vue'
import ShopView from '../views/ShopView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: () =>
                import ('../views/TasksView.vue'),
        },
        {
            path: '/shop',
            name: 'shop',
            component: ShopView,
        },
        {
            path: '/shield',
            name: 'shield',
            component: () =>
                import ('../views/ClanView.vue'),
        },
        {
            path: '/friends',
            name: 'friends',
            component: () =>
                import ('../views/FriendsView.vue'),
        },
        {
            path: '/upgrades',
            name: 'upgrades',
            component: UpgradeView,
        },
    ],
})

export default router