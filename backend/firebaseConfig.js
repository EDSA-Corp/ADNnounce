const admin = require('firebase-admin')
require("dotenv").config();

var serviceAccount = require("./servicekey/edsa-451812-firebase-adminsdk-fbsvc-815a27a2d8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  const auth = admin.auth()
  module.exports = {db, auth}