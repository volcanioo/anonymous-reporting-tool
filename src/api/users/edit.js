import { auth } from '../../firebase/index';
import search from '../companies/search';
import { algoliaIndex } from '../../firebase';
import store from '../../store';

export default function (companyName) {
  const user = auth.currentUser;
  return user.updateProfile({
    displayName: companyName,
  }).then(() => {
    search(companyName).then((response) => {
      const algoliaUser = response.hits ? response.hits[0] : null;
      if (!algoliaUser) throw new Error('Company not found');
      algoliaIndex.saveObject({
        objectID: algoliaUser.objectID,
        name: companyName,
        user_id: user.uid,
      }).then(() => {
        store.dispatch('setCompanyData', {
          user_uid: user.uid,
          company_name: user.displayName,
          company_email: user.email,
          is_mail_verified: user.emailVerified,
        });
      });
    }).catch((error) => {
      console.warn(error);
    })
  });
}
