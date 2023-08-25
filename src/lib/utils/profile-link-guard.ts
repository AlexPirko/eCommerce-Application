import Router from '@components/router/router';

export default function profileLinkGuard(): void {
  const router: Router = new Router(null);
  const profileBtn: HTMLElement = document.querySelector('.nav-profile') as HTMLElement;
  const isLogin: string | null = localStorage.getItem('refreshToken');
  if (!isLogin && location.pathname.slice(1) === 'profile') {
    router.navigate(`http://${window.location.host}`);
    profileBtn.style.color = '#25a1d6';
  }
  if (isLogin && profileBtn) {
    profileBtn.classList.add('nav-item__selected');
  }
}
