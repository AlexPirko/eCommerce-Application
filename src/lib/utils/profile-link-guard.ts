import Router from '@components/router/router';

export default function profileLinkGuard(): void {
  const router: Router = new Router(null);
  const isLogin: string | null = localStorage.getItem('refreshToken');
  if (!isLogin && location.pathname.slice(1) === 'profile') {
    router.navigate(`http://${window.location.host}`);
  }
}
