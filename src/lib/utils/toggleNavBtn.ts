export default function toggleNavBtn(isLogin: boolean): void {
  const signupBtn: HTMLElement = document.querySelector('.nav-signup') as HTMLElement;
  const loginBtn: HTMLElement = document.querySelector('.nav-login') as HTMLElement;
  const logoutBtn: HTMLElement = document.querySelector('.nav-logout') as HTMLElement;
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

  logoutBtn.addEventListener('click', (e: Event): void => {
    e.preventDefault();
    localStorage.clear();
    toggleNavBtn(isLogin);
    document.location.href = `http://${window.location.host}`;
  });
}
