import {
  el,
  empty,
} from './helpers';

import {
  check,
} from './storage';

import {
  finishedListener,
} from './list';

export function getSlug() {
  const urlString = window.location.href;
  const url = new URL(urlString);
  return url.searchParams.get('slug');
}

function findFromSlug(data, slug) {
  for (let i = 0; i < data.lectures.length; i += 1) {
    const lecture = data.lectures[i];
    if (lecture.slug === slug) {
      return lecture;
    }
  }
  return null;
}

function getObject(data) {
  const slug = getSlug();
  return findFromSlug(data, slug);
}

function checkFunction(element) {
  if (element.className === undefined) {
    return false;
  }
  return element.className.includes('category__button--toggled');
}

function filterButtons(buttons) {
  return buttons.filter(checkFunction);
}

function filterCheck(page) {
  const category = page.querySelector('.category__wrap');
  let buttons = Array.from(category.childNodes);
  buttons = filterButtons(buttons);
  buttons = buttons.map(x => x.outerText.toLowerCase());
  return buttons;
}

export function checkSlug(slug) {
  return check(slug);
}

function loadLectures(data, page) {
  document.title = 'Fyrirlestrar';
  let filtered = filterCheck(page);
  if (filtered.length === 0) {
    filtered = ['html', 'css', 'javascript'];
  }


  const lectures = page.querySelector('.lectures__row');
  empty(lectures);
  for (let i = 0; i < data.lectures.length; i += 1) {
    const lecture = data.lectures[i];

    if (filtered.includes(lecture.category)) {
      const element = el('a');
      const column = el('div');
      column.classList.add('lectures__col');

      if (lecture.thumbnail) {
        const img = el('img');
        img.classList.add('lectures__img');
        img.setAttribute('src', lecture.thumbnail);
        element.appendChild(img);
      } else {
        element.classList.add('lectures__section--noimage');
      }

      const cat = el('p', lecture.category.toUpperCase());
      cat.classList.add('lectures__category');
      element.appendChild(cat);

      const title = el('h1', lecture.title);
      title.classList.add('lectures__title');

      const checkMark = el('p', '✓');
      checkMark.classList.add('lectures__checkbox');
      if (!checkSlug(lecture.slug)) {
        checkMark.classList.add('lectures__checkbox--hidden');
      }

      const wrap = el('div', title, checkMark);
      wrap.classList.add('lectures__titlewrap');

      element.appendChild(wrap);
      element.classList.add('lectures__section');
      const href = `fyrirlestur.html?slug=${lecture.slug}`;
      element.setAttribute('href', href);

      column.appendChild(element);
      lectures.appendChild(column);
    }
  }
}

function loadLecture(data, page) {
  const res = getObject(data);
  const object = res.content;
  document.title = ` ${res.category.toUpperCase()} - ${res.title}`;

  const lecture = page.querySelector('.lecture');
  const header = page.querySelector('.header--lecture');
  header.style.background = `linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)), url(../${res.image})`;
  const headerwrap = page.querySelector('.header__wrap');

  const category = el('h2', res.category.toUpperCase());
  category.classList.add('header__class');
  headerwrap.appendChild(category);

  const title = el('h1', res.title);
  title.classList.add('header__title');
  headerwrap.appendChild(title);

  for (let i = 0; i < object.length; i += 1) {
    const lectureData = object[i];
    switch (lectureData.type) {
      case 'heading':
      {
        const heading = el('h1', lectureData.data);
        heading.classList.add('lecture__heading');
        lecture.appendChild(heading);
        break;
      }
      case 'text':
      {
        const text = el('div');
        const textData = lectureData.data.split('\n');
        for (let j = 0; j < textData.length; j += 1) {
          const paragraph = el('p', textData[j]);
          paragraph.classList.add('lecture__paragraph');
          text.appendChild(paragraph);
        }
        text.classList.add('lecture__text');
        lecture.appendChild(text);
        break;
      }
      case 'quote':
      {
        const dataEl = el('p', lectureData.data);
        dataEl.classList.add('lecture__quotetext');
        const attributeEl = el('p', lectureData.attribute);
        attributeEl.classList.add('lecture__quoteattribute');
        const quote = el('div', dataEl, attributeEl);
        quote.classList.add('lecture__quote');
        lecture.appendChild(quote);
        break;
      }
      case 'youtube':
      {
        const iframe = el('iframe');
        iframe.setAttribute('src', lectureData.data);
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allowfullscreen', 0);
        iframe.classList.add('lecture__iframe');
        lecture.appendChild(iframe);
        break;
      }
      case 'image':
      {
        const img = el('img');
        img.setAttribute('src', lectureData.data);
        img.classList.add('lecture__image');
        const imgText = el('p', lectureData.caption);
        imgText.classList.add('lecture__imagecaption');
        const imgWrap = el('div', img, imgText);
        imgWrap.classList.add('lecture__imagewrap');
        lecture.appendChild(imgWrap);
        break;
      }
      case 'list':
      {
        const ul = el('ul');
        ul.classList.add('lecture__list');
        for (let j = 0; j < lectureData.data.length; j += 1) {
          const li = el('li', lectureData.data[j]);
          li.classList.add('lecture__listitem');
          ul.appendChild(li);
        }
        lecture.appendChild(ul);
        break;
      }
      case 'code':
      {
        const code = el('pre', el('p', lectureData.data));
        code.classList.add('lecture__code');
        lecture.appendChild(code);
        break;
      }
      default: {
        break;
      }
    }
  }

  const checkmark = el('p', '✓');
  checkmark.classList.add('lecture__check');
  if (!checkSlug(res.slug)) {
    checkmark.classList.add('lecture__check--hidden');
  }
  const finished = el('div', checkmark);


  finished.classList.add('lecture__finish');
  if (checkSlug(res.slug)) {
    finished.classList.add('lecture__finish--green');
    finished.appendChild(el('p', 'Fyrirlestur kláraður'));
  } else {
    finished.appendChild(el('p', 'Klára fyrirlestur'));
  }
  finished.addEventListener('click', finishedListener);
  const finishedWrap = el('div', finished);
  finishedWrap.classList.add('lecture__finishwrap');
  lecture.appendChild(finishedWrap);

  const back = el('a', 'Til baka');
  back.setAttribute('href', 'index.html');
  back.classList.add('lecture__href');
  const backDiv = el('div', back);
  backDiv.classList.add('lecture__back');
  lecture.appendChild(backDiv);
}

export function loadDom(data, page, isLecturePage) {
  if (isLecturePage) {
    loadLecture(data, page);
  } else {
    loadLectures(data, page);
  }
}
