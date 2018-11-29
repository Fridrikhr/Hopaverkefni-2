import { loadData } from './helpers';

function checkFunction(el) {
  return el.className === 'category__button';
}

function filterButtons(buttons) {
  return buttons.filter(checkFunction);
}

function onToggle(e) {
  const element = e.srcElement;
  element.classList.toggle('category__button--toggled');
  loadData(false, document.querySelector('body'));
}


export function addListeners(page) {
  const category = page.querySelector('.category__wrap');
  let buttons = Array.from(category.childNodes);

  buttons = filterButtons(buttons);

  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', onToggle);
  }
}

export function finishedListener(e) {
  const slug = getSlug();
  const lecture = e.path[1];
  const img = lecture.firstChild;
  const p = lecture.lastChild;
  if (checkSlug(slug)) {
    remove(slug);
    p.textContent = 'Klára fyrirlestur';
  } else {
    add(slug);
    p.textContent = 'Fyrirlestur kláraður';
  }
  img.classList.toggle('lecture__check--hidden');
  lecture.classList.toggle('lecture__finish--green');
}