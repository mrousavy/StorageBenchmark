import Realm from 'realm';

const TestSchema = {
  name: 'Test',
  properties: {
    _id: 'int',
    value: 'string',
  },
  primaryKey: '_id',
};

const realm = (async () => {
  const r = await Realm.open({
    path: 'myrealm',
    schema: [TestSchema],
  });
  r.write(() => {
    r.deleteAll();
    r.create('Test', {
      _id: 1,
      value: 'hello',
    });
  });
  return r;
})();

export async function getFromRealm(): Promise<string> {
  const r = await realm;
  const object = r.objectForPrimaryKey('Test', 1);
  if (object == null || typeof object.value !== 'string') {
    throw new Error('RealmDB: Object not found!');
  }

  return object.value;
}
