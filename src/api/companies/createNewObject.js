import { algoliaIndex } from '../../firebase';

export default function (companyName, photoURL, userUid) {
  return new Promise((resolve, reject) => {
    algoliaIndex.saveObjects([{
      name: companyName,
      photo_url: photoURL,
      user_uid: userUid,
    }], { autoGenerateObjectIDIfNotExist: true })
      .then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
  });
};
