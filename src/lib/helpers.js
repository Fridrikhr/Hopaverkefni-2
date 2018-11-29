export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(type, className, clickHandler) {
  const element = document.createElement(type);

  if (className) {
    element.classList.add(className);
  }

  if (clickHandler) {
    element.addEventListener('click', clickHandler);
  }

  return element;
}
