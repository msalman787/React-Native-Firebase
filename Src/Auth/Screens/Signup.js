import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  //
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (email.length > 0 && password.length > 0 && name.length > 0) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        const userData = {
          id: response.user.uid,
          name: name,
          email: email,
          reg:""
        };

        // await firestore()
        //   .collection('users')
        //   .doc(response.user.uid)
        //   .set(userData);
        await database().ref("user").child(response.user.uid).set(userData)

        // await auth().currentUser.sendEmailVerification();

        // await auth().signOut();

        // alert('Please Verify YOur Email Check Out Link In Your Inbox');

        navigation.navigate('Login');
      } else {
        alert('Please Enter All Data');
      }
    } catch (err) {
      console.log(err);

      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold' , color:"#00c663"}}>
          Metahub
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={value => setName(value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleSignup()}>
          <Text style={{color: '#fff'}}>Signup</Text>
        </TouchableOpacity>

        <Text>{message}</Text>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: '#00c66c' , fontWeight:"bold"}}>Already Have An Account ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    borderColor:"#00c663",
    padding: 10,
  },
  addButton: {
    backgroundColor: '#00c663',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  signup: {
    alignItems: 'center',
  },
});