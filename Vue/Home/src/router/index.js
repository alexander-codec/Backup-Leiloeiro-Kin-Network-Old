import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Modalidade from '@/components/Modalidade'
import Categoria from '@/components/Categoria'
import Buscar from '@/components/Buscar'
import Contato from '@/components/Contato'
import Agenda from '@/components/Agenda'
import Conta from '@/components/Conta'
import Leilao from '@/components/Leilao'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/modalidade',
      name: 'Modalidade',
      component: Modalidade
    },
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria
    },
	{
      path: '/buscar',
      name: 'Buscar',
      component: Buscar
  	},
	{
      path: '/contato',
      name: 'Contato',
      component: Contato
  	},
	{
      path: '/agenda',
      name: 'Agenda',
      component: Agenda
  	},
	{
      path: '/conta',
      name: 'Conta',
      component: Conta
  	},
	{
      path: '/leilao',
      name: 'Leilao',
      component: Leilao
  	}
  ]
})
