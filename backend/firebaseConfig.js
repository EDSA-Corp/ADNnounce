const admin = require('firebase-admin')
require("dotenv").config();

var serviceAccount = require("./servicekey/edsa-451812-firebase-adminsdk-fbsvc-5031c5a12d.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  const auth = admin.auth()
  module.exports = {db, auth}