import { collections } from '../../firebase/index';

export default function (payload) {
  return collections.cases.add(payload)
}