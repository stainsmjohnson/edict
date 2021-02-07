import { DB_LIST, databaseOptions } from '../database/schema';
import { BSON } from 'realm';
const { USER, STORE, SECTION } = DB_LIST;

const Section = {
  create: sec =>
    new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          //check store already exist
          const data = realm.objects(SECTION);
          const isSectionExist =
            data.filtered(`title == '${sec.title}'`).length > 0;
          if (isSectionExist) {
            throw new Error('Section already exist');
          }

          //writing store
          console.log(`----creating new section '${sec.title}'`);

          realm.write(() => {
            const store = realm.objectForPrimaryKey(STORE, sec.store_id);
            const newSection = {
              ...sec,
              id: new BSON.ObjectID(),
            };
            store.sections.push(newSection);
            resolve(newSection);
          });
        })
        .catch(reject);
    }),
  getAll: store_id =>
    new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          const store = realm.objectForPrimaryKey(STORE, store_id);
          resolve(store.sections);
        })
        .catch(reject);
    }),
};

export default Section;
