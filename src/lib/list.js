import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filters = document.querySelector('.meginmál__filterar');
  }

  loadLectures() {
    fetch('../lectures.json')
      .then((result) => {
        if(!result.ok) {
          throw new Error ('Non 200 status');
        }
        return result.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  filterLectures() {
    document.getElementById("Button__HTML").addEventListener("click",
    function(){
      document.getElementById("")
    })
    if(!pressButton)

  }

  showLectures() {

  filterLectures() {
    
  }



  load() {
    empty(this.container);
    this.loadLectures()
      .then(data => this.filterLectures(data))
      .then(filter =)
  }
}
