import {
  loadData,
} from './lib/helpers';
import {
  addListeners,
} from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  loadData(isLecturePage, page);
  if (!isLecturePage) {
    addListeners(page);
  }
});
