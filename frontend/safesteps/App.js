import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font'
import  AwesomeAlert  from 'react-native-awesome-alerts'

export default function App() {
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Welcome to SafeSteps!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAlert1(true)}>
          <Text style={styles.buttonText1}>Alert Type #1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setAlert2(true)}>
          <Text style={styles.buttonText1}>Alert Type #2</Text>
        </TouchableOpacity>
      </View>

      <AwesomeAlert
        show={alert1}
        showProgress={false}
        title="Approaching Intersection"
        titleStyle={styles.alert1Text}
        // customView={require('./assets/alert2.png')}
        message='Look Up!'
        messageStyle={styles.alert1Text}
        showConfirmButton={true}
        confirmText="I acknowledge"
        confirmButtonStyle={styles.button2}
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setAlert1(false)}
      />
      {/* <Modal visible={alert1} transparent={true} animationType='fade'>
      <View style={styles.alert1Container}>
        <Text style={styles.alert1Text}>Approaching Intersection</Text>
        <Image source={require('./assets/alert2.png')} style={styles.alert1Image}/>
        <Text style={styles.alert1Text}>Look Up!</Text>
        <TouchableOpacity style={styles.button2} onPress={() => setAlert1(false)}>
            <Text style={styles.buttonText2}>I acknowledge</Text>
          </TouchableOpacity>
      </View>
      </Modal> */}
     

      <Modal visible={alert2} animationType="slide">
        <View style={styles.alert2Container}>
          <Text style={styles.alert2Text}>Approaching</Text>
          <Text style={styles.alert2Text}>Intersection</Text>
          <Image source={require('./assets/alert.png')}style={styles.alert2Image}/>
          <Text style={styles.alert2Text}>Look Up!</Text>
          <TouchableOpacity style={styles.button} onPress={() => setAlert2(false)}>
            <Text style={styles.buttonText1}>I acknowledge</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e678f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Make buttons horizontal
    justifyContent: 'center', // Center buttons horizontally
    marginTop: 50, // Add spacing
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 50, // Add margin between buttons
  },
  buttonText1: {
    textAlign: 'center',
    color: '#ad5459',
    fontSize: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  buttonText2: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  alert2Text: {
    textAlign: 'center',
    color: '#F9FAFB',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 5,

  },
  alert1Container: {
    width: 160,
    height: 208,
    borderRadius: 16,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  alert2Container: {
    backgroundColor: '#ad5459',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  alert2Image: {
    height: 118,
    width: 120,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  alert1Image: {
    height: 130,
    width: 150,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  alert1Text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 5,
  }, 
  button2: {
    flexDirection: 'row', // Make buttons horizontal
    justifyContent: 'center', // Center buttons horizontally
    marginTop: 50, // Add spacing
    backgroundColor: "#ad5459",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 50, // Add margin between buttons
  }
});
