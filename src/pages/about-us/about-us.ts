import './about.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import { AboutUs } from '@components/about-us/about-us';

export default class About extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['about_us-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['about_us-title'],
      text: 'About us',
    };
    const aboutUs: HTMLDivElement = new AboutUs().createAboutPage();
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);
    this.viewElementBuilder.addInnerElement(titleElementBuilder);
    this.viewElementBuilder.addInnerElement(aboutUs);
  }
}
