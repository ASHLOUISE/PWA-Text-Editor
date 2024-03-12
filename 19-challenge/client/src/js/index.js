import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};


loadSpinner();

// Initialize the editor
const editor = new Editor();

editor.initialize().then(() => {
  const spinner = document.querySelector('.spinner');
  if (spinner) {
    spinner.remove();
  }

  // Check if service workers are supported and if the editor is successfully initialized
  if ('serviceWorker' in navigator) {
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
  } else {
    console.error('Service workers are not supported in this browser.');
  }
}).catch(error => {
  console.error('Error initializing editor:', error);
});
