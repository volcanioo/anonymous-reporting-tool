import { collections } from '../../firebase/index';

export default function (userUid) {
  return collections.cases
    .where("company.user_uid", "==", userUid)
    .orderBy('created')
    .get()
}
