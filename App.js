'use strict';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RouteSelection from './src/components/RouteSelection.js';
import ErrorBoundary from './src/components/ErrorBoundary.js';
//import { css } from './src/styles/main.css';


function App() {

  

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Text style={styles.title}>Koodihaaste</Text>
        <RouteSelection/>
      </View>
    </ErrorBoundary>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0D2D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:20,
    color:'#fff',
  }
});


export default App;