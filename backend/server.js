// libraries
const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const { db, auth } = require('./firebaseConfig');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin')


// port
const port = process.env.PORT || 3000

// middlewares
app.use(cors());
app.use(bodyParser.json()); 

//get requests 
app.get('/orgs', async (req, res) => {
  console.log("Called✅");

  try {
    const orgsSnapshot = await db.collection('orgs').get();
    const orgs = [];

    orgsSnapshot.forEach(doc => {
      orgs.push({ id: doc.id, ...doc.data() });
    });

    console.log(orgs);

    res.json(orgs);
  } catch (error) {
    console.error("Error getting orgs:", error);
    res.json({ message: "Failed to fetch organizations.", code:'error' });
  }
});

// post requests

//LOGIN
app.post('/login' , async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({message:'Email and password are required',code:'error'});
      }

    admin.auth().getUserByEmail(email)
  .then(async userRecord => {
    console.log("✅ Email exists:", userRecord.email);


    const firebaseLogin = async (email, password) => {
        try {
          console.log("Trying to log in with:", email);
      
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, returnSecureToken: true }),
            }
          );
      
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.error?.message || 'Login failed');
          }

          return data;
      
        } catch (err) {
          console.error("❌ Firebase login error:", err);
          res.json({message: err.message, code:'error'})
        }
      };
      
        try{
            const data  = await firebaseLogin(email, password)
            res.json({message:"Login Successful", redirect:'Home', token: data.idToken, code:'success' })
        }catch(err){
            console.log('miao', err);
        }
  })
  .catch(error => {
    if (error.code === 'auth/user-not-found') {
      res.json({message: "Email does not exist!", code:'error'})
      return;
    } else {
        
      console.error("rewrewError checking user:", error);
     res.json({message:error.message, code: "error"})
    }
  });
})

//REGISTER
app.post('/register', async (req,res) => {
    const {email, userName, password, confirmPassword, organization} = req.body;
    const role = 'student'

    if (!email || !userName || !password || !confirmPassword) {
      return res.json({ message: "All fields are required", code: "error" });
    }
  
    if (userName.length < 3) {
      return res.json({ message: "Username must be more than 3 characters", code: "error" });
    }
  
    if (!email.includes("@") || email.length < 5) {
      return res.json({ message: "Invalid email", code: "error" });
    }

    if(organization === null){
      return res.json({message:"Please pick your organization", code:'error'});
    }
  
    if (password !== confirmPassword) {
      return res.json({ message: "Password needs to be the same", code: "error" });
    }
      // creating new users
      try{
        const userRecord = await admin.auth().createUser({
          email,password,
          displayName:userName,
        })
      // custom roles
     const roles= await admin.auth().setCustomUserClaims(userRecord.uid, {role: role})

      await db.collection('users').doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: email,
        userName: userName,
        role: role,
        organization: organization,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })


        res.json({message:"Succesfully created an account", code:'success', redirect:'Login'})

        return
      }catch(err){
        console.log("Error creating new user: " , err);
        res.json({message: err.message, code:'error'})
        return;
      }
})

// SERVER
app.listen(port , () => {
    console.log(`Connected to port:${port}`);
})