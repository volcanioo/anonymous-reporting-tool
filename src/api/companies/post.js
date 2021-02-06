import { collections } from '../../firebase';

export default function (company_name, user_uid) {
  return new Promise((resolve, reject) => {
    collections.companies.doc()
      .set({
        company_name: company_name,
        user_id: user_uid,
      }).then((doc) => {
        if (doc.exists) {
          resolve(doc.data()); // data()
        }
      }).catch((error) => {
        reject(error);
      })
  });
}