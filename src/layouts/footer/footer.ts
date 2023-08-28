import './footer.scss';
import { Params } from '@lib/types/params-interface';
import createHTMLElement from '@lib/utils/create-html-element';
import ComponentView from '@lib/services/component-view';

export default class Footer extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'footer',
      classNames: ['footer'],
      callback: null,
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
    const footerContainer: HTMLElement = createHTMLElement('div', ['container']);
    const html: string = `<div class="row">
      <div class="col s4">
        <h5 class="grey-text text-lighten-0">Brands</h5>
        <ul class="footer-list">
          <li><h6 class="grey-text text-lighten-2">Canon</h6></li>
          <li><h6 class="grey-text text-lighten-2">Nikon</li>
          <li><h6 class="grey-text text-lighten-2">Sony</h6></li>
          <li><h6 class="grey-text text-lighten-2">Panasonic</h6></li>
        </ul>
      </div>
      <div class="col s4">
        <h5 class="grey-text text-lighten-0">Product Range</h5>
        <ul class="footer-list">
          <li><h6 class="grey-text text-lighten-2">Mirrorless</h6></li>
          <li><h6 class="grey-text text-lighten-2">DSLR</li>
          <li><h6 class="grey-text text-lighten-2">Compact</h6></li>
          <li><h6 class="grey-text text-lighten-2">Instant</h6></li>
        </ul>
      </div>
      <div class="col s4">
        <h5 class="grey-text text-lighten-0">Address</h5>
        <ul class="footer-list">
          <li><h6 class="grey-text text-lighten-2">Address: 1234 Street Unknown City</h6></li>
          <li><h6 class="grey-text text-lighten-2">Phones: (00) 1234 5678</h6></li>
          <li><h6 class="grey-text text-lighten-2">We are open: Monday-Thursday: 9:00 AM - 5:30 PM</h6></li>
          <li><h6 class="grey-text text-lighten-2">Saturday: 11:00 AM - 5:00 PM</h6></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="grey-text text-lighten-0">
    © 2023 Copyright Text
    </div>`;
    footerContainer.innerHTML = html;
    this.viewElementBuilder.addInnerElement(footerContainer);
  }
}
