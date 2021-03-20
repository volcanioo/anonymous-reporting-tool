import { collections } from '../../firebase/index';

export default function (caseId) {
  return collections.cases
    .doc(caseId)
    .collection("messages").orderBy('created')
}