import { collections } from '../../firebase/index';

export default function (passcode) {
  return collections.cases
    .where("passcode", "==", String(passcode))
    .get()
}
