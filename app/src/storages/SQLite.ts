import 'react-native-quick-sqlite';

const db = 'myDatabase';

const dbOpenResult = sqlite.open(db, 'databases');

// status === 1, operation failed
if (dbOpenResult.status) {
  console.error('SQLite Database could not be opened');
}

let result = sqlite.executeSql(db, 'DROP TABLE IF EXISTS Benchmark', []);
if (result.status) {
  console.error('SQLite: Failed to create table!', result);
}

sqlite.executeSql(
  db,
  'CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))',
  [],
);
sqlite.executeSql(db, 'INSERT INTO Benchmark (value) VALUES (:value)', [
  'hello',
]);

export function getFromSQLite(): string | undefined {
  let {status, rows} = sqlite.executeSql(db, 'SELECT * FROM `Benchmark`', []);
  if (rows == null || rows.length < 1) {
    throw new Error(`Failed to get Values! ${JSON.stringify(status)}`);
  }

  const row = rows.item(0);
  return row.value;
}
