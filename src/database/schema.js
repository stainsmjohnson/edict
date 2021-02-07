const DB_LIST = {
  USER: 'User',
  STORE: 'Store',
  SECTION: 'Section',
  ITEM: 'Item',
};

const UserSchema = {
  name: DB_LIST.USER,
  primaryKey: 'id',
  properties: {
    id: 'objectId',
    name: { type: 'string', indexed: true },
    email: { type: 'string', unique: true },
    password: { type: 'string', required: true },
    stores: { type: 'list', objectType: DB_LIST.STORE },
  },
};

const StoreSchema = {
  name: DB_LIST.STORE,
  primaryKey: 'id',
  properties: {
    id: 'objectId',
    name: { type: 'string', indexed: true },
    sections: { type: 'list', objectType: DB_LIST.SECTION },
    isActive: { type: 'bool', default: false },
  },
};

const SectionSchema = {
  name: DB_LIST.SECTION,
  primaryKey: 'id',
  properties: {
    id: 'objectId',
    title: { type: 'string', indexed: true },
    items: { type: 'list', objectType: DB_LIST.ITEM },
  },
};

const ItemSchema = {
  name: DB_LIST.ITEM,
  primaryKey: 'id',
  properties: {
    id: 'objectId',
    name: { type: 'string', indexed: true },
    cost: { type: 'int' },
    measurementIn: { type: 'string' },
    image: { type: 'string' },
  },
};

const databaseOptions = {
  path: 'edict.realm',
  schema: [UserSchema, StoreSchema, SectionSchema, ItemSchema],
  schemaVersion: 1,
};

export { databaseOptions, DB_LIST };
