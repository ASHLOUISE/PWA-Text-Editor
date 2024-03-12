const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Store the event to show the install prompt

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  butInstall.style.display = 'none';
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  deferredPrompt = null;
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});

