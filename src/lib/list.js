import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filters =
  }

  loadLectures() {

  }



  load() {
    empty(this.container);
    this.loadLectures()
      .then(data => this.filterLectures(data))
      .then(filt =)
  }
}
