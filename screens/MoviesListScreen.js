import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { FontAwesome } from '@expo/vector-icons'; 

import AsyncStorage from "@react-native-async-storage/async-storage";




const MoviesListScreen = ( {navigation, route} ) => {

    //------------
    //State Variables
    //------------
    const [movieData, setMovieData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    //------------
     //Hooks
     //------------
    //Hook - to initially load screen
    useEffect( () => { getMovieFromAPI() }, []);

//Helper function for Calling API
    const getMovieFromAPI = () => {

        const apiURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=749249c7d62ac367cf76fd1e4dd9f7d5&%20language=en-US&page=1&region=CA`;
        console.log(apiURL);

        return fetch(apiURL)
        .then( (response) => response.json()
                            .then( (jsonData) => {
                                setMovieData(jsonData.results); 
                                console.log(`Response JSON Data : ${jsonData.results.length}`);
                            })
                            .catch( (err) => {console.log(`Error while getting json from response : ${err}`);} )
                            .finally( () => setLoading(false) )
        )
        .catch( (err) => {console.log(`Error while getting response from server : ${err}`);} )
        .finally( () => setLoading(false) );

    }

    //Helper function for Flatlist to render items in list
    const renderItem = ( {item} ) => (
        <TouchableOpacity onPress={ () => {
            console.log(`going to details screen, movie title: ${item.title}`);

            //navigation and sending item data from Api to detail screen
            navigation.navigate("MovieDetailsScreen", {movie: item});
        }
        }
        >
            <View style={styles.listItem}>
                <View style={styles.movieInfo}>
                    <Text style={styles.title}> {item.title} </Text>
                    <Text style={styles.releaseDate}> Release Date: {item.release_date}</Text>
                </View>

                <FontAwesome name="angle-right" size={30} color="orangered"/>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Now Playing</Text>

            {isLoading ? 
                (
                    //To specify loading on page
                    <ActivityIndicator animating={true} size="large"/>
                ) 
                : 
                (

                    <FlatList 
                    data={movieData}
                    keyExtractor={ (item) => {return item.id}}
                    renderItem={ renderItem }
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    screenTitle: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    listItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20, 
        borderBottomColor: '#D6D6D6', 
        borderBottomWidth: 1,
    },
    movieInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight:'bold',
    },
    releaseDate: {
        fontSize: 15,
    }
  });

export default MoviesListScreen;