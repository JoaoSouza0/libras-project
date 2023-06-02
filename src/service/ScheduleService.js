import BaseService from './utils/BaseService';
import moment from 'moment';

import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from './utils/firebase';
import {
  doc,
  collection,
  query,
  startAt,
  endAt,
  orderBy,
  getDocs,
  where
} from 'firebase/firestore';
import { enumClassType } from '@/consts/enums';

export default class ScheduleService extends BaseService {
  constructor() {
    super();
  }

  async getClasses(collectionSub, id, day) {
    return await getDocs(
      query(
        collection(db, 'users', id, collectionSub),
        where('date', '<', new Date(moment(day).endOf('day'))),
        where('date', '>', new Date(moment(day).startOf('day')))
      )
    )
      .then(({ docs }) => this.success(docs.map((doc) => doc.data())))
      .catch(this.failure);
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
