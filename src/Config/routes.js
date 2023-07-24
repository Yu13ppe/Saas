import {Login} from '../Pages/Login'
import {Inventario} from '../Pages/Inventario'
import {CreateProduct} from '../Pages/CreateProduct'
import { BuyProduct } from '../Pages/BuyProduct'
import { InventarioG } from '../Pages/Inventario-G'


const routes = [
  {
    title: 'InventarioG',
    path: '/InventarioG',
    component: InventarioG,
  },
  {
    title: 'BuyProduct',
    path: '/BuyProduct',
    component: BuyProduct,
  },
  {
    title: 'CreateProduct',
    path: '/CreateProduct',
    component: CreateProduct,
  },
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