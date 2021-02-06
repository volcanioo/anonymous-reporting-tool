import { collections } from '../../firebase';

export default function (user_uid) {
  return new Promise((resolve, reject) => {
    collections.companies
      .where("user_id", "==", user_uid.toString())
      .get()
      .then((queryResult) => {
        resolve(queryResult); // data()
      }).catch((error) => {
        reject(error);
      })
  });
}