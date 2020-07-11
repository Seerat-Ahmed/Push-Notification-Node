const vapidKeys = {
    public: 'BCn1HFu7y-j3vSpOFfIij0iT_NIz3Kq9kH3RIxF2FtYuCdwAQZX5i2dLbH65KP0EjM1BfhuTtYklUMeP3JhomKg',
};

console.log('here', 'serviceWorker' in navigator)

// Check for service worker
if ('serviceWorker' in navigator) {
    send().catch((err) => {
        console.log(err);
    });
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Register SW, Push Notification, Send Push
async function send() {
    // Register Service Worker
    console.log('Registering Service Worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        'scope': '/'
    });
    console.log('Service Worker Registered');

    // Register Push
    console.log('Register Push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKeys.public)
    })
    console.log('Push Registered..');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
}