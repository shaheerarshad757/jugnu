import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Counter from '../counter';

const Api = ({name, navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('gggg');
    getData();
  });

  useEffect(() => {
    //your code goes here
    return () => {
      storeData(data);
      console.log('Distructor Call');
    };
  }, []);
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      // .then(
      //   responseJson => {
      console.log(JSON.parse(jsonValue), 'hey ==>');
      if (jsonValue === '[]' || JSON.parse(jsonValue) === null) {
        console.log('14');

        // await setData(jsonValue != null ? JSON.parse(jsonValue) : null);
        fetch(
          'https://gist.githubusercontent.com/umairshaikh6405/d971bf07a7972b95caa9ff9620c56ac7/raw/c5451bdc7b239778caa900463ebca04f63628f22/gistfile1.txt',
        )
          .then(response => response.json())
          .then(json => {
            if (json['response'] == 'Record does not exist or not found') {
              console.log('2');
            } else {
              //for out of stock === false
              console.log('3');

              // setData(json.filter(json => json.out_of_stock === false));

              storeData(json);
              setData(json);

              console.log(name, '=>');
            }
          })
          .finally(() => console.log('Completed'))

          .catch(error => console.error(error));
      } else {
        setData(JSON.parse(jsonValue));
      }
      // },
      // );
    } catch (e) {
      // error reading value
    }
  };
  const renderItem = ({item, index}) =>
    name === 'home' ? (
      <View
        style={{
          borderWidth: 1,
          width: '99%',
          height: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          paddingLeft: 20,
          flexDirection: 'row',
        }}>
        <View style={{width: '70%', alignItems: 'center'}}>
          <Text>Name : {item.CategoryName}</Text>
          <Text>Price : {item.RsPrice}</Text>
        </View>

        <View
          style={{
            width: '30%',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Counter name={name} item={item} data={data} index={index} />
        </View>
      </View>
    ) : (
      item.value &&
      item.value != 0 && (
        <View
          style={{
            borderWidth: 1,
            width: '99%',
            height: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            flexDirection: 'row',
          }}>
          <View style={{width: '70%'}}>
            <Text>Name : {item.CategoryName}</Text>
            {/* <Text>Price : {item.price}</Text> */}
          </View>

          <View
            style={{
              width: '30%',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Counter name={name} item={item} data={data} index={index} />
          </View>
        </View>
      )
    );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={renderItem}
        keyExtractor={({id}, index) => id}
      />
    </View>
  );
};
export default Api;
