import { collections } from '../../firebase/index';

export default function (userUid, startDate, endDate) {
  return collections.cases
    .where("company.user_uid", "==", userUid)
    .where('created', '>', startDate)
    .where('created', '<', endDate)
    .get()
}
