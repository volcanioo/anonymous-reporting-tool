import { collections } from '../../firebase/index';

export default function (id, object) {
  return collections.cases.doc(id).set(object);
}