import Realm, { BSON } from 'realm';
import { DB_LIST, databaseOptions } from './schema';
import User from '../controllers/user';

//functions
const insert = async newItem => {
  try {
    const realm = await Realm.open(databaseOptions);
    realm.write(() => {
      realm.create(TODO_LIST_SCHEMA, {
        id: BSON.ObjectID(),
        name: '',
        createdDate: '',
      });
      console.log('SUCCESS ', newItem);
    });
  } catch (err) {
    console.log('realm insert err', err.message);
  }
};

const getAll = async () => {
  // try {
  //   const realm = await Realm.open(databaseOptions);
  //   const data = realm.objects(TODO_LIST_SCHEMA);
  //   return data;
  // } catch (err) {
  //   console.log('realm get err', err.message);
  // }

  // const user = await User.get({
  //   email: 'b@aa.com',
  //   password: 'abcd',
  // });

  // User.create({
  //   name: 'stains',
  //   email: 'b@aa.com',
  //   password: 'abcd',
  // });

  console.log(user);
};

export { User };
