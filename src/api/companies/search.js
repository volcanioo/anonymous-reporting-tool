import { algoliaIndex } from '../../firebase';

export default function (keyword) {
  return new Promise((resolve, reject) => {
    algoliaIndex.search(keyword)
      .then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
  });
}
