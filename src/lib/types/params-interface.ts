export interface Params {
  tagName: string;
  classNames: string[];
  text?: '' | string;
  components?: HTMLElement[];
  callback?: (() => void) | null;
}

export interface PageParams {
  name: string;
  callback: (() => void) | null;
}

export interface RouteParams {
  path: string;
  callback: (() => void) | null;
}
