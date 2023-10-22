import { React, useState } from 'react';
import {Audio} from 'expo-av';
import {Text, View, Modal, TouchableOpacity, Image, Switch, StatusBar} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Font from 'expo-font'
import { styles } from './components/styles'


export default function App() {
  //Define state variable to manage the sound, playing status, and alert display
  // const [sound,setSound] = useState();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [canShowAlert, setCanShowAlert] = useState(true);

  async function loadFont(){
    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'Bitter-Regular': require('./assets/fonts/Bitter-Regular.otf'),
      'Shrikhand-Regular': require('./assets/fonts/Shrikhand-Regular.otf'),
    });
  };
loadFont();


playSound = async () => {
    const sound = new Audio.Sound();
    try {
      let source = require('./beep.mp3');
      await sound.loadAsync(source);
      await sound
      .playAsync()
      .then(async playbackStatus => {
        setTimeout(() => {
          sound.unloadAsync();
        }, playbackStatus.playableDurationMillis)
      })
      .catch(error => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }
  // //Function to load the sound asynchronously
  // const loadSound = async (alertFile) => {
  //   try {
  //     //Attempt to load the audio sound and store in a sound variable 
  //     const { sound: audioSound } = await Audio.Sound.createAsync(alertFile);
  //     //Loads the audiosound
  //     setSound(audioSound);
  //   } catch (error) {
  //     console.error('Error loading sound:', error);
  //   }
  // };
  // //A function to play the sound and show the alert message
  // const playSound = async (alertFile) => {
    
  //         await loadSound(alertFile);
  
       
  //       //We will play the sound 
  //         await sound.playAsync(alertFile);
  //       //Set the sound status playing to true
  //         setIsPlaying(true);
  //         //If alert state is true, we will show the alert message when button is played
          
  //   }
  // };
 
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [visualAlertEnabled, setVisualAlertEnabled] = useState(false);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(false);

  return (
    <>
    
    <View style={styles.container}>
      <Text style={styles.mainHeadingText}>Alert Types</Text>
      <Text style={styles.subheadingText}>VISUAL ALERT</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Enable Visual Alerts</Text>
          <Switch
            value={visualAlertEnabled}
            onValueChange={() => setVisualAlertEnabled(!visualAlertEnabled)}
            trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
        </View>


        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Visual Alert #1</Text>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              if (visualAlertEnabled) {
                setAlert1(true);
              }
            } }>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer3}>
          <Text style={styles.toggleText}>Visual Alert #2</Text>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              if (visualAlertEnabled) {
                setAlert2(true);
              }
            } }>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Text style={styles.subheadingText}>AUDIO ALERT</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Enable Audio Alerts</Text>
          <Switch
            value={audioAlertEnabled}
            onValueChange={() => 
              setAudioAlertEnabled(!audioAlertEnabled)
            }
            trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Audio Alert</Text>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              if (audioAlertEnabled) {
                setAlert3(true);
                playSound();
              }
            } }>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>

      </View>


      {/* <View style={styles.rowContainer3}>
        <Text style={styles.toggleText}>Visual Alert #3</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            if (visualAlertEnabled && audioAlertEnabled) {
              playSound(require('./beep.mp3'))
            }
            }}>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
      </View> */}
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
        onConfirmPressed={() => setAlert1(false)} />

<AwesomeAlert
           show={alert3}
           showProgress={false}
           title="Ongoing Auditory Alert"
           titleStyle={styles.alert1Text}
           message="When the auditory alert is enabled, just the audio will play. This pop-up is just to show  that the alert is working."
           messageStyle={styles.toggleText}
           showConfirmButton={true}
           confirmText="Test Again"
           confirmButtonStyle={styles.audiobutton2}
           confirmButtonTextStyle={styles.ackButtonText2}
           showCancelButton={true}
           cancelText='Got it!'
           cancelButtonStyle={styles.audiobutton1}
           cancelButtonTextStyle={styles.ackButtonText}
           onCancelPressed={() => setAlert3(false)} 
           onConfirmPressed={() => {
             if (audioAlertEnabled) {
               playSound();
             }
           }} 
       />
        
        
      <Modal visible={alert2} animationType="fade">
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
      
      {/* <Button
        title= "Audio Alert"
        color="black"
        //onPress={() => Alert.alert('Continue?')}
        onPress={() => playSound(require('./alert1.mp3'))}
        buttonStyle={styles.button}
        titleStyle={styles.text}
      /> */}

      <StatusBar style="auto" />
      
      </>
    
  );
}

