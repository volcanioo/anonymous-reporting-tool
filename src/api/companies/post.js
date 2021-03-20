import { algoliaIndex } from '../../firebase';

export default function (userUid, companyName, companyPhotoUrl) {
  return new Promise((resolve, reject) => {
    algoliaIndex.saveObjects([{
      userUid: userUid,
      companyName: companyName,
      companyPhotoUrl: companyPhotoUrl,
    }], { autoGenerateObjectIDIfNotExist: true })
    .then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
};