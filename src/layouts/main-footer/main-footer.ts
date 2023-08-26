import './main-footer.scss';
import imageSup from '../../assets/images/Support.png';
import imageSav from '../../assets/images/Savings.png';
import imageAcc from '../../assets/images/Account.png';
import { Params } from '@lib/types/params-interface';
import createHTMLElement from '@lib/utils/create-html-element';
import ComponentView from '@lib/services/component-view';

export default class MainFooter extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'main-footer',
      classNames: ['main-footer'],
      callback: null,
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
    // const imgSup: HTMLImageElement = new Image();
    // imgSup.src = imageS;
    const mainFooterContainer: HTMLElement = createHTMLElement('div', ['container', 'main-footer-container', 'row']);

    const html = `<div class="main-footer-row row col s4">
            <img class="main-footer-img" src=${imageSav}>
            <h4 class="black-text">Amazing Savings</h4>
            <p class="mf-text black-text">Up to 70% off new Products, you can be sure of the best price.</p>
        </div>
        <div class="main-footer-row row col s4">
            <img class="main-footer-img" src=${imageSup}>
            <h4 class="black-text">Product Support</h4>
            <p class="mf-text black-text">Up to 3 years on-site warranty available for your peace of mind.</p>
        </div>
        <div class="main-footer-row row col s4">
            <img class="main-footer-img" src=${imageAcc}>
            <h4 class="black-text">Personal Account</h4>
            <p class="mf-text black-text">With big discounts, free delivery and a dedicated support specialist.</p>
        </div>`;
    mainFooterContainer.innerHTML = html;
    this.viewElementBuilder.addInnerElement(mainFooterContainer);
  }
}
