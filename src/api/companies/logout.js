import { auth } from '../../firebase';

export default function () {
  return new Promise((resolve, reject) => {
    auth.signOut()
    .then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  });
}