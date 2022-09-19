import React, {useCallback} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {getFromAsyncStorage} from './storages/AsyncStorage';
import {getFromMMKV} from './storages/MMKV';
import {getFromRealm} from './storages/Realm';
import {getFromSQLite} from './storages/SQLite';
import {getFromWatermelonDB} from './storages/WatermelonDB';
import {getFromMMKVEncrypted} from './storages/MMKVEncrypted';

declare global {
  const performance: {now: () => number};
}

const iterations = 1000;

async function benchmark(
  label: string,
  fn: () => unknown | Promise<unknown>,
): Promise<number> {
  try {
    console.log(`Starting Benchmark "${label}"...`);
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      const r = fn();
      if (r instanceof Promise) {
        await r;
      }
    }
    const end = performance.now();
    const diff = end - start;
    console.log(`Finished Benchmark "${label}"! Took ${diff.toFixed(4)}ms!`);
    return diff;
  } catch (e) {
    console.error(`Failed Benchmark "${label}"!`, e);
    return 0;
  }
}

async function waitForGC(): Promise<void> {
  // Wait for Garbage Collection to run. We give a 500ms delay.
  return new Promise(r => setTimeout(r, 500));
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const runBenchmarks = useCallback(async () => {
    console.log('Running Benchmark in 3... 2... 1...');
    await waitForGC();
    await benchmark('MMKV        ', getFromMMKV);
    await waitForGC();
    await benchmark('MMKV Encrypt', getFromMMKVEncrypted);
    await waitForGC();
    await benchmark('AsyncStorage', getFromAsyncStorage);
    await waitForGC();
    await benchmark('SQLite      ', getFromSQLite);
    await waitForGC();
    await benchmark('RealmDB     ', getFromRealm);
    await waitForGC();
    await benchmark('WatermelonDB', getFromWatermelonDB);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button title="Run Benchmarks" onPress={runBenchmarks} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
