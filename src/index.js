import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) { 
    fetch('../lectures.json')
      .then((result) => {
        if(!result.ok) {
          throw new Error ('Non 200 status');
        }
        return result.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
    
      const options = {
        body: { /* object af post data */ },
        cache: '', /* cache header */
        headers: { /* auka headers */ },
        method: 'POST',
      };
      
      fetch('url', options);

  } else {
    const list = new List();
    list.load();
  }
});
