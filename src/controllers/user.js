import { DB_LIST, databaseOptions } from '../database/schema';
import { BSON } from 'realm';
const { USER } = DB_LIST;

const User = {
  create: async user => {
    try {
      const realm = await Realm.open(databaseOptions);
      //check user already exist
      const data = realm.objects(USER);
      const isUserExist = data.filtered(`email == '${user.email}'`).length > 0;
      if (isUserExist) {
        throw new Error('User already exist');
      }
      //writing user
      realm.write(() => {
        const res = realm.create(DB_LIST.USER, {
          ...user,
          id: new BSON.ObjectID(),
        });
        console.log(res);
        return user;
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
  get: async user => {
    try {
      const realm = await Realm.open(databaseOptions);
      const data = realm.objects(USER);
      const filtered = data.filtered(
        `email == '${user.email}' && password == '${user.password}'`,
      );
      if (filtered.length) {
        return {
          name: filtered[0].name,
          email: filtered[0].email,
          id: filtered[0].id,
        };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

export default User;
