const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})



const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

app.post('/subscribe', (req, res) => {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.bodycaptcha === null
    ) {
        return res.json({
                success: false,
                "msg": "Please tick Captcha"
                })
    }

    const secretKey = '6LehN5AUAAAAAB08luFK-zPKUdINRzz3UqGZWY-o';

    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=&${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    request(verifyUrl, (err, response, body) => {
            body = JSON.parse(body);

            if (body.sucess !== undefined && !body.success){

                return res.json({
                    success: false,
                    "msg": "Failed Captcha verification"
                    })
            }

            return res.json({
                success: true,
                "msg": "Captcha verification passed"
                })

            }
        
        ); 

})