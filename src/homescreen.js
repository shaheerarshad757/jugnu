import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from './apiComponent/apiComponent';

function HomeScreen() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState({});

  return (
    <View style={{flex: 1}}>
      <Api name="home" />
    </View>
  );
}

export default HomeScreen;
