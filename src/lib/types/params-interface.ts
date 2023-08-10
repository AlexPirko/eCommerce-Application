export interface Params {
  tagName: string;
  classNames: string[];
  text?: '' | string;
  components?: HTMLElement[];
  callback?: () => void;
}
