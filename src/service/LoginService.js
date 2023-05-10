import { auth } from './utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import BaseService from './utils/BaseService';

export default class LoginService extends BaseService {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }

  async create() {
    return createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(this.success)
      .catch(this.failure);
  }

  async signIn() {
    return signInWithEmailAndPassword(auth, this.email, this.password)
      .then(this.success)
      .catch(this.failure);
  }
}
