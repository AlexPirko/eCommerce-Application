import './login-page.scss';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import { LoginForm } from '@components/login-form/login-form';

export default class Login extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['login-wrapper'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    this.viewElementBuilder.addInnerElement(
      new LoginForm({
        titleText: 'Log in',
        descText: 'Please enter your email and password',
        btnText: 'log in',
        linkText: "Don't have an account ? Register ",
        onSubmit: () => console.log('submit'),
      }).createForm()
    );
  }
}
