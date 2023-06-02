import BaseService from './utils/BaseService';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from './utils/firebase';
import { collection, query, startAt, endAt, orderBy, getDocs, where } from 'firebase/firestore';
import { enumClassType } from '@/consts/enums';

export default class LocationService extends BaseService {
  constructor() {
    super();
  }

  async getItemByRadius(center, classType, collection) {
    const radius = 50 * 1000;
    const bounds = geohashQueryBounds(center, radius);
    const promises = [];

    for (const b of bounds) {
      const q = getDocs(
        query(
          this.#factoryCollection(collection),
          where('classType', 'in', [classType, enumClassType.bothClass]),
          orderBy('hash'),
          startAt(b[0]),
          endAt(b[1])
        )
      );
      promises.push(q);
    }

    return Promise.all(promises).then((snapshots) => {
      const matchingDocs = [];
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.get('lat');
          const lng = doc.get('lng');
          const distanceInKm = distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radius) {
            matchingDocs.push(doc.data());
          }
        }
      }
      return matchingDocs;
    });
  }

  async getStreetLocationData(cep) {
    return this.httpRequestGet('https://api.opencagedata.com/geocode/v1/json', {
      q: cep,
      key: '2014bde651c8429fb7dcffbdd7cb662d',
      language: 'en',
      pretty: 1
    })
      .then((data) =>
        !data ? this.failure({ code: 404, message: 'Street not found' }) : this.success(data.results[0])
      )
      .catch((e) => e);
  }

  #factoryCollection(name) {
    return collection(db, name);
  }
}
