import { useState } from 'react';
import { Text, View, Button, Alert, TextInput, ScrollView, StyleSheet } from 'react-native';

export default function VerifyScreen({ route, navigation }) {
  const { mnemonic } = route.params;
  const words = mnemonic.split(' ');

  const indices = [2, 6, 10];
  const [inputs, setInputs] = useState(Array(indices.length).fill(''));

  const handleChange = (text, i) => {
    const updated = [...inputs];
    updated[i] = text.trim();
    setInputs(updated);
  };

  const verify = () => {
    const isValid = inputs.every((val, i) => val === words[indices[i]]);
    if (isValid) {
      Alert.alert('✅ Backup successful');
      navigation.goBack();
    } else {
      Alert.alert('❌ Incorrect. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verify Mnemonic</Text>
      {indices.map((index, i) => (
        <View key={i} style={{ marginBottom: 10 }}>
          <Text>Enter word #{index + 1}:</Text>
          <TextInput
            style={styles.input}
            value={inputs[i]}
            onChangeText={(text) => handleChange(text, i)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      ))}
      <Button title="Verify" onPress={verify} />
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
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    width: 200,
  },
});
