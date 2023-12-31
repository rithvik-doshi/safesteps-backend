//Run npm install firebase
import React,{useState,useEffect} from 'react';
import { FIREBASE_DB } from './firebaseConfig';
import {doc, setDoc, addDoc, collection } from 'firebase/firestore';
import {Audio} from 'expo-av';
import {StyleSheet, Text, View, Modal, TouchableOpacity, Image, Switch ,Alert, StatusBar, TextInput} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// Ensure that Firebase is initialized only once
// if (getApps().length === 0) {
//   initializeApp(firebaseConfig);
// } 

// const db = getFirestore();

//const FeedbackCollection = db.collection('Feedback');
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
  const [visualAlertEnabled, setVisualAlertEnabled] = useState(false);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(false);

  
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
 
  const handleSubmit = async () => {
    //console.log(FIREBASE_DB);
    try {
      const docRef = doc(FIREBASE_DB,'Feedback',name);
      // await addDoc(docRef,{name,message});
      await setDoc(docRef,{name,message});
      //const docRef = await addDoc(collection(FIREBASE_DB, 'Users'), { name: name, message: message});
      console.log('Document written with ID:', docRef.id);
    }catch (error){
      console.log('This is the error',error);
    }
    // Post name and message to server
    console.log(`Name: ${name}, Message: ${message}`);

    // Send name and message to server in a POST request
    // NOTE that this is R's IP address, so we will need to change it to Firebase once
    // it's up and running
    fetch(`http://192.168.1.37:8000/form/${name}/${message}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, message })
    }
    
    // ).then(
    //   (response) => console.log(response)

    );

    // Clear inputs
    setName('');
    setMessage('');
  };

  

  return (
    <>
    
    <KeyboardAwareScrollView style={styles.container}>
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
            onValueChange={() => setAudioAlertEnabled(!audioAlertEnabled)}
            trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Audio Alert</Text>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              if (audioAlertEnabled) {
                playSound(require('./alerts/alert1.mp3'));
              }
            } }>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>

      </View>

      

      <View>
            <Text style={styles.subheadingText}>Feedback</Text>

            <View style={styles.settingsContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.toggleText}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder='Enter your name here'
                />
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.toggleText}>Message</Text>
                <TextInput
                  style={styles.input}
                  value={message}
                  onChangeText={setMessage}
                  placeholder='Enter your message here'
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>


     
      

    </KeyboardAwareScrollView>
    
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
        onConfirmPressed={() => setAlert1(false)} /><Modal visible={alert2} animationType="fade">
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

      <StatusBar style="auto" />
      
      </>
    
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
  buttonContainer: {
    flexDirection: 'row', // Make buttons horizontal
    justifyContent: 'center', // Center buttons horizontally
    marginTop: 50, // Add spacing
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