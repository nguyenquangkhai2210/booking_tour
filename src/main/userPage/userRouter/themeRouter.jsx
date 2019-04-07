import ListOrder from '../components/ListOrder.jsx';


const ThemeRoutes = [
  {
    path: '/listOrder',
    name: 'History order',
    icon: 'mdi mdi-toggle-switch',
    component: ListOrder
  },
  { path: '/', pathTo: '/listOrder', name: 'History order', redirect: true }
];

export default ThemeRoutes;
