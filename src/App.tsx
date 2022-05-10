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
import {getFromSQLite} from './storages/SQLite';

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
    return end - start;
  } catch (e) {
    console.error(`Failed Benchmark "${label}"!`, e);
    return 0;
  }
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const runBenchmarks = useCallback(async () => {
    await benchmark('MMKV        ', getFromMMKV);
    await benchmark('AsyncStorage', getFromAsyncStorage);
    await benchmark('SQLite      ', getFromSQLite);
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
