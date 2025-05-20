// libraries
const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const {
  db,
  auth
} = require('./firebaseConfig');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin')
const path = require('path');
const {
  pathToFileURL
} = require('url');
const fs = require('fs')
const multer = require('multer');
const axios = require('axios')
const FormData = require('form-data');
const {
  ClientRequest
} = require('http');



// port
const port = process.env.PORT || 3000

// middlewares
app.use(cors());
app.use(bodyParser.json());

//get requests 
app.get('/orgs', async (req, res) => {
  console.log("Called orgs ---------------------------✅");

  try {
    const orgsSnapshot = await db.collection('orgs').get();
    const orgs = [];

    orgsSnapshot.forEach(doc => {
      orgs.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(orgs);
  } catch (error) {
    console.error("Error getting orgs:", error);
    res.json({
      message: "Failed to fetch organizations.",
      code: 'error'
    });
  }
});


//for single call org
app.get('/org', async (req, res) => {
  console.log("Called orgs ---------------------------✅");
  const {orgAbbr} = req.query;
  try {
    const orgsSnapshot = await db.collection('orgs').get();
    const orgs = [];
    let org;

    orgsSnapshot.forEach(doc => {
      orgs.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(orgs );

    org = orgs.filter(o => o.OrgAbbr === orgAbbr)

    res.json({message:"Successfully retrieved org", data: org, code:'success'})
    

  } catch (error) {
    console.error("Error getting orgs:", error);
    res.json({
      message: "Failed to fetch organizations.",
      code: 'error'
    });
  }
});

app.get('/userOrg', async (req, res) => {
  const {
    orgAbbr
  } = req.query;

  try {
    const snapshot = await db.collection('orgs').get();

    let found = false;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.OrgAbbr.trim() === orgAbbr.trim()) {
        found = true;
        return res.json({
          message: 'Fetch Success',
          data: data,
          code: 'success'
        });
      }
    }

    if (!found) {
      return res.json({
        message: 'Organization Does Not Exist',
        code: 'error'
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error',
      code: 'error'
    });
  }
});

app.get('/posts', async (req, res) => {
  const {
    org
  } = req.query;
  console.log('Called the posts✔️');
  console.log(org);

  try {


    const snapshot = await db.collection('posts').get();

    snapshot.forEach(e => {
      console.log(e.data());
    })
  } catch (err) {
    console.log(err);
  }
})

app.get('/adminPosts', async (req, res) => {
  const {
    org
  } = req.query;
  console.log('Called the posts✔️');
  console.log(org);

  try {


    const snapshot = await db.collection('posts').get();

    const filteredDocs = snapshot.docs
      .filter(doc => doc.id.startsWith(org.trim()))
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

    res.json({
      message: 'Successfully retrieved posts✅',
      data: filteredDocs,
      code: 'success'
    })
  } catch (err) {
    console.log(err);
  }
})

app.get('/userPosts', async (req, res) => {
  const {
    org
  } = req.query;
  console.log('Called the posts✔️');
  console.log('---',org);

  if (!org) {
    return res.status(400).json({
      message: 'Organization parameter is required',
      code: 'error'
    });
  }

  try {
    const snapshot = await db.collection('posts').get();
      console.log(snapshot.data);



    const filteredDocs = snapshot.docs
      .filter(doc => doc.id.startsWith(org.trim()))
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      console.log(filteredDocs.data);

    res.json({
      message: 'Successfully retrieved posts✅',
      data: filteredDocs,
      code: 'success'
    })
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({
      message: 'Failed to fetch posts',
      code: 'error'
    });
  }
})


app.get('/user', (req, res)=> {
  const {email} = req.query;
  console.log(email);
  console.log("User called✅");

const fetchUser = async () => {
  try {
    const userSnapshot = await db.collection('users').get();

    const userFiltered = userSnapshot.docs.filter(doc => doc.data().email === email);

    console.log(userFiltered, '---');
    
    if (userFiltered.length > 0) {
      const userData = userFiltered[0].data();
      console.log('User found:', userData);
      res.json({message:"Successfully retrieved the user", data: userData, code:'success'})
    } else {
      console.log('No user found with that email');
    }
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};

fetchUser();
})

// post requests

//LOGIN
app.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.json({
      message: 'Email and password are required',
      code: 'error'
    });
  }

  admin.auth().getUserByEmail(email)
    .then(async userRecord => {
      console.log("✅ Email exists:", userRecord.email);


      const firebaseLogin = async (email, password) => {
        try {
          console.log("Trying to log in with:", email);

          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error ?.message || 'Login failed');
          }

          return data;

        } catch (err) {
          console.error("❌ Firebase login error:", err);
          res.json({
            message: err.message,
            code: 'error'
          })
        }
      };

      try {
        const data = await firebaseLogin(email, password)

        const docRef = db.collection('users').doc(data.localId);
        const docSnap = await docRef.get();
        const decoded = jwt.decode(data.idToken)

        if (docSnap.exists) {
          let payload = docSnap.data();
          payload = {
            ...payload,
            websiteRole: decoded.role
          }

          const user = jwt.sign(payload, process.env.JWTKEY, {
            expiresIn: '24h'
          })
          const verify = jwt.verify(user, process.env.JWTKEY)

          res.json({
            message: "Login Successful",
            redirect: 'Home',
            token: user,
            code: 'success'
          })

        } else {
          console.log('No such document!');
        }

      } catch (err) {
        console.log('miao', err);
      }
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        res.json({
          message: "Email does not exist!",
          code: 'error'
        })
        return;
      } else {

        console.error("rewrewError checking user:", error);
        res.json({
          message: error.message,
          code: "error"
        })
      }
    });
})

//REGISTER
app.post('/register', async (req, res) => {
  const {
    email,
    userName,
    password,
    confirmPassword,
    organization
  } = req.body;
  const role = 'student'

  if (!email || !userName || !password || !confirmPassword) {
    return res.json({
      message: "All fields are required",
      code: "error"
    });
  }

  if (userName.length < 3) {
    return res.json({
      message: "Username must be more than 3 characters",
      code: "error"
    });
  }

  if (!email.includes("@") || email.length < 5) {
    return res.json({
      message: "Invalid email",
      code: "error"
    });
  }

  if (organization === null) {
    return res.json({
      message: "Please pick your organization",
      code: 'error'
    });
  }

  if (password !== confirmPassword) {
    return res.json({
      message: "Password needs to be the same",
      code: "error"
    });
  }
  // creating new users
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: userName,
    })
    // custom roles
    const roles = await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: role
    })

    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      userName: userName,
      role: role,
      organization: organization,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })


    res.json({
      message: "Succesfully created an account",
      code: 'success',
      redirect: 'Login'
    })

    return
  } catch (err) {
    console.log("Error creating new user: ", err);
    res.json({
      message: err.message,
      code: 'error'
    })
    return;
  }
})


// for posting
const upload = multer({
  storage: multer.memoryStorage()
}); // or diskStorage if you prefer
const imgbbApiKey = process.env.IMGBB;

console.log(imgbbApiKey);

app.post('/posts', upload.array('images'), async (req, res) => {
  const {
    title,
    text,
    org,
    postCount
  } = req.body;
  const images = req.files;
  const parsedOrg = JSON.parse(org);

  const PC = Number(postCount);

  // for the orgname
  const orgDoc = await db.collection('orgs').get();
  let id;
  let found = false;

  try {
    for (const i of orgDoc.docs) {
      const data = i.data();
      if (data.OrgAbbr === parsedOrg.OrgAbbr) {
        console.log("This is cocs", i.id);
        id = i.id;

        //to upload posts
        const postData = {
          title: title, // string
          body: text, // string
          UID: i.id, // string
          images: [
            "https://i.ibb.co/VpVqR3Pz/COCSLogo.jpg",
            "https://i.ibb.co/VpVqR3Pz/COCSLogo.jpg"
          ], // array of strings
          orgName: db.doc(`orgs/${i.id}`), // Firestore reference
          date: admin.firestore.FieldValue.serverTimestamp() // Firestore timestamp
        };

        await db.collection('posts').doc(data.OrgAbbr + `-${PC + 1}`).set(postData).then(res => {
          console.log("Successfully posted");
        })
        found = true;
          res.json({message:"Posted successfully", code:"Success"})
        return;
      }
    }

    if (found) {
      return res.json({
        message: "Success",
        code: 'Success'
      });
    } else {
      return res.status(404).json({
        message: "Organization not found",
        code: 'error'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      code: 'error'
    });
  }
});

// SERVER
app.listen(port, () => {
  console.log(`Connected to port:${port}`);
})