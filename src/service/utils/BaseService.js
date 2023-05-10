import { db } from './firebase';
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';

export default class BaseService {
  constructor(name = 'Students') {
    this.collectionName = name;
    this.collection = collection(db, this.collectionName);
  }

  async post(payload) {
    return await setDoc(doc(db, this.collectionName, payload.id), payload)
    .then(this.success)
    .catch(this.failure);
  }

  getAll() {
    return getDocs(this.collection).then((data) => data);
  }

  failure({ code, message }) {
    throw { success: false, code, message };
  }

  success(body = {}) {
    return {
      body: body,
      success: true
    };
  }
}
