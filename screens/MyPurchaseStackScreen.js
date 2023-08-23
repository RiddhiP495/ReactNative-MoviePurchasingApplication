import { useEffect, useState } from "react";
import { Text, View, FlatList,StyleSheet, ActivityIndicator} from "react-native";

import { db } from "../FirebaseApp"
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";




const MainScreen = () => {

    //------------
    //State Variables
    //------------
    const [textViewRender, setTextViewRender] = useState(null);
    const [isLoading, setLoading] = useState(true);

    
    const getData = async() => {
    try{
        const querySnapshot = await getDocs(collection(db, "Your Tickets"))

        const documents = querySnapshot.docs;

        for ( let i = 0; i< documents.length; i++){
            const currDocument = documents[i];
            console.log(currDocument.data());

        }

            const textViewArray =  documents.map( (currDoc) => {
                return (
                <Text key={currDoc.id}>{currDoc.data.name}</Text>
                
                ) 
            })

            setTextViewRender(textViewArray)

    }catch (err){
        console.log(`${err.message}`)
    }
}

const renderItem = ( {item} ) => (
    <View>
       <Text>{currDoc.data.movieName}</Text>
       <Text>Num Tickets:{currDoc.data.numTickets}</Text>
       <Text backgroundColor='red'>Total Paid:{currDoc.data.total}</Text>
    </View>
      

)

    return (
        <View style={styles.container}>

            <Text style={styles.text}>Your Tickets</Text>
            {/* <FlatList data={setTextViewRender}/> */}
            {isLoading ? 
                (
                    <ActivityIndicator animating={true} size="large"/>
                ) 
                : 
                (

                    <FlatList 
                    data={setTextViewRender}
                    keyExtractor={ (item) => {return item.id}}
                    renderItem={ renderItem }
                    />
                )
            }
            { (textViewRender === null) && <Text>There is no data in the collection</Text>}
           { (textViewRender !== null) && textViewRender }
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

    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },



})



export default MainScreen;