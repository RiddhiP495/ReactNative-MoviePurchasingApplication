
import { View, Text, Button,StyleSheet,Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseApp"

const LogoutScreen = ({navigation, route}) => {


const logoutPressed = async () => {
    try {
        await signOut(auth,signOut)
        Alert.alert("User signed out.")
        console.log("User signed out")
       
 
                 navigation.navigate("NowPlayingScreen")
      }
      catch (err) {
        Alert.alert(`Signout failed, error occurred: ${err.message}`)
        console.log(`Error code: ${err.code}`)
        console.log(`Error message: ${err.message}`)
      }
    }

    return(
        <View style={styles.container}>
            <Text>Are you ready to Logout?</Text>
            <Button title="Logout" 
                    style={styles.button}
                    onPress={logoutPressed}>
            </Button>
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
    button: {
        padding: 10,
        margin:5,   
    },
        
    });

export default LogoutScreen;