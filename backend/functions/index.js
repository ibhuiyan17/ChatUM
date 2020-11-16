const functions = require('firebase-functions');
const express = require('express');

const crypto = require('crypto');

const firebase = require('firebase-admin');
firebase.initializeApp();

const app = express();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

/* ******************************************************************************************** */
/* ---------------------------------------- API Routes ---------------------------------------- */
/* ******************************************************************************************** */

/* ---------------------------------------- Login ---------------------------------------- */

app.post('/create-user', async (req, res) => {
    const {username, password} = req.body;

    // check that user doesn't already exist
    const usersRef = firebase.firestore().collection('users');
    const dbResponse = await usersRef.where('username', '==', username).get();

    if (dbResponse.empty) {
        console.log('username not already in db, creating user');
        const newUserId = crypto.randomBytes(20).toString('hex'); // userId is calculated once 
        const hashedPassword = password; // TODO: hash this somehow

        await usersRef.doc(newUserId).set({
            'username': username,
            'password': hashedPassword,
            'courses': []
        });

        res.status(201).send();
        
    } else {
        console.log('username already exists in db');
        res.status(403).send();
    }
    // if (!doc.exists) {
    //     console.log("username doesn't already exist, adding to db");
    //     const newUserId = crypto.randomBytes(20).toString(credentials.userename);

    // } else {
    //     console.log("username already exists in db");

    // }
});


/* ---------------------------------------- Courses ---------------------------------------- */
app.get('/courses', async (req, res) => {
    const snapshot = await firebase.firestore().collection('courses').get();

    let courses = [];
    snapshot.forEach(doc => {
        // console.log(doc.data());
        courses.push(doc.data())
    });
    res.status(200).send(JSON.stringify(courses));
});

app.post('/courses', async (req, res) => {
    const course = req.body;

    await firebase.firestore().collection('courses').doc(course.code).set(course);

    res.status(200).send();
});

exports.api = functions.https.onRequest(app);