import { auth } from '../../firebase/index';

export default function (companyEmail, companyPassword, companyName, companyPhotoURL) {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(companyEmail, companyPassword)
    .then(userData => {
      userData.user.updateProfile({
        displayName: companyName,
        photoURL: companyPhotoURL,
      }).then(() => {
        auth.currentUser.sendEmailVerification();
        resolve(userData);
      });
    },
    err => reject(err))
  });
}
