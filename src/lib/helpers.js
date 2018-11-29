import {
  loadDom,
} from './dom';

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function loadData(isLecturePage, page) {
  fetch('../hopverkefni2/lectures.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Villa kom upp');
    })
    .then((data) => {
      loadDom(data, page, isLecturePage);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}
