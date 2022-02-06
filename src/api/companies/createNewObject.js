import { algoliaIndex } from '../../firebase';

export default function (companyName, userUid) {
  return new Promise((resolve, reject) => {
    algoliaIndex.saveObjects([{
      name: companyName,
      user_uid: userUid,
    }], { autoGenerateObjectIDIfNotExist: true })
      .then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
  });
};
