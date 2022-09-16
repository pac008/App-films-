import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Button, Dimensions, Text, View, FlatList, ScrollView } from 'react-native'

import Carousel from "@sergiorj/react-native-snap-carousel";
import ImageColors from 'react-native-image-colors'
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColor } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';


const {width: windowWidth} = Dimensions.get('window')

export const HomeScreen = () => {
  const { top }  = useSafeAreaInsets(); 
  const { NowPlaying, isLoading, popular, topRated, upcoming } = useMovies();
  const {setMainColor} = useContext(GradientContext)
  const getPosterColors = async (index:number) => {
    const uri = `https://image.tmdb.org/t/p/w500${NowPlaying[index].poster_path}`
    const [primary = 'green', secondary = 'orange'] = await getImageColor(uri);
    setMainColor({primary, secondary})
  }

  useEffect(() => {
    if ( NowPlaying.length > 0) {
      getPosterColors(0)
    }
  }, [NowPlaying])
  
  if ( isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    )
  }

  return (

    <GradientBackground>
      <ScrollView>

        <View style={{
          marginTop: top + 20
        }}>
          {/* Carrusel principal */}
          <View style={{ height: 440}}>
            <Carousel data={NowPlaying!}
                      renderItem={ ({item}) => <MoviePoster movie={item} /> }
                      sliderWidth={windowWidth}
                      inactiveSlideOpacity={0.9}
                      itemWidth={300}
                      onSnapToItem={ index => getPosterColors(index)}
                      />
          </View>

          {/* Películas populares */}
          <HorizontalSlider title='Popular' movies={popular!}/>
          <HorizontalSlider title='Top Rated' movies={topRated!}/>
          <HorizontalSlider title='Upcoming' movies={upcoming!}/>
          {/* <Button 
            title='Ir detalle'
            onPress={ () => naviagtion.navigate('DetailsScreen')}
          /> */}

        </View>
      </ScrollView>
    </GradientBackground>
  )
}
