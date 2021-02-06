
import { auth } from '../firebase/index';
import { collections } from '../firebase/index';

export function userRegister(company_email, company_password) {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(company_email, company_password)
    .then((userCredential) => {
      resolve(userCredential); // user.uid
    }).catch((error) => {
      reject(error);
    });
  });
}

export function companyRegister(company_name, user_uid) {
  return new Promise((resolve, reject) => {
    collections.companies.doc()
      .set({
        company_name: company_name,
        user_id: user_uid,
      }).then((doc) => {
        if (doc.exists) {
          resolve(doc.data()); // data()
        }
      }).catch((error) => {
        reject(error);
      })
  });
}

export function companyLogout() {
  return new Promise((resolve, reject) => {
    auth.signOut()
    .then((response) => {
      resolve(response); // data()
    }).catch((error) => {
      reject(error);
    })
  });
}

export function companySignIn(company_email, company_password) {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(company_email, company_password)
    .then((userCredential) => {
      getAuthToken();
      resolve(userCredential); // user.uid
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getCompanyInfo(user_uid) {
  return new Promise((resolve, reject) => {
    collections.companies
      .where("user_id", "==", user_uid.toString())
      .get()
      .then((queryResult) => {
        resolve(queryResult); // data()
      }).catch((error) => {
        reject(error);
      })
  });
}

export function getAuthToken() {
  return new Promise((resolve, reject) => {
    auth.currentUser.getIdToken(true)
      .then((idToken) => {
        resolve(idToken);
      }).catch(function(error) {
        reject(error);
      });
  });
}