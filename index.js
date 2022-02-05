const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var admin = require("firebase-admin");

// download SDK from your project and then give the path to the file
var serviceAccount = require("./scrivo-demo-firebase-adminsdk-899i6-ace98497b2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://scrivo-demo.firebaseio.com"
});

app.post("/createManager", (req, res) => {
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        displayName: req.body.displayName,
        disabled: false
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
        res.json({ success: true, uid: userRecord.uid });
    }).catch(function (error) {
        console.log("Error creating new user:", error);
        res.json({ success: false, error });
    });
})

app.post("/resetPasswordManager", (req, res) => {
    admin.auth().updateUser(req.body.uid, {
        password: req.body.password,
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user:", userRecord.toJSON());
        res.json({ success: true, message:"Successfully Changed User Password" });
    }).catch(function (error) {
        console.log("Error updating user:", error);
        res.json({ success: false, error });
    });
})

const server = http.createServer(app);
server.listen(3001, () => console.log('Server running on port 3001'));