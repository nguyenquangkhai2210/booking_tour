import ListTour from '../components/listTour/ListTour.jsx';
import AboutUs from '../components/aboutUs/AboutUs';
import ListTourByCategory from '../components/listTourByCategory/ListTourByCategory';
import TourDetail from '../components/tourDetail/TourDetail';
import CheckOut from '../components/checkOut/CheckOut';

const ThemeRoutes = [
  {
    path: '/tours',
    name: 'Tours',
    component: ListTour,
  },
  {
    path: '/checkout',
    name: 'Check Out',
    component: CheckOut,
  },
  {
    path: '/tour/:id',
    name: 'Tour',
    component: ListTourByCategory,
  },
  {
    path: '/tourDetail/:id',
    name: 'Tour Detail',
    component: TourDetail,
  },
  {
    path: '/about_us',
    name: 'About Us',
    component: AboutUs,
  },
  { path: '/', pathTo: '/tours', name: 'Events', redirect: true }
];

export default ThemeRoutes;
