import CreateTour from '../components/CreateTour.jsx';
import ListTour from '../components/ListTour.jsx';
import ListOrder from '../components/ListOrder.jsx';
import ListCategory from '../components/ListCategory.jsx';

const ThemeRoutes = [
  {
    path: '/listCategory',
    name: 'List Category',
    icon: 'mdi mdi-credit-card-multiple',
    component: ListCategory
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
    path: '/listOrder',
    name: 'List Order',
    icon: 'mdi mdi-credit-card-multiple',
    component: ListOrder
  },
  { path: '/', pathTo: '/listTour', name: 'List Tour', redirect: true }
];

export default ThemeRoutes;
