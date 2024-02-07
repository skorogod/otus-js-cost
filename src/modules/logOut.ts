import { logOut } from "../../firebase/firebase";

export function myLogOut(e: Event) {
  e.preventDefault();
  logOut();
}
