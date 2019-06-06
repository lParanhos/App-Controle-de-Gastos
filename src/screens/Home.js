import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Text, Button } from 'react-native';
import Informacoes from '../components/Informacoes';
import { withNavigationFocus } from 'react-navigation';

class App extends Component {

  state = {
    loading: true,
    values: {}
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      this.refresh();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  refresh = () => {
    this.setState({ loading: true })
    fetch('https://projetogastos.herokuapp.com/dash')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ loading: false, values: data })
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show('Erro no servidor !',
          ToastAndroid.LONG);
      })
  }

  render() {
    const { loading, values } = this.state;
    console.log("=>", values)
    return (
      <View style={styles.container}>
        {loading ?
          (<ActivityIndicator size={100} color="#0000ff" />) :
          (<Informacoes total={values.totalGasto} receber={values.aReceber} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // alignItems: 'center',
    marginTop: 100
  },
});

export default withNavigationFocus(App);