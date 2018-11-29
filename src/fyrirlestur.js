(function () {
    'use strict';
  
    var LOCALSTORAGE_KEY = 'lectures_finished';
    function check(slugVar) {
      var data = window.localStorage.getItem(LOCALSTORAGE_KEY);
  
      if (data === null) {
        return false;
      }
  
      var obj = JSON.parse(data);
  
      for (var i = 0; i < obj.length; i += 1) {
        if (obj[i].slug === slugVar) {
          return true;
        }
      }
  
      return false;
    }
    function add(slugVar) {
      var data = window.localStorage.getItem(LOCALSTORAGE_KEY);
  
      if (data === null) {
        var array = JSON.stringify([{
          slug: slugVar
        }]);
        window.localStorage.setItem(LOCALSTORAGE_KEY, array);
      } else {
        var obj = JSON.parse(data);
        obj.push({
          slug: slugVar
        });
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
      }
    }
    function remove(slugVar) {
      var data = window.localStorage.getItem(LOCALSTORAGE_KEY);
  
      if (data !== null) {
        var obj = JSON.parse(data);
        obj = obj.filter(function (item) {
          return item.slug !== slugVar;
        });
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
      }
    }
  
    function checkFunction(el$$1) {
      return el$$1.className === 'category__button';
    }
  
    function filterButtons(buttons) {
      return buttons.filter(checkFunction);
    }
  
    function onToggle(e) {
      var element = e.srcElement;
      element.classList.toggle('category__button--toggled');
      loadData(false, document.querySelector('body'));
    }
  
    function addListeners(page) {
      var category = page.querySelector('.category__wrap');
      var buttons = Array.from(category.childNodes);
      buttons = filterButtons(buttons);
  
      for (var i = 0; i < buttons.length; i += 1) {
        buttons[i].addEventListener('click', onToggle);
      }
    }
    function finishedListener(e) {
      var slug = getSlug();
      var lecture = e.path[1];
      var img = lecture.firstChild;
      var p = lecture.lastChild;
  
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
  
    function getSlug() {
      var urlString = window.location.href;
      var url = new URL(urlString);
      return url.searchParams.get('slug');
    }
  
    function findFromSlug(data, slug) {
      for (var i = 0; i < data.lectures.length; i += 1) {
        var lecture = data.lectures[i];
  
        if (lecture.slug === slug) {
          return lecture;
        }
      }
  
      return null;
    }
  
    function getObject(data) {
      var slug = getSlug();
      return findFromSlug(data, slug);
    }
  
    function checkFunction$1(element) {
      if (element.className === undefined) {
        return false;
      }
  
      return element.className.includes('category__button--toggled');
    }
  
    function filterButtons$1(buttons) {
      return buttons.filter(checkFunction$1);
    }
  
    function filterCheck(page) {
      var category = page.querySelector('.category__wrap');
      var buttons = Array.from(category.childNodes);
      buttons = filterButtons$1(buttons);
      buttons = buttons.map(function (x) {
        return x.outerText.toLowerCase();
      });
      return buttons;
    }
  
    function checkSlug(slug) {
      return check(slug);
    }
  
    function loadLectures(data, page) {
      document.title = 'Fyrirlestrar';
      var filtered = filterCheck(page);
  
      if (filtered.length === 0) {
        filtered = ['html', 'css', 'javascript'];
      }
  
      var lectures = page.querySelector('.lectures__row');
      empty(lectures);
  
      for (var i = 0; i < data.lectures.length; i += 1) {
        var lecture = data.lectures[i];
  
        if (filtered.includes(lecture.category)) {
          var element = el('a');
          var column = el('div');
          column.classList.add('lectures__col');
  
          if (lecture.thumbnail) {
            var img = el('img');
            img.classList.add('lectures__img');
            img.setAttribute('src', lecture.thumbnail);
            element.appendChild(img);
          } else {
            element.classList.add('lectures__section--noimage');
          }
  
          var cat = el('p', lecture.category.toUpperCase());
          cat.classList.add('lectures__category');
          element.appendChild(cat);
          var title = el('h1', lecture.title);
          title.classList.add('lectures__title');
          var checkMark = el('p', '✓');
          checkMark.classList.add('lectures__checkbox');
  
          if (!checkSlug(lecture.slug)) {
            checkMark.classList.add('lectures__checkbox--hidden');
          }
  
          var wrap = el('div', title, checkMark);
          wrap.classList.add('lectures__titlewrap');
          element.appendChild(wrap);
          element.classList.add('lectures__section');
          var href = "fyrirlestur.html?slug=".concat(lecture.slug);
          element.setAttribute('href', href);
          column.appendChild(element);
          lectures.appendChild(column);
        }
      }
    }
  
    function loadLecture(data, page) {
      var res = getObject(data);
      var object = res.content;
      document.title = " ".concat(res.category.toUpperCase(), " - ").concat(res.title);
      var lecture = page.querySelector('.lecture');
      var header = page.querySelector('.header--lecture');
      header.style.background = "linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)), url(./".concat(res.image, ")");
      var headerwrap = page.querySelector('.header__wrap');
      var category = el('h2', res.category.toUpperCase());
      category.classList.add('header__class');
      headerwrap.appendChild(category);
      var title = el('h1', res.title);
      title.classList.add('header__title');
      headerwrap.appendChild(title);
  
      for (var i = 0; i < object.length; i += 1) {
        var lectureData = object[i];
  
        switch (lectureData.type) {
          case 'heading':
            {
              var heading = el('h1', lectureData.data);
              heading.classList.add('lecture__heading');
              lecture.appendChild(heading);
              break;
            }
  
          case 'text':
            {
              var text = el('div');
              var textData = lectureData.data.split('\n');
  
              for (var j = 0; j < textData.length; j += 1) {
                var paragraph = el('p', textData[j]);
                paragraph.classList.add('lecture__paragraph');
                text.appendChild(paragraph);
              }
  
              text.classList.add('lecture__text');
              lecture.appendChild(text);
              break;
            }
  
          case 'quote':
            {
              var dataEl = el('p', lectureData.data);
              dataEl.classList.add('lecture__quotetext');
              var attributeEl = el('p', lectureData.attribute);
              attributeEl.classList.add('lecture__quoteattribute');
              var quote = el('div', dataEl, attributeEl);
              quote.classList.add('lecture__quote');
              lecture.appendChild(quote);
              break;
            }
  
          case 'youtube':
            {
              var iframe = el('iframe');
              iframe.setAttribute('src', lectureData.data);
              iframe.setAttribute('frameborder', 0);
              iframe.setAttribute('allowfullscreen', 0);
              iframe.classList.add('lecture__iframe');
              lecture.appendChild(iframe);
              break;
            }
  
          case 'image':
            {
              var img = el('img');
              img.setAttribute('src', lectureData.data);
              img.classList.add('lecture__image');
              var imgText = el('p', lectureData.caption);
              imgText.classList.add('lecture__imagecaption');
              var imgWrap = el('div', img, imgText);
              imgWrap.classList.add('lecture__imagewrap');
              lecture.appendChild(imgWrap);
              break;
            }
  
          case 'list':
            {
              var ul = el('ul');
              ul.classList.add('lecture__list');
  
              for (var _j = 0; _j < lectureData.data.length; _j += 1) {
                var li = el('li', lectureData.data[_j]);
                li.classList.add('lecture__listitem');
                ul.appendChild(li);
              }
  
              lecture.appendChild(ul);
              break;
            }
  
          case 'code':
            {
              var code = el('pre', el('p', lectureData.data));
              code.classList.add('lecture__code');
              lecture.appendChild(code);
              break;
            }
  
          default:
            {
              break;
            }
        }
      }
  
      var checkmark = el('p', '✓');
      checkmark.classList.add('lecture__check');
  
      if (!checkSlug(res.slug)) {
        checkmark.classList.add('lecture__check--hidden');
      }
  
      var finished = el('div', checkmark);
      finished.classList.add('lecture__finish');
  
      if (checkSlug(res.slug)) {
        finished.classList.add('lecture__finish--green');
        finished.appendChild(el('p', 'Fyrirlestur kláraður'));
      } else {
        finished.appendChild(el('p', 'Klára fyrirlestur'));
      }
  
      finished.addEventListener('click', finishedListener);
      var finishedWrap = el('div', finished);
      finishedWrap.classList.add('lecture__finishwrap');
      lecture.appendChild(finishedWrap);
      var back = el('a', 'Til baka');
      back.setAttribute('href', 'index.html');
      back.classList.add('lecture__href');
      var backDiv = el('div', back);
      backDiv.classList.add('lecture__back');
      lecture.appendChild(backDiv);
    }
  
    function loadDom(data, page, isLecturePage) {
      if (isLecturePage) {
        loadLecture(data, page);
      } else {
        loadLectures(data, page);
      }
    }
  
    function empty(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
    function loadData(isLecturePage, page) {
      fetch('lectures.json').then(function (response) {
        if (response.ok) {
          return response.json();
        }
  
        throw new Error('Villa kom upp');
      }).then(function (data) {
        loadDom(data, page, isLecturePage);
      }).catch(function (error) {
        console.error(error);
      });
    }
    function el(name) {
      var element = document.createElement(name);
  
      for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        children[_key - 1] = arguments[_key];
      }
  
      if (Array.isArray(children)) {
        children.forEach(function (child) {
          if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
          } else if (child) {
            element.appendChild(child);
          }
        });
      }
  
      return element;
    }
  
    document.addEventListener('DOMContentLoaded', function () {
      var page = document.querySelector('body');
      var isLecturePage = page.classList.contains('lecture-page');
      loadData(isLecturePage, page);
  
      if (!isLecturePage) {
        addListeners(page);
      }
    });

    
  
  }());
  