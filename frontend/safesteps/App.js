import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View,SafeAreaView,Alert } from 'react-native';
import {Audio} from 'expo-av';


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
 
  return (
    <View style={styles.container}>
      <Text>Welcome to SafeSteps!!</Text>
      <Button
        title= "Audio Alert"
        color="black"
        //onPress={() => Alert.alert('Continue?')}
  
        onPress={() => playSound(require('./alert1.mp3'))}
        buttonStyle={styles.button}
        titleStyle={styles.text}
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