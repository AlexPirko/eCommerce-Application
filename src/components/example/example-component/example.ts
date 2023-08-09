import ComponentFromHtmlTemplate from '@lib/abstracts/component-from-html';
import template from './example.html';
import './example.scss';

export default class ExampleComponent extends ComponentFromHtmlTemplate {
  constructor() {
    super(template);
  }
}
