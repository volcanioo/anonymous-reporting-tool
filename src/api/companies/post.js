import { algoliaIndex } from '../../firebase';
import store from '../../store';

export default function (userUid, name, photoUrl, phoneNumber, email, generate = true) {
  return new Promise((resolve, reject) => {
    algoliaIndex.findObject((hit) => hit.userUid === userUid)
      .then(obj => {
        const objectID = obj.object.objectID

        if (!objectID) {
          console.error('no id');
          return;
        }

        algoliaIndex.saveObject({
          objectID,
          userUid,
          name,
          email,
        }, { autoGenerateObjectIDIfNotExist: generate })
          .then((response) => {
            const companyData = store.state.company;

            store.dispatch('setCompanyData', {
              ...companyData,
              company_name: name,
              company_email: email,
            });
            resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });

  });
};
