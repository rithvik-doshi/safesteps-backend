import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View,SafeAreaView,Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title= "Press Me"
        color="#979797"
        onPress={() => Alert.alert('Continue?')}
        // disabled
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
