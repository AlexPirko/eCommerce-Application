import './header.scss';
// import createLogo from '@lib/utils/create-logo';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Header extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'header',
      classNames: ['header'],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const navParams: Params = {
      tagName: 'nav',
      classNames: ['nav'],
    };
    const navElementBuilder: ElementBuilder = new ElementBuilder(navParams);

    this.viewElementBuilder.addInnerElement(navElementBuilder);
    const nav = navElementBuilder.getElement() as HTMLElement;
    console.log(nav);
  }
}
