import { DB_LIST, databaseOptions } from '../database/schema';
import { BSON } from 'realm';
const { USER, STORE, SECTION, ITEM } = DB_LIST;

const Item = {
  create: item =>
    new Promise((resolve, reject) => {
      Realm.open(databaseOptions)
        .then(realm => {
          //check store already exist
          const section = realm.objectForPrimaryKey(
            SECTION,
            new BSON.ObjectID(item.section_id),
          );
          const isItemExist =
            section.items.filtered(`name == '${item.name}'`).length > 0;
          if (isItemExist) {
            throw new Error('Item already exist');
          }

          //writing store
          console.log(`----creating new item '${item.name}'`);

          realm.write(() => {
            const newItem = {
              ...item,
              id: new BSON.ObjectID(),
            };
            section.items.push(newItem);
            resolve(newItem);
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

export default Item;
