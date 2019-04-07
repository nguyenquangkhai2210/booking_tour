import ViewProfile from '../components/ViewProfile.jsx';
import CreateTour from '../components/CreateTour.jsx';
import ListTour from '../components/ListTour.jsx';
import UpdateTour from '../components/UpdateTour.jsx';
import ListOrder from '../components/ListOrder.jsx';
import OrderDetail from '../components/OrderDetail.jsx';
import ListCategory from '../components/ListCategory.jsx';
import UpdateCaterogy from '../components/UpdateCaterogy.jsx';

const ThemeRoutes = [
  {
    path: '/profile',
    name: 'Alerts',
    icon: 'mdi mdi-comment-processing-outline',
    component: ViewProfile
  },
  {
    path: '/create',
    name: 'Create Tour',
    icon: 'mdi mdi-arrange-send-backward',
    component: CreateTour
  },
  {
    path: '/listTour',
    name: 'List Tour',
    icon: 'mdi mdi-toggle-switch',
    component: ListTour
  },
  {
    path: '/updateTour/:id',
    name: 'Cards',
    icon: 'mdi mdi-credit-card-multiple',
    component: UpdateTour
  },
  {
    path: '/listOrder',
    name: 'List Order',
    icon: 'mdi mdi-credit-card-multiple',
    component: ListOrder
  },
  {
    path: '/listCategory',
    name: 'List Category',
    icon: 'mdi mdi-credit-card-multiple',
    component: ListCategory
  },
  {
    path: '/orderDetail/:id',
    name: 'List Order',
    icon: 'mdi mdi-credit-card-multiple',
    component: OrderDetail
  },
  {
    path: '/updateCategory/:id',
    name: 'Update Category',
    icon: 'mdi mdi-credit-card-multiple',
    component: UpdateCaterogy
  },
  { path: '/', pathTo: '/listTour', name: 'List Tour', redirect: true }
];

export default ThemeRoutes;
