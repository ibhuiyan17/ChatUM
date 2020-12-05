const functions = require('firebase-functions');
const express = require('express');
var cors = require('cors');
const fs = require('fs');

const crypto = require('crypto');

const firebase = require('firebase-admin');

firebase.initializeApp();


const app = express();
app.use(cors({origin:true,credentials: true}));

/* ******************************************************************************************** */
/* ---------------------------------------- Query Refs ---------------------------------------- */
/* ******************************************************************************************** */
// const usersRef = firebase.firestore().collection('users');
// const coursesRef = firebase.firestore().collection('courses');
const queryRefs = {
    'users': firebase.firestore().collection('users'),
    'courses': firebase.firestore().collection('courses')
}
// initialize firestore
// initFirestore();
app.get('/init-firestore', async (req, res) => {
    console.log('initializing');
    await initFirestore();
    res.status(201).send();
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
/* ******************************************************************************************** */
/* ---------------------------------------- API Routes ---------------------------------------- */
/* ******************************************************************************************** */

/* ---------------------------------------- Accounts ---------------------------------------- */
/* Create user if the username isn't already taken */
app.post('/accounts/create-user', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    // check that username isn't already taken
    if (await getUserDocFromUsername(username) !== null) {
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
        'email': email,
        'courses': []
    });
    res.status(201).send();
});

/* Login user by passing back userId */
app.get('/accounts/login', async (req, res) => {
    const {
        username,
        password
    } = req.query;

    // TODO: change this later
    const hashedPassword = password;
    let storedDoc = await getUserDocFromUsername(username);
    if (storedDoc === null) {
        res.status(404).send({
            'error': 'username not found'
        });
        return;
    }
    console.log('hi')

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

    // check if course already exists
    const doc = await queryRefs.courses.doc(courseId).get();
    if (doc.exists) {
        res.status(403).send({
            'error': 'course already exists'
        });
        return;
    }

    await addCourseToCollection({
        courseId,
        name
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
    const { courseId } = req.body;
    const { userId } = req.query;

    console.log(userId, courseId);

    // check if user exists
    let userDoc = await getUserDocFromUserId(userId);
    if (userDoc === null) {
        res.status(404).send({
            'error': 'userId not found'
        });
        return;
    }

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    // const subscribedCoursesRef = queryRefs.users.doc(userId).collection('courses');
    const usersRef = queryRefs.users.doc(userId);
    await usersRef.update({
        'courses': firebase.firestore.FieldValue.arrayUnion(courseId)
    });
    const courseRef = queryRefs.courses.doc(courseId);
    await courseRef.update({
        'members': firebase.firestore.FieldValue.arrayUnion(userId)
    });

    console.log('course', courseId, 'added for user', userId);
    res.status(201).send();

});

app.post('/courses/unsubscribe-course', async (req, res) => {

});

app.get('/courses/subscribed-courses', async (req, res) => {
    let { userId } = req.query;

    console.log('userId', userId);
    // check if user exists
    let userDoc = await getUserDocFromUserId(userId);
    if (userDoc === null) {
        res.status(404).send({
            'error': 'userId not found'
        });
        return;
    }

    let { courses: courseIds } = userDoc.data();
    let courses = [];
    await Promise.all(courseIds.map(async courseId => {
        let courseDoc = await queryRefs.courses.doc(courseId).get()
        courses.push({
            id: courseDoc.id,
            ...courseDoc.data()
        });
    }));

    res.status(200).send(courses);

});

app.get('/courses/all-members', async (req, res) => {
    console.log('all members')
    let { courseId } = req.query;

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    let { members: userIds } = courseDoc.data();
    let members = [];
    await Promise.all(userIds.map(async userId => {
        console.log('userId', userId);
        let userDoc = await queryRefs.users.doc(userId).get();
        let { username, email } = userDoc.data()
        members.push({
            'username': username,
            'email': email
        });
    }));

    res.status(200).send(members);
});

app.get('/courses/all-members', async (req, res) => {
    console.log('all members')
    let { courseId } = req.query;

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    let { members: userIds } = courseDoc.data();
    let members = [];
    await Promise.all(userIds.map(async userId => {
        console.log('userId', userId);
        let userDoc = await queryRefs.users.doc(userId).get();
        let { username, email } = userDoc.data()
        members.push({
            'username': username,
            'email': email
        });
    }));

    res.status(200).send(members);
});


/* ---------------------------------------- Posts ---------------------------------------- */
/* Create a post as a document in the course's subcollection */
app.post('/posts/create-post/', async (req, res) => {
    const {
        courseId,
        title,
        content,
        type
    } = req.body;
    const { userId } = req.query;

    console.log(courseId, title, content, type, userId);

    // TODO: put error checks into one function
    // check if user exists
    let userDoc = await getUserDocFromUserId(userId);
    if (userDoc === null) {
        res.status(404).send({
            'error': 'userId not found'
        });
        return;
    }

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    let { username } = userDoc.data();
    let postsRef = queryRefs.courses.doc(courseId).collection('posts');
    await postsRef.add({
        'author': username,
        'title': title,
        'content': content,
        'type': type,
        'created': firebase.firestore.Timestamp.now(),
        'likes': []
    });
    console.log('post added to', courseId);

    res.status(201).send();
});

app.get('/posts/all-posts/', async (req, res) => {
    let { courseId } = req.query;

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    let postsRef = queryRefs.courses.doc(courseId).collection('posts');
    let snapshot = await postsRef.orderBy('created', 'desc').get(); // latest on top

    let posts = [];
    snapshot.forEach(postDoc => {
        posts.push({
            id: postDoc.id,
            ...postDoc.data()
        })
    });

    res.status(200).send(posts);
});

app.post('/posts/toggle-like', async (req, res) => {
    const {
        courseId,
        postId
    } = req.body;
    const { userId } = req.query;

    // check if user exists
    let userDoc = await getUserDocFromUserId(userId);
    if (userDoc === null) {
        res.status(404).send({
            'error': 'userId not found'
        });
        return;
    }

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    const postRef = queryRefs.courses.doc(courseId).collection('posts').doc(postId);
    let { likes } = (await postRef.get()).data();
    if (likes.includes(userId)) {
        // user currently liked post
        await postRef.update({
            'likes': firebase.firestore.FieldValue.arrayRemove(userId)
        });
    } else {
        // user does not currently liked post
        await postRef.update({
            'likes': firebase.firestore.FieldValue.arrayUnion(userId)
        });
    }
    res.status(201).send();
});

app.post('/comments/create-comment/', async(req, res) => {
    const {
        courseId,
        postId,
        content
    } = req.body;
    const { userId } = req.query;

    // check if user exists
    let userDoc = await getUserDocFromUserId(userId);
    if (userDoc === null) {
        res.status(404).send({
            'error': 'userId not found'
        });
        return;
    }

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    let { username } = userDoc.data();
    const commentsRef = queryRefs.courses.doc(courseId).collection('posts').doc(postId).collection('comments');
    await commentsRef.add({ // todo: add likes?
        'author': username,
        'content': content,
        'created': firebase.firestore.Timestamp.now()
    });
    res.status(201).send();
});

app.get('/comments/all-comments', async (req, res) => {
    const {
        courseId,
        postId
    } = req.query;

    // check if course exists
    let courseDoc = await getCourseDocFromCourseId(courseId);
    if (courseDoc === null) {
        res.status(404).send({
            'error': 'courseId not found'
        });
        return;
    }

    const commentsRef = queryRefs.courses.doc(courseId).collection('posts').doc(postId).collection('comments');
    let snapshot = await commentsRef.orderBy('created', 'desc').get(); // latest on top

    let comments = [];
    snapshot.forEach(commentDoc => {
        comments.push({
            id: commentDoc.id,
            ...commentDoc.data()
        })
    });

    res.status(200).send(comments);
});


/* ******************************************************************************************** */
/* ---------------------------------------- Helper Funcs. ------------------------------------- */
/* ******************************************************************************************** */
async function initFirestore() {
    console.log('initializing firestore...');
    var initialCourses = JSON.parse(fs.readFileSync('init/courses.json'));

    await Promise.all(initialCourses.map(async course => {
        await addCourseToCollection(course);
    }));

    console.log('done initializing firestore');
}

// helper function for validating userId exists within db
async function getUserDocFromUserId(userId) {
    const doc = await queryRefs.users.doc(userId).get();
    return !doc.exists ?
        null : doc;
}

async function getCourseDocFromCourseId(courseId) {
    const doc = await queryRefs.courses.doc(courseId).get();
    return !doc.exists ?
        null : doc;
}

async function getUserDocFromUsername(username) {
    const snapshot = await queryRefs.users.where('username', '==', username).get();
    return snapshot.empty ?
        null : snapshot.docs[0];
}

async function addCourseToCollection(courseObj) {
    const {
        courseId,
        name
    } = courseObj;

    let courseRef = queryRefs.courses.doc(courseId);
    await courseRef.set({
        'name': name,
        'members': [],
    });
}


exports.api = functions.https.onRequest(app);