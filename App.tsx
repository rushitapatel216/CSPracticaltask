import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './Source/Redux/Store';
import StackNavigation from './Source/Routes/StackNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({});
