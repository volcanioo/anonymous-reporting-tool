import { collections } from '../../firebase/index';

export default function (companyId, passcode) {
  return collections.cases
    .where("passcode", "==", passcode)
    .where("company", "==", companyId)
    .get()
    .then((query) => {
      if (query) {
        query.forEach(doc => {
          localStorage.setItem('report', JSON.stringify(doc.data()));
        });
      }
    }).catch((error) => {
      console.warn(error);
    });
}