import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCaWucohXPDHhghzdEZvZMmRfuRKD3-cF8",
  authDomain: "studentmanagement-de115.firebaseapp.com",
  databaseURL: "https://studentmanagement-de115.firebaseio.com",
  projectId: "studentmanagement-de115",
  storageBucket: "studentmanagement-de115.appspot.com",
  messagingSenderId: "48790050785",
  appId: "1:48790050785:web:0bbae86534ba68c024a4a0",
  measurementId: "G-7T0LK3ECPK",
};
// Initialize Firebase
const fire = firebase.initializeApp(config);
var db = firebase.firestore();
var org = db.collection("Org");

const SignupOrg = (fields) => {
  var user;
  firebase
    .auth()
    .createUserWithEmailAndPassword(fields["email"], fields["password"])
    .then(
      user = firebase.auth().currentUser,
      delete fields['password'],
      db.collection("Org").doc(fields["orgname"]).set({
        fields,
      })
    )
    .catch((e) => {
      console.log(e);
      SignoutUser();
    });
};



const SignupUser = (fields) => {
  var user;
  firebase
    .auth()
    .createUserWithEmailAndPassword(fields["email"], fields["password"])
    .then(
      user = firebase.auth().currentUser,
      fields["uid"] = user.uid,
      //  fields - email, password, org , isteacher, isstudent
      // college will put whether it is teacher or student
      db.collection("Org").doc(fields["orgname"]).collection(fields['Login']).doc(user.uid).set({
        fields,
      })
    )
    .catch((e) => {
      console.log(e);
      SignoutUser();
    });
};



const SignoutUser = () => {
  firebase
    .auth()
    .signOut()
    .catch((e) => {
      console.log(e);
    });
};

const LoginUser = ({ email, password }) => {

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Logged in");
    })
    .catch((e) => {
      console.log(e);
    });
};


const getUserData = async () => {
  let userId = firebase.auth().currentUser.uid;
  let fields = [];
  let ids = [];
  await org.get().then(snapshot => {
    snapshot.forEach(function (doc) {
      ids.push(doc.id)
    })
  })


  for (var i = 0; i < ids.length; i++) {
    await org.doc(ids[i]).collection('Login').get().then((snapshot) => {
      snapshot.forEach(userid => {
        if (userid.id === userId) {
          fields.push(userid.data().fields)
        }
      })
    })
  }

  return fields

}


const getUserData2 = async (userId) => {
  let fields = [];
  let ids = [];
  await org.get().then(snapshot => {
    snapshot.forEach(function (doc) {
      ids.push(doc.id)
    })
  })


  for (var i = 0; i < ids.length; i++) {
    await org.doc(ids[i]).collection('Login').where(firebase.firestore.FieldPath.documentId(), '==', userId).get().then(snapshot => {
      snapshot.docs.forEach((val) => {
        if (val.data !== undefined) {
          fields.push(val.data().fields)
        }
      })

    })
  }
  console.log(fields)

  return fields

}



const updateLogin = (fields) => {
  let userId = firebase.auth().currentUser.uid;

  org.doc(fields['org']).collection("Login").doc(userId).update(
    { fields }
  ).then(() => {
    console.log("updated")
  })
}

const storeAssign = async (fields, file) => {
  let user = firebase.auth().currentUser;
  let exist = false;
  let temp = [];
  var data = {
    [fields.class]: {
      [fields.subject]: []
    }
  }

  console.log(fields)


  await org.doc(fields['org']).collection('Assignment').doc(user.uid).get().then(doc => {
    if (doc.exists) {
      exist = true
    }
  })


  firebase
    .storage()
    .ref(`/${user.uid}/${fields.filename}`)
    .put(file)
    .then(() => {
      firebase
        .storage()
        .ref(`/${user.uid}/${fields.filename}`)
        .getDownloadURL()
        .then(async (url) => {
          data[fields.class][fields.subject].push({ url: url, description: fields['description'], due: firebase.firestore.Timestamp.fromDate(new Date(fields['duedate'])) })
          temp.push({ url: url, "description": fields['description'], "due": firebase.firestore.Timestamp.fromDate(new Date(fields['duedate'])) })
          console.log(data)
          if (!exist) {
            await org
              .doc(fields['org'])
              .collection('Assignment')
              .doc(user.uid)
              .set(
                data
              )
          }
          else {
            console.log(temp[0])
            await org
              .doc(fields['org'])
              .collection('Assignment')
              .doc(user.uid)
              .set({
                [fields['class']]: {
                  [fields['subject']]: firebase.firestore.FieldValue.arrayUnion(temp[0])
                }
              }, { merge: true })

          }
        })
        .catch((e) => {
          console.log(e);

        });
    })
    .catch((e) => {
      console.log(e);

    });

}

const getAssignTr = async (fields) => {
  let user = firebase.auth().currentUser;
  let assign = []
  await org.doc(fields['org']).collection('Assignment').doc(user.uid).get().then(doc => {
    if (doc.exists) {
      if (doc.data()[fields.class] !== undefined) {
        assign = doc.data()[fields.class][fields.subject]
      }

    }

  })

  return assign

};

const getSubAssign = async (fields) => {
  let user = firebase.auth().currentUser;
  let assign = []
  await org
    .doc(fields['org'])
    .collection('Submission')
    .doc(fields.class)
    .collection(fields.subject)
    .where('description', '==', fields.description)
    .get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        assign = doc.data().list
      })
    })

  return assign

};

const getAssign = async (fields) => {
  let assign = []
  await org.doc(fields['org']).collection('Assignment').get().then(snapshot => {
    snapshot.docs.forEach(doc => {

      assign = doc.data()[fields.class][fields.subject]
    })
  })
  console.log(assign)

  return assign

};

const getMcq = async (fields) => {
  let assign = []
  await org.doc(fields['org']).collection('Examination').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (doc.data()[fields.class] !== undefined) {
        assign = (doc.data()[fields.class][fields.subject])
      }

    })
  })
  console.log(assign)

  return assign

};

const getSubject = async (fields) => {
  let sub = [];
  let user = firebase.auth().currentUser;
  await org.doc(fields['org']).collection('Subject').doc(fields['class']).get().then(doc => {
    sub = doc.data();
  })
  return sub
}

const studentsAssign = async (fields, file) => {
  let user = firebase.auth().currentUser;
  let temp;
  let id;

  firebase
    .storage()
    .ref(`/${user.uid}/${fields.description}`)
    .put(file)
    .then(() => {
      firebase
        .storage()
        .ref(`/${user.uid}/${fields.description}`)
        .getDownloadURL()
        .then(async (url) => {
          temp = { id: user.uid, name: fields.firstname, url: url }
          await org
            .doc(fields['org'])
            .collection('Submission')
            .doc(fields['class'])
            .collection(fields['subject'])
            .where('description', '==', fields.description)
            .get().then(snapshot => {
              snapshot.docs.forEach(doc => {
                id = doc.id
              })
            })
          if (id) {
            await org
              .doc(fields['org'])
              .collection('Submission')
              .doc(fields['class'])
              .collection(fields['subject'])
              .doc(id)
              .set({
                "description": fields.description,

                "list": firebase.firestore.FieldValue.arrayUnion(temp)
              }, { merge: true })
          }
          else {
            await org
              .doc(fields['org'])
              .collection('Submission')
              .doc(fields['class'])
              .collection(fields['subject'])
              .doc()
              .set({
                "description": fields.description,

                "list": firebase.firestore.FieldValue.arrayUnion(temp)
              }, { merge: true })
          }

        })
        .catch((e) => {
          console.log(e);

        });
    })
    .catch((e) => {
      console.log(e);

    });

}

const getCalenderAssign = async (fields) => {
  let assign = []


  if (fields.isStudent) {
    await org.doc(fields['org']).collection('Assignment').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data()[fields.class] !== undefined) {
          assign.push(doc.data()[fields.class])
        }
      })
    })
  } else {
    let arr = fields.class;
    console.log(arr)
  for(var i = 0;i<arr.length;i++){
    await org.doc(fields['org']).collection('Assignment').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        if(doc.data()[arr[i]] !== undefined){
          assign.push(doc.data()[arr[i]])
        }
      })
    })
  }
}
  console.log(assign)

  return assign
}


const changePassword = (user, newPassword) => {
  firebase
    .auth()
    .currentUser
    .updatePassword(newPassword)
    .then(() => {
      console.log("Password Updated")
    })
    .catch((e) => {
      console.log(e);
    });
};


const storeMcqTest = async (fields, test) => {
  let user = firebase.auth().currentUser;
  let exist = false;
  let temp = [{
    'description': fields['description'],
    'due': firebase.firestore.Timestamp.fromDate(new Date(fields['duedate'])),
    'test': test
  }];
  var data = {
    [fields.class]: {
      [fields.subject]: []
    }
  }

  console.log(temp)

  await org
    .doc(fields['org'])
    .collection('Examination')
    .doc(user.uid)
    .set({
      [fields.class]: {
        [fields.subject]: firebase.firestore.FieldValue.arrayUnion(temp[0])
      }

    }, { merge: true })


}


const storeMcqMarks = async (fields) => {
  let user = firebase.auth().currentUser;
  let temp = { description: fields.description, marks: fields.marks }

  console.log(fields)


  await org.doc(fields['org']).collection('McqMarks').doc(fields['class']).collection(fields['subject']).doc(user.uid)
    .set({
      'list': firebase.firestore.FieldValue.arrayUnion(temp)
    }, { merge: true })


}

const storeAssignSub = async (fields) => {
  console.log(fields)
  let temp = { 'description': fields.description, 'marks': fields.marks }
  await org
    .doc(fields['org'])
    .collection('AssignmentMarks')
    .doc(fields.class)
    .collection(fields.subject)
    .doc(fields.id)
    .set({
      'list': firebase.firestore.FieldValue.arrayUnion(temp)
    }, { merge: true })

}


// const getStudentData = async(fields) => {
//   console.log(fields)
//   await org
//           .doc(fields['org'])
//           .collection('Login')
//           // .where('isStudent','==',true)
//           // .where('class','==',fields['class'])
//           .get()
//           .then( snapshot => {
//             snapshot.docs.forEach(doc =>{

//             })
//           })

// }

export default {
  db,
  fire,
  SignupOrg,
  SignupUser,
  SignoutUser,
  LoginUser,
  changePassword,
  getUserData,
  getUserData2,
  updateLogin,
  storeAssign,
  getAssignTr,
  getAssign,
  getSubject,
  studentsAssign,
  getCalenderAssign,
  storeMcqTest,
  getMcq,
  storeMcqMarks,
  getSubAssign,
  storeAssignSub,
  // getStudentData,
};




