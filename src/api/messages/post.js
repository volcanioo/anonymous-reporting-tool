import { collections, firebase } from '../../firebase/index';

export default function (caseId, sender, content) {
  return collections.cases
    .doc(caseId)
    .collection("messages")
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      sender: sender,
      content: content
    })
}