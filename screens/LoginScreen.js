import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert} from "react-native";
import { auth } from "../FirebaseApp"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

const LoginScreen = ( {navigation, route} ) => {
 
//-----------------
// State Variable
//-----------------
const [emailAddressFromUI, setEmailAddresFromUI] = useState("")   
const [passwordFromUI, setPasswordFromUI] = useState("") 
const [userLogged, setUserLogged] = useState(false)        

//-----------------
// Hooks
//-----------------
useEffect(() => {

const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
if (userFromFirebaseAuth) {
  console.log(userFromFirebaseAuth)
  Alert.alert(`A user is signed in: ${userFromFirebaseAuth.email}`)   
  setUserLogged(true);
      
}
else {
  Alert.alert("There is no user signed in");
  setUserLogged(false);
}
})
return listener
}, [])


//-----------------
// Event Handlers
//-----------------
const createAccountPressed = async () => {
    console.log(`Create acc pressed`);
    console.log(emailAddressFromUI)
    console.log(passwordFromUI)
   
    try {
       
             const userCredential = await createUserWithEmailAndPassword(auth, emailAddressFromUI, passwordFromUI)
             console.log("Account creation success")
             console.log(userCredential)
             navigation.navigate("MovieDetailsScreen", {userLogged : true});
           } catch (err) {
             Alert.alert(`Error when creating user: ${err.code}, Message: ${err.message}`)
             console.log("Error when creating user")
             console.log(`Error code: ${err.code}`)
             console.log(`Error message: ${err.message}`)
           }

}
const loginPressed = async () => {
    console.log(`Login pressed `);
    console.log(emailAddressFromUI)
    console.log(passwordFromUI)
    
    try{
        const userCredential = await signInWithEmailAndPassword(auth, emailAddressFromUI,passwordFromUI)
        console.log(userCredential);
        navigation.navigate("MovieDetailsScreen", {userLogged : true});

    }catch (err){
        Alert.alert(`User Not Found!`)
        console.log("Error when creating user")
        console.log(`Error code: ${err.code}`)
        console.log(`Error message: ${err.message}`)
    }

}

return(
<View style={styles.container}>
    <Text style={{fontSize:25, fontWeight:"bold"}}>Login to Your Account</Text>
    <Text>You must be logged in to use this feature.</Text>
    <Text style={styles.text}>Email:</Text>
    <TextInput placeholder="Enter Email Here"
                style={styles.input}
                autoCapitalize="none"
                value={emailAddressFromUI}
                onChangeText={setEmailAddresFromUI}>
    </TextInput>

   <Text style={styles.text}>Password:</Text>
   <TextInput placeholder="Enter Password Here"
               style={styles.input}
               autoCapitalize="none"
               value={passwordFromUI}
               onChangeText={setPasswordFromUI}>
    </TextInput>

    <View style={styles.text}>
            <Button title="Login"
                    style={styles.button}
                    onPress={loginPressed}>
            </Button>
            </View>
            <View style={styles.text}>
            <Button title="Create New Account"
                    style={styles.button} 
                    onPress={createAccountPressed}>
                
            </Button>
            </View>

    
</View>
);

}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
    padding:40,
    
  },
  input: {
        height: 40,
        width: 250,
        borderWidth: 1,
        margin:1,
        padding:10,
        borderColor:"#888888"
        
  },
  text:{
    paddingTop: 20
  },

  button: {
        padding: 10,
        margin:5,   
  },
})

export default LoginScreen;