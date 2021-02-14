import { auth } from '../../firebase';
import store from "../../store";

export default function (company_email, company_password) {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(company_email, company_password)
    .then((userCredential) => {
      auth.currentUser.getIdToken()
      .then((token) => {
        store.dispatch('saveToken', token);
      }).catch((error) => {
        reject(error);
      });
      resolve(userCredential);
    }).catch((error) => {
      reject(error);
    });
  });
}