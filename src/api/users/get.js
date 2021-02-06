import { auth } from '../../firebase';

export default function () {
  return new Promise((resolve, reject) => {
    auth.currentUser.getIdToken(true)
      .then((idToken) => {
        resolve(idToken);
      }).catch(function(error) {
        reject(error);
      });
  });
}