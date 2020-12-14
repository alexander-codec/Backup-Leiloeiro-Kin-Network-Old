import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Leiloes from '@/components/Leiloes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
  	},
	{
      path: '/leiloes',
      name: 'Leiloes',
      component: Leiloes
  	}
  ]
})
