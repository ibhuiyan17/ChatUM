const functions = require('firebase-functions');
const express = require('express');

const crypto = require('crypto');

const firebase = require('firebase-admin');
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');
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

/* ---------------------------------------- Accounts ---------------------------------------- */
/* Create user if the username isn't already taken */
app.post('/create-user', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    // check that user doesn't already exist
    const usersRef = firebase.firestore().collection('users');
    const doc = await usersRef.doc(username).get();
    if (doc.exists) {
        res.status(403).send({
            'error': 'username already exists in db'
        });
        return;
    }
    // if (!doc.exists) {
    console.log('username not already in db, creating user');

    // TODO: this needs to be guaranteed different
    const newUserId = crypto.randomBytes(20).toString('hex'); // userId is calculated once 
    // TODO: hash this somehow
    const hashedPassword = password; 

    await usersRef.doc(username).set({
        'userId': newUserId,
        'password': hashedPassword,
        'courses': []
    });
    res.status(201).send();   
});

/* Login user by passing back userId */
app.get('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    
    // TODO: change this later
    const hashedPassword = password;

    const usersRef = firebase.firestore().collection('users');
    const doc = await usersRef.doc(username).get();
    if (!doc.exists) {
        res.status(404).send({
            'error': 'username not found'
        });
        return;
    }
    
    const {
        userId,
        password: storedPassword
    } = doc.data();
    if (hashedPassword === storedPassword) {
        res.status(200).send({
            'username': username,
            'userId': userId
        });
    } else {
        res.status(401).send({
            'error': 'incorrect password'
        });
    }
});


/* ---------------------------------------- Courses ---------------------------------------- */
/* Add course to courses collection if it doesn't already exist */
app.post('/create-course', async (req, res) => {
    const {
        courseId,
        name
    } = req.body;

    const coursesRef = firebase.firestore().collection('courses');
    const doc = await coursesRef.doc(courseId).get();
    if (doc.exists) {
        res.status(403).send({
            'error': 'course already exists'
        });
        return;
    }
    
    await coursesRef.doc(courseId).set({
        'name': name,
        'members': [],
    });
    res.status(201).send();
});

/* Get all courses within thr courses collection */
app.get('/all-courses', async (req, res) => {
    const coursesRef = firebase.firestore().collection('courses');
    const snapshot = await coursesRef.get();

    let courses = [];
    snapshot.forEach(courseDoc => {
        courses.push({
            id: courseDoc.id, 
            ...courseDoc.data()
        });
    });
    
    res.status(200).send(courses);    
});


exports.api = functions.https.onRequest(app);