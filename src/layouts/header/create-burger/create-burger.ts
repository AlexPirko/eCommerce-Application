import makeElement from '@lib/utils/make-element';

export default class CreateBurger {
  protected readonly burgerWrapper: HTMLElement = makeElement('div', ['burger__wrapper']);
  protected readonly backgroundElem: HTMLElement = makeElement('div', ['background-element']);
  protected isOpen: boolean = false;

  public createBurgerElement(): HTMLElement {
    const burger: HTMLElement = makeElement('span', ['burger']);
    const burgerLine: HTMLElement = makeElement('span', ['burger__line']);
    document.body.append(this.backgroundElem);
    burger.append(burgerLine);
    this.burgerWrapper.append(burger);
    return this.burgerWrapper;
  }

  public handlerListener(): void {
    const nav = document.querySelector('.nav') as HTMLElement;
    const navItemElem = document.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
    this.burgerWrapper.addEventListener('click', () => {
      if (!this.isOpen) {
        this.openMenu();
        nav.classList.add('active');
      } else {
        this.closeMenu(nav);
      }
    });

    navItemElem.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        this.closeMenu(nav);
      });
    });
  }

  private openMenu(): void {
    this.isOpen = true;
    this.burgerWrapper.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.backgroundElem.style.display = 'block';
  }

  private closeMenu(elem: HTMLElement): void {
    this.isOpen = false;
    elem.classList.remove('active');
    this.burgerWrapper.classList.remove('active');
    document.body.style.overflow = '';
    this.backgroundElem.style.display = 'none';
  }
}
