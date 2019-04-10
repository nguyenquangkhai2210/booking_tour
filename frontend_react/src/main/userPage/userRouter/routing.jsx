import ViewProfile from '../components/ViewProfile.jsx';
import ListOrder from '../components/ListOrder.jsx';
import OrderDetail from '../components/OrderDetail.jsx';


const ThemeRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    icon: 'mdi mdi-comment-processing-outline',
    component: ViewProfile
  },
  {
    path: '/orderDetail/:id',
    name: 'OrderDetail',
    icon: 'mdi mdi-arrange-send-backward',
    component: OrderDetail
  },
  {
    path: '/listOrder',
    name: 'History order',
    icon: 'mdi mdi-toggle-switch',
    component: ListOrder
  },
  { path: '/', pathTo: '/listOrder', name: 'History order', redirect: true }
];

export default ThemeRoutes;
