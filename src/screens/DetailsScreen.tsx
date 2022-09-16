import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> {}

export const DetailsScreen = ({route, navigation}:Props) => {
  const movie = route.params
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  
  const { isLoading, movieFull, cast} = useMovieDetails(movie.id);
  return (
    <ScrollView>

      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>

          <Image source={{uri}} 
                style={styles.posterImage}/>
          
                </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>
          {movie.original_title}
        </Text>
        <Text style={styles.title}>
          {movie.title}
        </Text>
      </View>
      {
          isLoading ?
          <ActivityIndicator style={{marginTop:20}} size={35} color={'grey'} />
                    :
                    <MovieDetails movieFull={movieFull! } cast={cast} />
        }
      <TouchableOpacity style={styles.backBotton}
                        onPress={ () => navigation.pop()}>

        <Icon color={'white'}
              name='arrow-back-outline'
              
              size={50}/>
      </TouchableOpacity>
      
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  subTitle: {
    opacity: 0.8,
    fontSize: 18
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    // overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,

    elevation: 9,
  },
  posterImage: {
    flex: 1
  },
  backBotton: {
    position: 'absolute',
    elevation: 9,
    top:30,
    left: 5
  }

})