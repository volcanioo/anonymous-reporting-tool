import { auth } from '../../firebase/index';

export default function (company_email, company_password) {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(company_email, company_password)
    .then((userCredential) => {
      resolve(userCredential); // user.uid
    }).catch((error) => {
      reject(error);
    });
  });
}