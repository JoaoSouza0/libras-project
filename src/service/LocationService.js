import BaseService from './utils/BaseService';
import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { db } from './utils/firebase';
import { collection, query, startAt, endAt, orderBy, getDocs } from 'firebase/firestore';

export default class LocationService extends BaseService {
  constructor(name) {
    super();
    this.collectionName = name;
    this.collectionRef = collection(db, this.collectionName);
  }

  async getByRadius(center = [-23.5277704, -46.7759278]) {
    const radius = 50 * 1000;
    const bounds = geohashQueryBounds(center, radius);
    const promises = [];

    for (const b of bounds) {
      const q = getDocs(query(this.collectionRef, orderBy('hash'), startAt(b[0]), endAt(b[1])));
      promises.push(q);
    }

    return Promise.all(promises)
      .then((snapshots) => {
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
      })
  }

  async signIn() {
    /* return signInWithEmailAndPassword(auth, this.email, this.password)
      .then(this.success)
      .catch(this.failure); */
  }

  async signOut() {
    /* return signOut(auth)
    .then(this.success)
    .catch(this.failure); */
  }

  async verifyUser() {
    return; /* onAuthStateChanged(auth); */
  }
}
