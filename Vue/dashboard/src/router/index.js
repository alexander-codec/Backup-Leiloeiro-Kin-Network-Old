import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Leiloes from '@/components/Leiloes'
import Preferencias from '@/components/Preferencias'
import Lances from '@/components/Lances'
import Estatisticas from '@/components/Estatisticas'
import Novo from '@/components/Novo'
import Editar from '@/components/Editar'

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
    },
    {
      path: '/preferencias',
      name: 'Preferencias',
      component: Preferencias
  	},
  	{
      path: '/lances',
      name: 'Lances',
      component: Lances
  	},
  	{
      path: '/estatisticas',
      name: 'Estatisticas',
      component: Estatisticas
  	},
  	{
      path: '/novo',
      name: 'Novo',
      component: Novo
  	},
	{
      path: '/editar',
      name: 'Editar',
      component: Editar
  	}
  ]
})
