import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container}>
          <TouchableOpacity>
            <View style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Press Me</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    backgroundColor: '#6A1B4D',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  actionBtnText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#fff',
  },
});
