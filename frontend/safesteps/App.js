import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Audio} from 'expo-av';
import {Button, StyleSheet, Text, View, SafeAreaView, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font'
import  AwesomeAlert  from 'react-native-awesome-alerts'

export default function App() {
  //Define state variable to manage the sound, playing status, and alert display
  const [sound,setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [canShowAlert, setCanShowAlert] = useState(true);

  //Function to load the sound asynchronously
  const loadSound = async (alertFile) => {
    try {
      //Attempt to load the audio sound and store in a sound variable 
      const { sound: audioSound } = await Audio.Sound.createAsync(alertFile);
      //Loads the audiosound
      setSound(audioSound);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };
  //A function to play the sound and show the alert message
  const playSound = async (alertFile, alertMessage) => {
    //If the sound is playing, we will stop the sound
    if (isPlaying) {
      try {
        await sound.stopAsync();
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
      //Set the state status to false meaning sound is not playing
      setIsPlaying(false);
    } else {
      //If there is no sound loaded, we will load sound with our audio file
        if (!sound) {
          // Load the sound if it's not already loaded
          await loadSound(alertFile);
        }
        try {
        //We will play the sound 
          await sound.playAsync();
        //Set the sound status playing to true
          setIsPlaying(true);
          //If alert state is true, we will show the alert message when button is played
          if (canShowAlert) {
            //The alert will pop up from the app
            Alert.alert(
              //The message that will show up when button is pressed
              'Approaching Intersection!',alertMessage,[{
                  text: 'Stop',
                //When message is acknowledged, we will stop the sound from playing
                  onPress: async () => {
                    try {
                      await sound.stopAsync();
                    } catch (error) {
                      console.error('Error stopping sound:', error);
                    }
                  //Set the playing status to false
                    setIsPlaying(false);
                  },},],{ cancelable: false });
            //The alert will not be shown
            setCanShowAlert(false);
            //Set a timer to show the alert and play the sound after 1 second
            setTimeout(() => {
              setCanShowAlert(true);
            }, 1000); // 5 seconds
          }
        } catch (error) {
          console.error('Error playing sound:', error);
        }
    }
  };
 
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

        <TouchableOpacity style={styles.button} onPress={() => playSound(require('./beep.mp3'))} >
          <Text style={styles.buttonText1}>Alert Type #3</Text>
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

    
      {/* <Button
        title= "Audio Alert"
        color="black"
        //onPress={() => Alert.alert('Continue?')}
        onPress={() => playSound(require('./alert1.mp3'))}
        buttonStyle={styles.button}
        titleStyle={styles.text}
      /> */}

      <StatusBar style="auto" />
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
    flexWrap: 'wrap',
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