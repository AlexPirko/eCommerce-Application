import './header.scss';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Header extends ComponentView {
  constructor() {
    const params = {
      tagName: 'header',
      classNames: ['header'],
    };
    super(params);
    this.configureView();
  }

  //   navEl: string = `<nav>
  //         <div class="nav-wrapper">
  //             <a href="#!" class="brand-logo"><i class="material-icons">cloud</i>Logo</a>
  //             <ul class="right hide-on-med-and-down">
  //             <li><a href="sass.html"><i class="material-icons">search</i></a></li>
  //             <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
  //             <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
  //             <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>
  //             </ul>
  //         </div>
  //     </nav>`;

  configureView() {
    const navParams = {
      tagName: 'nav',
      classNames: ['nav'],
    };
    const creatorNav: ElementBuilder = new ElementBuilder(navParams);

    this.elementBuilder.addInnerElement(creatorNav);
    console.log(this.elementBuilder.getElement());
  }
}
