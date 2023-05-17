import { db } from './utils/firebase';
import { collection, setDoc, doc, getDocs, getDoc } from 'firebase/firestore';

import BaseService from './utils/BaseService';

export default class UserService extends BaseService {
  constructor(name = 'students') {
    super();
    this.collectionName = name;
    this.collection = collection(db, this.collectionName);
  }

  async post(payload) {
    return await setDoc(doc(db, this.collectionName, payload.id), payload)
      .then(this.success)
      .catch(this.failure);
  }

  async get(id) {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef).then((data) => data);

    if (docSnap.exists()) {
      return this.success(docSnap.data());
    }

    throw this.failure({ code: 'error', message: 'User not found' });
  }
}
