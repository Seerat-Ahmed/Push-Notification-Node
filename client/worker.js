console.log('Service Worker');

self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log(data);
    console.log('Push Received');

    self.registration.showNotification(data.title, {
        body: 'Notified by Traversy Media',
    });
});