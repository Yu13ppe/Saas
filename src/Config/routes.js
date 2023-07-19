import {Login} from '../Pages/Login'
import {Inventario} from '../Pages/Inventario'

const routes = [
  {
    title: 'Inventario',
    path: '/Inventario',
    component: Inventario,
  },
  {
    title: 'Login',
    path: '/',
    component: Login,
  },
]

export default routes;