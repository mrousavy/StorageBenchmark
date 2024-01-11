import Realm from 'realm';

const TestSchema = {
  name: 'Test',
  properties: {
    dict: '{}',
  },
};

type Test = {
  dict: Realm.Dictionary;
};

const realm = new Realm({
  schema: [TestSchema],
  deleteRealmIfMigrationNeeded: true,
});

const object = realm.write(() => {
  realm.deleteAll();
  return realm.create<Test>('Test', {dict: {k: 'hello'}});
});

const dict = object.dict;

export function getFromRealm() {
  return dict.k;
}
