import { SigninPage } from '@pages/SigninPage';

const root = document.querySelector('#root');
if (root !== null) {
  root.append(new SigninPage().createWrapper());
}
