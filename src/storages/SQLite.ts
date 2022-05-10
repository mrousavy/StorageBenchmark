import 'react-native-quick-sqlite';

const db = 'myDatabase';

const dbOpenResult = sqlite.open(db, 'databases');

// status === 1, operation failed
if (dbOpenResult.status) {
  console.error('SQLite Database could not be opened');
}

let result = sqlite.executeSql(db, 'DROP TABLE IF EXISTS Values', []);
if (!result.status) {
  console.log('Created Table Values');
} else {
  console.error(result);
}

sqlite.executeSql(
  db,
  'CREATE TABLE IF NOT EXISTS Values(value VARCHAR(30))',
  [],
);
sqlite.executeSql(db, 'INSERT INTO Values (value) VALUES (:value)', ['hello']);

export function getFromSQLite(): string | undefined {
  let {status, rows} = sqlite.executeSql(db, 'SELECT * FROM `values`', []);
  if (rows == null || rows.length < 1) {
    throw new Error(`Failed to get Values! ${JSON.stringify(status)}`);
  }

  return rows.item(0);
}
