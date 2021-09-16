import { auth } from '../../firebase';
import store from "../../store";

export default function () {
  store.dispatch('resetCompanyData');
  store.dispatch('resetToken');

  return auth.signOut();
}