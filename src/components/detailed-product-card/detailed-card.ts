import './detailed-card.scss';
import testImg from '../../assets/images/test.png';
import createHTMLElement from '@lib/utils/create-html-element';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';

export default class DetailedCard extends ComponentView {
  protected detailedCardContainer: HTMLElement;

  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['section-cart'],
      text: '',
      callback: null,
    };
    super(params);

    this.detailedCardContainer = createHTMLElement('div', ['detailed-cart', 'row']);
    this.configureView();
  }

  private createDetailedCartHtml(): string {
    return `
    <div class='row top-bar'>
      <div class='breadcrumbs col s7'>
        <ul class='breadcrumbs-list'>
          <li><a href="#!" class="breadcrumb-item">First</a></li>
          <li>>></li>
          <li><a href="#!" class="breadcrumb-item">Second</a></li>
          <li>>></li>
          <li><a href="#!" class="breadcrumb-item">Third</a></li>
        </ul>
      </div>
      <div class='btn-container col s5'>
          <div class='detail-price'>Price: 1000$</div>
          <div class='detail-buttons'>
            <button class='waves-effect waves-light btn-small add-button'><i class="menu-cart material-icons">shopping_cart</i>Add to Cart</button>
            <button class='waves-effect waves-light btn-small buy-now'>Buy Now</button>
          </div>
      </div>
    </div>
    <div class='col s7 product-info'>
      <div class='product-info-container'>
        <h2 class='product-details-name'>Canon R6</h2>
        <p class='detail-info'>Brand: <span>Canon</span></p>
        <p class='detail-description'>The EOS R6 full-frame mirrorless camera is designed to meet the demands of both photographers and video content creators who want a strong and versatile camera to keep up with their active lives. It can go from photographing high-speed action sports to filming 4K cinematic video with ease thanks to its high-performance CMOS sensor and DIGIC X image processor</p>
      </div>
    </div>
    <div class='col s5 product-images'>
        <div class='image-wrap'>
        <img class='main-image' src=${testImg}>
        </div>
    </div>
  `;
  }

  private configureView(): void {
    this.detailedCardContainer.innerHTML = this.createDetailedCartHtml();
  }

  public getElement(): HTMLElement {
    return this.detailedCardContainer;
  }
}
