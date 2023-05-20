import { db } from './utils/firebase';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { geohashForLocation } from 'geofire-common';

import BaseService from './utils/BaseService';

export default class UserService extends BaseService {
  constructor() {
    super();
    this.collectionName = 'users';
    this.collectionRef = collection(db, this.collectionName);
  }

  async post(payload) {
    const lat = -23.5277704;
    const lng = -46.7759278;
    const hash = geohashForLocation([lat, lng]);

    payload.lat = lat;
    payload.lng = lng;
    payload.hash = hash;

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
