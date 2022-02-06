import { collections } from '../../firebase/index';

export default function (userUid) {
  return collections.cases
    .where("company.userUid", "==", userUid)
    .orderBy('created')
    .get()
}