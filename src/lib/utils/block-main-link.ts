export default function blockMainLink(): void {
  const isLogin: boolean = Boolean(localStorage.getItem('login')) || false;
  const signupMainLink = document.querySelector('.main-signup_link') as HTMLAnchorElement;
  const loginMainLink = document.querySelector('.main-login_link') as HTMLAnchorElement;

  if (isLogin) {
    signupMainLink.setAttribute('href', `http://${window.location.host}/main`);
    loginMainLink.setAttribute('href', `http://${window.location.host}/main`);
  }
}
