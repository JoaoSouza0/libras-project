import { db } from './utils/firebase';
import { collection, setDoc, doc, getDocs, getDoc } from 'firebase/firestore';

import BaseService from './utils/BaseService';

export default class UserService extends BaseService {
  constructor() {
    super();
    this.collectionName = 'users';
    this.collection = collection(db, this.collectionName);
  }

  async post(payload) {
    return await setDoc(this.#factoryDoc(payload.id), payload)
      .then(this.success)
      .catch(this.failure);
  }

  async get(id) {
    const docSnap = await getDoc(this.#factoryDoc(id));

    if (docSnap.exists()) {
      return this.success(docSnap.data());
    }

    throw this.failure({ code: 'error', message: 'User not found' });
  }

  #factoryDoc(id) {
    return doc(db, this.collectionName, id);
  }
}
