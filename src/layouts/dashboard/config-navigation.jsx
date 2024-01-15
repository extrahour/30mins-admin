import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'bookings',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'services',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'settings',
    path: '/user',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
