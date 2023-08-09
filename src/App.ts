import ExampleContainer from '@components/example/example-container';

export default class App {
  private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

  constructor() {}

  public run(): void {
    /* example */ const example = new ExampleContainer();
    /* example */ App.container.append(example.element);
    console.log(App.container);
  }
}
