import { auth } from '../../firebase';
import getUserToken from "../users/get";

export default function (company_email, company_password) {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(company_email, company_password)
    .then((userCredential) => {
      getUserToken();
      resolve(userCredential); // user.uid
    }).catch((error) => {
      reject(error);
    });
  });
}