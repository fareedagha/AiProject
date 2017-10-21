const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs')
const Speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');
// const request = require('request');

let speechClient = Speech({
    projectId: 'ef0a8fc4bcf9f86665fdd1ccbe23117e52343a5f'
})
const client = new language.LanguageServiceClient();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

function speecgController(req, res, nxt) {
    // console.log("In speeh functios")
    let audioBytes = fs.readFileSync('./b.mp3');
    console.log("Got audio", audioBytes)

    audioBytes = audioBytes.toString('base64')
    // console.log("Got audio", audioBytes)
    const audio = {
        content: audioBytes
    };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 44100,
        languageCode: 'en-US'
    };
    const request = {
        audio: audio,
        config

    };
    speechClient.getProjectId((err, res) => {
        console.log("getProjectId Err", err)
        console.log("getProjectId", res)
    })
    speechClient.recognize(request)
        .then((data) => {
            const response = data;

            console.log('response Data : ', response);
            // request({
            //     method: 'POST',
            //     uri: '/api/language',
            //     data: {
            //         response
            //     }
            // })
            res.json(response)

        })
        .catch((err) => {
            console.log('ERROR:', err);
            res.json(err)
        });

}

function languageController(req, res, nxt) {


    // // The text to analyze
    console.log("Request body", req.body.respone)
    // const text = 'Yahoo!';
    const text = req.body.respone;
    // let textnew = req.body.response;
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // // Detects the sentiment of the text
    client
        .analyzeSentiment({
            document: document
        })
        .then(results => {
            const sentiment = results[0].documentSentiment;
            console.log("Data :    ", results)
            console.log(`Text: ${text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
            res.json(results)
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

app.use('/api/speech', speecgController);

app.post('/api/language', languageController)




app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running")
})