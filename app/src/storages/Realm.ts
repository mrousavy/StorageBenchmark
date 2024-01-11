import Realm from 'realm';

const TestSchema = {
  name: 'Test',
  properties: {
    _id: 'int',
    value: 'string',
  },
  primaryKey: '_id',
};

const realm = new Realm({
  schema: [TestSchema],
});

realm.write(() => {
  realm.deleteAll();
  realm.create('Test', {
    _id: 1,
    value: 'hello',
  });
});

export function getFromRealm() {
  const object = realm.objectForPrimaryKey('Test', 1);
  return object.value;
}
