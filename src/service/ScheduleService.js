import BaseService from './utils/BaseService';
import moment from 'moment';
import { db } from './utils/firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  where,
  setDoc,
  deleteDoc
} from 'firebase/firestore';

export default class ScheduleService extends BaseService {
  constructor() {
    super();
  }

  async getClasses(collectionSub, id, day) {
    return await getDocs(
      query(
        collection(db, 'users', id, collectionSub),
        where('date', '<=', new Date(moment(day).endOf('day'))),
        where('date', '>=', new Date(moment(day).startOf('day')), orderBy('date', 'desc'))
      )
    )
      .then(({ docs }) => this.success(docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
      .catch(this.failure);
  }

  async postOpenAppointments(id, payload) {
    console.log(id,payload)
    const ref = collection(db, 'users', id, 'openAppointments');
    try {
      return payload.forEach(async (document) => {
        await setDoc(doc(ref), { date: document })
          .then((docRef) => {
            console.log('Document saved with ID:', docRef.id);
          })
          .catch((error) => {
            console.error('Error saving document:', error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAppointments(id, item) {
    try {
      return await deleteDoc( doc(db, 'users', id, 'openAppointments', item))
        .then((docRef) => {
          console.log('Document deleted with ID:');
        })
        .catch((error) => {
          console.error('Error deleting  document:', error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getAppointments(collection, id, ...args) {
    return await getDocs(this.#factoryCollection(collection, id, ...args))
      .then(({ docs }) => this.success(docs.map((doc) => doc.data())))
      .catch(this.failure);
  }

  #factoryCollection(subCollection, id, ...args) {
    return collection(db, 'users', id, subCollection, ...args);
  }
}
