self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: 'You have travel requests that require your approval',
    icon: 'https://i.ibb.co/5k2ygmV/favicon.png'
  });
});
