import { RegisterPage } from '@pages/RegisterPage';

const wrapper = document.querySelector('#root');

wrapper?.append(new RegisterPage().createWrapper());
