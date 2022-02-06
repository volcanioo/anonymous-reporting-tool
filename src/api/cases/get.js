import { collections } from '../../firebase/index';

export default function (companyId, passcode) {
  return collections.cases
    .where("passcode", "==", String(passcode))
    .get()
}
