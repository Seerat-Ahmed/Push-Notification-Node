const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const config = {
    port: 4000
};
const vapidKeys = {
    public: 'BCn1HFu7y-j3vSpOFfIij0iT_NIz3Kq9kH3RIxF2FtYuCdwAQZX5i2dLbH65KP0EjM1BfhuTtYklUMeP3JhomKg',
    private: 'NzEVQ86Xk0r96nlfudTNzEY8x5lda5X43o-ve-7Hu3s',
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

webpush.setVapidDetails('mailto:seerat@autoleap.com', vapidKeys.public, vapidKeys.private);

// Subscription Route
app.post('/subscribe', (req, res) => {
    // Get subscription object
    const subscription = req.body;
    console.log(subscription);

    // Create payload
    const payload = JSON.stringify({
        title: 'Push Test'
    });

    // Pass object into the send notification function
    webpush.sendNotification(subscription, payload)
        .catch((err) => {
            console.log(err);
        });
});

app.listen(config.port, () => {
    console.log(`Server is listening at ${config.port}`);
});