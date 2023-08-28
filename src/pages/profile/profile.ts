import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import { UserInfo } from '@components/user-info/user-info';

export default class Profile extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['profile-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['profile-title'],
      text: 'Profile',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);
    const user = await new UserInfo().createUserInfoPage();
    this.viewElementBuilder.addInnerElement(titleElementBuilder);
    this.viewElementBuilder.addInnerElement(user);
  }
}
