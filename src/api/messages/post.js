import { collections } from '../../firebase/index';

export default function (caseId, sender, content) {
  return collections.cases
    .doc(caseId)
    .collection("messages")
    .add({
      created: new Date(),
      sender: sender,
      content: content
    })
}