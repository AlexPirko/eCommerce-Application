export default function toggleNavBtn() {
  const isLogin = Boolean(localStorage.getItem('login')) || false;
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

  logoutBtn.addEventListener('click', (e: Event) => {
    e.preventDefault();
    localStorage.clear();
    toggleNavBtn();
  });
}
