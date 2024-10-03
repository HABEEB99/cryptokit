import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import CoinApi from '../modules/coin_api';
import {useQuery} from '@tanstack/react-query';
import AnimatedListItem from '../components/animated-list-item';

const coinApi = new CoinApi();

type Token = {
  name: string;
  symbol: string;
  max_supply: number;
};

const renderItems = ({index, item}) => {
  return (
    <AnimatedListItem>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text>{item.symbol}</Text>
        </View>
        <View style={{flex: 3}}>
          <Text>{item.name}</Text>
        </View>
      </View>
    </AnimatedListItem>
  );
};

const Tokens: React.FC = () => {
  const {isPending, error, data} = useQuery({
    queryKey: ['tokenList'],
    queryFn: async () => {
      const data = await coinApi.getTokens();
      if (data) {
        return data.data;
      }
    },
  });

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.header}>
            <Text style={{fontWeight: '600', fontSize: 40}}>Tokens</Text>
            <Text>Listing and manging your favourite tokens</Text>
          </View>
          {isPending ? null : (
            <View style={styles.tokenList}>
              <FlatList data={data} renderItem={renderItems} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: '700',
    marginTop: 50,
    //flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  },
  tokenList: {
    marginTop: 10,
    //flex: 1,
    width: '100%',
    //flexDirection:'row',
  },
});

export default Tokens;
