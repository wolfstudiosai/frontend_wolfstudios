import { paths } from './paths';


// ----------------------------------------------------------------------

export const navData = [
    {
        key: 'home',
        title: 'Home',
        href: paths.home,
    },
    {
        key: 'portfolio',
        title: 'Portfolio',
        href: paths.public.portfolio,
    },
    {
        key: 'campaign',
        title: 'Campaign',
        href: paths.public.campaign,
    },
    {
        key: 'login',
        title: 'Login',
        href: paths.auth.default.signIn,
    }
];
