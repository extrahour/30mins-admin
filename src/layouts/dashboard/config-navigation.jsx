import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'bookings',
    path: '/bookings',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'services',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'settings',
  //   path: '/user',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'account',
  //   path: '/account',
  //   icon: icon('ic_user'),
  // }
];

export default navConfig;
