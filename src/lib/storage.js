const LOCALSTORAGE_KEY = 'lectures_finished';

export function load() {
  return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
}

export function check(slugVar) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  const obj = JSON.parse(data);
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].slug === slugVar) {
      return true;
    }
  }
  return false;
}

export function add(slugVar) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  if (data === null) {
    const array = JSON.stringify([{
      slug: slugVar,
    }]);
    window.localStorage.setItem(LOCALSTORAGE_KEY, array);
  } else {
    const obj = JSON.parse(data);
    obj.push({
      slug: slugVar,
    });
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  }
}

export function remove(slugVar) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  if (data !== null) {
    let obj = JSON.parse(data);
    obj = obj.filter(item => item.slug !== slugVar);
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  }
}


export function clear() {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
}
