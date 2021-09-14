import { auth } from '../../firebase';
import { algoliaIndex } from '../../firebase';
import store from "../../store";

export default function (companyEmail, companyPassword) {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(companyEmail, companyPassword)
    .then((userCredential) => {
      auth.currentUser.getIdToken()
      .then((token) => {
        store.dispatch('saveToken', token);
        const userUid = userCredential.user.uid;
        algoliaIndex.findObject((hit) => hit.userUid === userUid).then(obj => {
          const userObject = obj.object;

          store.dispatch('setCompanyData', {
            company_email: userCredential.user.email,
            is_mail_verified: userCredential.user.emailVerified,
            userUid: userObject.userUid,
            company_name: userObject.name,
            phone_number: userObject.phoneNumber,
            photo_url: userObject.photoURL,
          });
          console.log(store.state.company)
        })
        resolve(userCredential);
      })
    }).catch((error) => {
      reject(error);
    });
  });
}