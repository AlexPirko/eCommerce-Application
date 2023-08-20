import Router from '@components/router/router';

export default function toggleNavBtn(): void {
  const isLogin: boolean = Boolean(localStorage.getItem('login')) || false;
  const signupBtn = document.querySelector('.nav-signup') as HTMLElement;
  const loginBtn = document.querySelector('.nav-login') as HTMLElement;
  const logoutBtn = document.querySelector('.nav-logout') as HTMLElement;
  if (isLogin) {
    signupBtn.style.display = 'none';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  }
  if (!isLogin) {
    signupBtn.style.display = 'block';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }

  const router = new Router(null);

  logoutBtn.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    localStorage.clear();
    toggleNavBtn();
    router.navigate('main');
  });
}
