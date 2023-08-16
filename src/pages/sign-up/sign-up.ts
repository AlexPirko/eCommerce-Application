import './sign-up-page.scss';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import { RegisterForm } from '@components/register-form/register-form';

export default class SignUp extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['signup-wrapper'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    this.viewElementBuilder.addInnerElement(
      new RegisterForm({
        titleText: 'Register',
        descText: 'Please fill the fields',
        btnText: 'Register',
        linkText: 'Already have an account ? Login ',
        onSubmit: () => console.log('submit'),
      }).createForm()
    );
  }
}
