import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Button, Pressable } from "react-native";
import  FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from "@react-native-async-storage/async-storage";


const MovieDetailsScreen = ( {navigation, route} ) => {

    //------------
     //State Variables
     //------------
    //receiving data from MovieList screen
    const {movie} = route.params;
    //receiving user logged from login screen
    const {userLogged} = route.params;
    const [imageURL, setImageURL] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [plotSummary, setPlotSummary] = useState('');
    const [id, setId] = useState('');
   
    //------------
    //Hooks
    //------------
    //Hook- initally load screen
    useEffect( () => { 

        //setting data received from List screen to present screen
        setImageURL(`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`) ;
        setTitle(movie.title);

        const rate = movie.vote_average * 10;
        setRating(`${rate}%`);
        setReleaseDate(movie.release_date);
        setPlotSummary(movie.overview);
        setId(movie.id);
  
    }, []);


    return (
        <View>
            <Image source={ {uri: imageURL} } style={styles.imgAnime}/>

            <View>
                <Text style={styles.title}>{title}</Text>
               
                <View style={styles.container}>
                        <Text style={styles.releaseDate}>{releaseDate}</Text>

                        <View style={styles.rating}>
                            <Text style={styles.title}>{rating}</Text>
                            <FontAwesome name="star" size={20} color='orangered'/>
                        </View>
                       
                </View>
                <Text style={styles.text}>Plot Summary</Text>
                <Text style={styles.plotSummary}>{plotSummary}</Text>
                <View style={styles.buttonContainer}>

              <Pressable style={styles.confirmButton}
                             onPress={ () => {
                                navigation.navigate("BuyTicket" , {title: title, uname: userLogged, id: id} )
                            }}>
                                <Text style={styles.title}>Buy Tickets</Text>

                </Pressable>
       
         <Pressable onPress={ () => {
                navigation.navigate("LoginScreen")
            }}
             style={styles.confirmButton} > 
            <Text style={styles.title} >Login or Create Account</Text>
         </Pressable>

</View>
              
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imgAnime: {
        width: '100%',
        height: 300,
        padding: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 22,
        // textAlign:'flex-start',
        fontWeight:'bold',
        marginStart: 10,
        marginBottom: 20,
    },
    releaseDate:{
        fontSize: 20,
        marginStart: 10,
      
    },
    plotSummary: {
        fontSize: 14.5,
        
        marginStart: 10,
        marginEnd: 10,


    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10,
        marginStart: 10,

    },
    container:{
       flexDirection: 'row',
       justifyContent: 'space-between'


    },
    rating: {
        flexDirection: 'row',
       
    },
    confirmButton: {
        borderWidth: 1,
        height: 55,
        width: 270,
        margin: 5,
        padding: 5,
        alignContent: 'center',
        borderColor: 'orangered',
        backgroundColor: 'orangered',
        justifyContent: 'center',
   },
   buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

   },
});

export default MovieDetailsScreen;