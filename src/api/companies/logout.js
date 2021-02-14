import { auth } from '../../firebase';

export default function () {
  return auth.signOut();
}