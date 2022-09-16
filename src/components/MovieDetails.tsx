import React from 'react'
import { FlatList, Text, View } from 'react-native';
import currencyFormatter from 'currency-formatter';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditInterface';
import { MovieFull } from '../interfaces/movieInterface';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

export const MovieDetails = ({movieFull, cast}:Props) => {
  return (
    <>
        {/* deTALLES */}
        <View style={{marginHorizontal:20}}>
            <View style={{flexDirection:'row' }}>
                <Icon name='star-outline' color={'grey'} size={16} />
                <Text>{movieFull.vote_average }</Text>
                <Text style={{marginLeft: 5}}> 
                    - {movieFull.genres.map(g =>g.name).join(', ') }
                </Text>
            </View>
            {/* hISTORIRE */}
            <Text style={{marginTop:20, fontWeight: 'bold', fontSize: 23}}>
                Historia
            </Text>
            <Text style={{fontSize:16}}>
                {movieFull.overview}
            </Text>
            <Text style={{marginTop:20, fontWeight: 'bold', fontSize: 23}}>
                Presupuesto
            </Text>
            <Text style={{fontSize:18}}>
                {currencyFormatter.format( movieFull.budget, {code: 'USD'})}
            </Text>
        </View>
        {/* casting */}
        <View style={{marginTop:10, marginBottom: 100}}>
        <Text style={{marginTop:20, fontWeight: 'bold', fontSize: 23, marginHorizontal:20}}>
                Actores
            </Text>
            <FlatList data={cast}
                      keyExtractor={(item) => item.id.toString()} 
                      horizontal={true}
                      renderItem={({item}) => <CastItem actor={item} /> } 
                      style={{marginTop:10, height: 70}}/>
              
        </View>
    </>
  )
}
