import { auth } from '../../firebase/index';

export default function (company_email, company_password, company_name, company_photo_url) {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(company_email, company_password)
    .then(userData => {
      userData.user.updateProfile({
        displayName: company_name,
        photoURL: company_photo_url,
      }).then(() => {
        auth.currentUser.sendEmailVerification();
        resolve(userData);
      }); 
    },
    err => reject(err))
  });
}