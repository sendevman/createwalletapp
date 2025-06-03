import 'react-native-get-random-values';
import { getRandomBytes } from 'expo-random';

if (typeof global.crypto !== 'object') {
  global.crypto = {};
}

if (typeof global.crypto.getRandomValues !== 'function') {
  global.crypto.getRandomValues = (array) => {
    const bytes = getRandomBytes(array.length);
    for (let i = 0; i < array.length; i++) {
      array[i] = bytes[i];
    }
    return array;
  };
}

import { useState } from 'react';
import { Text, View, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export default function HomeScreen({ navigation }) {
  const [mnemonic, setMnemonic] = useState('');

  const createWallet = async () => {
    try {
      const newMnemonic = generateMnemonic(wordlist);
      setMnemonic(newMnemonic);
      await SecureStore.setItemAsync('mnemonic', newMnemonic);
      Alert.alert('Wallet created');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🪙 Wallet Creator</Text>

      <Button title="Create Wallet" onPress={createWallet} />

      {mnemonic ? (
        <>
          <View style={styles.mnemonicBox}>
            <Text style={styles.mnemonic}>{mnemonic}</Text>
          </View>
          <Button
            title="Backup Mnemonic"
            onPress={() => navigation.navigate('Verify', { mnemonic: mnemonic })}
          />
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  mnemonic: {
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
