import { reload } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Button, Alert} from "react-native";
import { db } from "../FirebaseApp"
import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const BuyTicketScreen = ( {navigation, route} ) => {

     //------------
     //State Variables
     //------------
     //receiving data from movie details screen
      const {title, id} = route.params;
     //  const {userLogged} = route.params;
      const [count, setCount] = useState(0);
      const [name, setName] = useState('');

      const [loggedInUser, setLoggedInUser] = useState(null);
     //to disable view of Order summary
     const [viewToRender, setViewToRender] = useState();
     const Tax = (( count * 12) * 0.13).toFixed(2);
     const subTotals = ( count * 12).toFixed(2);
     const Total = ( ( count * 12) + (( count * 12) * 0.13)).toFixed(2);






     const decrease = () => {
          if(count > 0) {
             setCount(count => count - 1);
          }
     }
     const increase = () => {
            setCount(count => count + 1);
     }

     //------------
     //Event Handlers
     //------------
     const onConfirmPress = async () => {

          try{
               
               const ticketToInsert = {
                    movieID: id,
                    movieName: title,
                    nameOnPurchase: name,
                    numTickets: count,
                    total: Total,
          
               }

               const insertDoc = await addDoc(collection(db, "Your Tickets"), ticketToInsert)
          
          }
          catch (err){
               console.log(`${err.message}`)
          }

          Alert.alert(`Purchase Success!`);
     }
     
     //------------
     //Hooks
     //------------
     useEffect( () => {
          
          const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
               if (userFromFirebaseAuth) {
                 console.log(userFromFirebaseAuth)
               //   Alert.alert(`A user is signed in: ${userFromFirebaseAuth.email}`) 
                 // set the state variable
                 setLoggedInUser(userFromFirebaseAuth)     
               }
               else {
               //   Alert.alert("There is no user signed in");
                 setLoggedInUser(null)
               }
             })
           

          if (count != 0) {


               setViewToRender(
                   <View style={styles.containers} >
                         <Text style={styles.heading}>
                              Order Summary

                         </Text>

                         <Text style={styles.title} >
                              Name of Movie: {title} 
                         </Text>
                    

                         <Text style={styles.title} >
                              Number of Selected Tickets: {count} 
                         </Text>

                         <Text style={styles.title} >
                              SubTotal: {subTotals} 
                         </Text>

                         <Text style={styles.title} >
                              Tax: {Tax} 
                         </Text>

                         <Text style={styles.title} >
                              Total: {Total}
                         </Text>

                         <Pressable onPress={onConfirmPress}
                                             style={styles.confirmButton} > 
                                             <Text style={styles.title} >Confirm Purchase</Text>
                                   </Pressable>
                     </View>
                )
               
          }
          return listener
     }, [])



    return(
        
            <View style={styles.container}>
                    <Text style={styles.heading}>Buy Tickets</Text>

                    <Text style={styles.title} >Title: {title}</Text>

                    <View style={styles.containers} >
                         <Text style={styles.text}>Your Email address:</Text>

                     { (loggedInUser !== null) && <Text style={{fontSize:20}}>{loggedInUser.email}</Text>}


                         <Text style={styles.text}>
                              Your Name:
                         </Text>
                         <TextInput placeholder="Enter Name Here"
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.input}
                                    
                         />
                         <Text style={styles.text}>Number of Tickets:</Text>
                         
                         <View style={styles.counter}>
                                   <Pressable onPress={decrease} 
                                            style={styles.pressable}>
                                             <Text>-</Text>
                                   </Pressable>

                                   <Text style={styles.pressable}>
                                        {count}
                                   </Text>

                                   <Pressable onPress={increase}
                                             style={styles.pressable} > 
                                             <Text>+</Text>
                                   </Pressable>
                         </View>   
                        
                    </View>

                    {viewToRender} 
             </View>
    
    )
}



const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
    padding:40,
    alignItems: "center"
   },
   heading: {
        fontWeight: 'bold',
        fontSize: 25,
   },
   title: {
        fontSize: 20,
     

   }, 
   input: {
     height: 40,
     width: 250,
     borderWidth: 1,
     margin:15,
     padding:10,
     borderColor:"#888888"
   },
    containers:{
          flex: 1,
          backgroundColor: '#fff',
          textAlign: "flex-start",
          marginTop: 20,
          padding:20,
          alignItems: "justify"
    },
    text: {
      fontSize: 15,
    },
    counter: {
     flexDirection: 'row', 
     justifyContent: 'space-around',
     padding: 10,
     
    },
pressable: {
     borderWidth: 1,
     margin: 10,
     padding: 10,
     borderColor: 'orangered'
},
heading: {
     fontSize: 20,
     fontWeight: 'bold',
},
confirmButton: {
     borderWidth: 1,
     margin: 10,
     padding: 10,
     borderColor: 'orangered',
     backgroundColor: 'orangered'
}

}




)
export default BuyTicketScreen;
