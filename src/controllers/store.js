import { DB_LIST, databaseOptions } from '../database/schema';
import { BSON } from 'realm';
const { USER, STORE } = DB_LIST;

const Store = {
  create: store =>
    new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          //check store already exist
          const data = realm.objects(STORE);
          const isStoreExist =
            data.filtered(`name == '${store.name}'`).length > 0;
          if (isStoreExist) {
            throw new Error('Store already exist');
          }

          //writing store
          console.log(`----creating new store '${store.name}'`);

          realm.write(() => {
            const user = realm.objectForPrimaryKey(
              USER,
              new BSON.ObjectID(store.user_id),
            );
            const newStore = {
              ...store,
              id: new BSON.ObjectID(),
            };
            user.stores.push(newStore);
            resolve(newStore);
          });
        })
        .catch(reject);
    }),
  getAll: user_id =>
    new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          const user = realm.objectForPrimaryKey(
            USER,
            new BSON.ObjectID(user_id),
          );
          resolve(user.stores);
        })
        .catch(reject);
    }),
};

export default Store;
