import BaseService from './utils/BaseService';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from './utils/firebase';
import { collection, query, startAt, endAt, orderBy, getDocs } from 'firebase/firestore';

export default class LocationService extends BaseService {
  constructor() {
    super();
  }

  async getItemByRadius(center = [-23.5277704, -46.7759278], collection) {
    const radius = 50 * 1000;
    const bounds = geohashQueryBounds(center, radius);
    const promises = [];

    for (const b of bounds) {
      const q = getDocs(
        query(this.#factoryCollection(collection), orderBy('hash'), startAt(b[0]), endAt(b[1]))
      );
      promises.push(q);
    }

    return Promise.all(promises).then((snapshots) => {
      const matchingDocs = [];
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.get('lat');
          const lng = doc.get('lng');
          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
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

  async getStreetLocationData(street) {
    return this.httpRequestGet('https://nominatim.openstreetmap.org/search', {
      q: street,
      format: 'json'
    })
      .then(([data]) =>
        !data ? this.failure({ code: 404, message: 'Street not found' }) : this.success(data)
      )
      .catch((e) => e);
  }

  #factoryCollection(name) {
    return collection(db, name);
  }
}
