import { collections } from '../../firebase/index';

export default function (id) {
  return collections.cases.doc(id).get()
}