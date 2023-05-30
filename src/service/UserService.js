import { db } from './utils/firebase';
import { collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { geohashForLocation } from 'geofire-common';

import BaseService from './utils/BaseService';

export default class UserService extends BaseService {
  constructor() {
    super();
    this.collectionName = 'users';
    this.collectionRef = collection(db, this.collectionName);
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

  async put(payload, id) {
    if (!payload.hash) payload.hash = geohashForLocation([payload.lat, payload.lng]);

    return await updateDoc(this.#factoryDoc(id), payload)
      .then(async () => {
        const updatedUser = await this.get(id);
        return this.success(updatedUser.body);
      })
      .catch(this.failure);
  }

  #factoryDoc(id) {
    return doc(db, this.collectionName, id);
  }
}
