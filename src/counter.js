import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Counter = ({index, item, data, name}) => {
  const [count, setCount] = useState(0);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {}
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {name === 'home' && (
          <TouchableOpacity
            onPress={() => {
              if (count >= 1) {
                data[index].value = count - 1;

                setCount(count - 1);

                storeData(data);
              }
            }}
            style={{
              backgroundColor: 'pink',
              width: 15,
              borderWidth: 1,
              alignItems: 'center',
            }}>
            <Text>-</Text>
          </TouchableOpacity>
        )}

        {data[index].value ? (
          <Text>{data[index].value}</Text>
        ) : (
          <Text>{count}</Text>
        )}

        {name === 'home' && (
          <TouchableOpacity
            onPress={() => {
              data[index].value = count + 1;

              setCount(count + 1);
              storeData(data);
              console.log(data[index], 'Counter Data');
            }}
            style={{
              backgroundColor: 'yellow',
              width: 15,
              borderWidth: 1,
              alignItems: 'center',
            }}>
            <Text>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Counter;
