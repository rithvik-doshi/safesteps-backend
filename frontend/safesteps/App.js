
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Switch } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function App() {
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alertEnabled, setAlertEnabled] = useState(false);

  

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeadingText}>Alert Types</Text>
      <Text style={styles.subheadingText}>VISUAL ALERT</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Enable Visual Alerts</Text>
          <Switch
            value={alertEnabled}
            onValueChange={() => setAlertEnabled(!alertEnabled)}
            trackColor={{ false: '#e8e5ea', true: '#7e678f' }}
          />
        </View>
  

        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Visual Alert #1</Text>
          <TouchableOpacity style={styles.button} 
          onPress={() => {
            if (alertEnabled) {
              setAlert1(true);
            }
          }}>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.rowContainer3}>
          <Text style={styles.toggleText}>Visual Alert #2</Text>
          <TouchableOpacity style={styles.button} 
          onPress={() => {
            if (alertEnabled) {
              setAlert2(true);
              }
              }}>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AwesomeAlert
        show={alert1}
        showProgress={false}
        title="Approaching Intersection"
        titleStyle={styles.alert1Text}
        message="Look Up!"
        messageStyle={styles.alert1Text}
        showConfirmButton={true}
        confirmText="I acknowledge"
        confirmButtonStyle={styles.button2}
        onConfirmPressed={() => setAlert1(false)}
      />

      <Modal visible={alert2} animationType="slide">
        <View style={styles.alert2Container}>
          <Text style={styles.alert2Text}>Approaching</Text>
          <Text style={styles.alert2Text}>Intersection</Text>
          <Image source={require('./assets/alert.png')} style={styles.alert2Image} />
          <Text style={styles.alert2Text}>Look Up!</Text>
          <TouchableOpacity style={styles.button1} onPress={() => setAlert2(false)}>
            <Text style={styles.ackButtonText}>I acknowledge</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e5ea',
    padding: 20,
    textAlign: 'left',
  },
  mainHeadingText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 35
  },
  subheadingText: {
    color: '#52525a',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 5,
    marginBottom: 15,
    paddingHorizontal: 15, // Add padding to separate elements
  },
  boundary: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: -15
  },
  rowContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  toggleText: {
    color: '#52525a',
    fontSize: 16,
    fontWeight: '400'
  },
  button: {
    backgroundColor: '#7e678f',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  ackButtonText: {
    textAlign: 'center',
    color: '#ad5459',
    fontSize: 14,
  },
  alert2Text: {
    textAlign: 'center',
    color: '#F9FAFB',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 5,
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
  alert1Text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 5,
  },
  button1: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 50,
  },
  button2: {
    backgroundColor: '#ad5459',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
});
