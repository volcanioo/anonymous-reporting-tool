import { collections } from '../../firebase/index';

export default function (companyObject, passcode) {
  return collections.cases
    .where("passcode", "==", passcode)
    .where("company", "==", companyObject)
    .get()
}