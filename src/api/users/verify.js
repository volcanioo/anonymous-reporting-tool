import { auth } from '../../firebase/index';

export default function (actionCode) {
  return auth.applyActionCode(actionCode);
}