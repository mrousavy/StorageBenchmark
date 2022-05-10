import {appSchema, Database, Model, tableSchema} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

const TABLE = 'Test';

class TestModel extends Model {
  static table = TABLE;

  @field('value') value;
}

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TABLE,
      columns: [{name: 'value', type: 'string'}],
    }),
  ],
});

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema: schema,
});

const database = new Database({
  adapter: adapter,
  modelClasses: [TestModel],
});

const table = database.collections.get(TABLE);

const promise = database.write(async () => {
  await database.unsafeResetDatabase();
  try {
    const entry = await table.create(m => {
      m._raw.id = 'hello';
      m.value = 'hello';
    });
    console.log('WatermelonDB: Created entry');
    return entry;
  } catch (e) {
    console.error('WatermelonDB: Failed to set value!', e);
  }
});
let isCreated = false;

export async function getFromWatermelonDB(): Promise<string> {
  if (!isCreated) {
    await promise;
    isCreated = true;
  }
  const row = await table.find('hello');
  return row.value;
}
