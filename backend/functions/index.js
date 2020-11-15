const functions = require('firebase-functions');
const express = require('express');

const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp();

const app = express();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

app.get('/', async (req, res) => {
    const snapshot = await firebaseAdmin.firestore().collection('courses').get();

    let courses = [];
    snapshot.forEach(doc => {
        // console.log(doc.data());
        courses.push(doc.data())
    });
    res.status(200).send(JSON.stringify(courses));
});

app.post('/', async (req, res) => {
    const course = req.body;

    await firebaseAdmin.firestore().collection('courses').doc(course.code).set(course);

    res.status(200).send();
});

exports.courses = functions.https.onRequest(app)