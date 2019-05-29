import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Informacoes from '../components/Informacoes';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Informacoes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   // alignItems: 'center',
   marginTop: '50%'
  },
  center: {
    marginTop: 30,
    alignItems: 'center',
  }
});

