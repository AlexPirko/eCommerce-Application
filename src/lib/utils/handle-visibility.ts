import { Paths } from '@components/router/paths';
import Router from '@components/router/router';
import ApiServices from '@lib/api/api-services';

export default function handleVisibility(): void {
  const api: ApiServices = new ApiServices();
  const router: Router = new Router(null);
  const isLogin: boolean = Boolean(localStorage.getItem('refreshToken') && !localStorage.getItem('anonymousId'));
  localStorage.setItem('isLogin', `${isLogin}`);
  const signupBtn: HTMLElement = document.querySelector('.nav-signup') as HTMLElement;
  const loginBtn: HTMLElement = document.querySelector('.nav-login') as HTMLElement;
  const logoutBtn: HTMLElement = document.querySelector('.nav-logout') as HTMLElement;
  const profileBtn: HTMLElement = document.querySelector('.nav-profile') as HTMLElement;
  if (isLogin) {
    signupBtn.style.display = 'none';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    profileBtn.style.display = 'block';
  }
  if (!isLogin) {
    signupBtn.style.display = 'block';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    profileBtn.style.display = 'none';
  }

  profileBtn.textContent = 'My cabinet';

  logoutBtn.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    localStorage.clear();
    api.customerLogout();
    handleVisibility();
    router.navigate(`${Paths.LOGIN}`);
  });
}
