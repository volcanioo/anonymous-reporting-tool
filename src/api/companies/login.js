import { auth } from '../../firebase';
import store from "../../store";

export default function (companyEmail, companyPassword) {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(companyEmail, companyPassword)
      .then((userCredential) => {
        auth.currentUser.getIdToken()
          .then((token) => {
            store.dispatch('saveToken', token);
            resolve(userCredential);
          });
      }).catch((error) => {
        reject(error);
      });
  });
}
