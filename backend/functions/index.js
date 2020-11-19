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
  response.sendFile("index.html", {root: __dirname});
});

/* ******************************************************************************************** */
/* ---------------------------------------- Query Refs ---------------------------------------- */
/* ******************************************************************************************** */
// const usersRef = firebase.firestore().collection('users');
// const coursesRef = firebase.firestore().collection('courses');
const queryRefs = {
    'users': firebase.firestore().collection('users'),
    'courses': firebase.firestore().collection('courses')
}

/* ******************************************************************************************** */
/* ---------------------------------------- API Routes ---------------------------------------- */
/* ******************************************************************************************** */

/* ---------------------------------------- Accounts ---------------------------------------- */
/* Create user if the username isn't already taken */
app.post('/accounts/create-user', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    // check that username isn't already taken
    if (await getUserDoc(username) !== null) {
        res.status(403).send({
            'error': 'username already exists in db'
        });
        return;    
    }
    console.log('username not already in db, creating user');

    // TODO: this needs to be guaranteed different
    const newUserId = crypto.randomBytes(20).toString('hex'); // userId is calculated once 
    // TODO: hash this somehow
    const hashedPassword = password; 

    await queryRefs.users.doc(newUserId).set({
        'username': username,
        'password': hashedPassword,
        'courses': []
    });
    res.status(201).send();   
});

/* Login user by passing back userId */
app.get('/accounts/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    
    // TODO: change this later
    const hashedPassword = password;
    let storedDoc = await getUserDoc(username);
    if (storedDoc === null) {
        res.status(404).send({
            'error': 'username not found'
        });
        return;    
    }

    const userId = storedDoc.id
    const {
        password: storedPassword
    } = storedDoc.data();
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
app.post('/courses/create-course', async (req, res) => {
    const {
        courseId,
        name
    } = req.body;

    const doc = await queryRefs.courses.doc(courseId).get();
    if (doc.exists) {
        res.status(403).send({
            'error': 'course already exists'
        });
        return;
    }
    
    await queryRefs.courses.doc(courseId).set({
        'name': name,
        'members': [],
    });
    res.status(201).send();
});

/* Get all courses within thr courses collection */
app.get('/courses/all-courses', async (req, res) => {
    const snapshot = await queryRefs.courses.get();

    let courses = [];
    snapshot.forEach(courseDoc => {
        courses.push({
            id: courseDoc.id, 
            ...courseDoc.data()
        });
    });
    
    res.status(200).send(courses);    
});

/* User subscribe to course '/courses/subscribe-course?courseId={courseId}' */
app.post('/courses/subscribe-course', async (req, res) => {
    const {userId} = req.body;
    const {courseId} = req.query;
    
});

app.post('/courses/unsubscribe-course', async (req, res) => {

});

app.get('/courses/subscribed-courses', async (req, res) => {

});


/* ******************************************************************************************** */
/* ---------------------------------------- Helper Funcs. ------------------------------------- */
/* ******************************************************************************************** */
// helper function for validating userId exists within db
let userIdExists = async (userId) => {
    const doc = await queryRefs.users.doc(userId).get();
    return doc.exists;
};

let courseIdExists = async (courseId) => {
    const doc = await queryRefs.courses.doc(courseId).get();
    return doc.exists;
};

let getUserDoc = async (username) => {
    const snapshot = await queryRefs.users.where('username', '==', username).get();
    return snapshot.empty ?
        null : snapshot.docs[0];
}


exports.api = functions.https.onRequest(app);