import React, { Component } from 'react';
import { Platform, ImageBackground, StyleSheet, View, ActivityIndicator, Text, Button } from 'react-native';
import Informacoes from '../components/Informacoes';
import { withNavigationFocus } from 'react-navigation';
import CardInfo from '../components/CardInfo';
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
      <ImageBackground style={styles.imageBackground}
        source={require('../assets/papersco-s_Do9Re52y.jpg')}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Resumo</Text>
          {loading ?
            (<ActivityIndicator size={100} color="#0000ff" />) :
            (<CardInfo total={values.totalGasto} receber={values.aReceber} />)}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  titulo: {
    marginTop: 40,
    marginLeft: 30,
    fontSize: 30
  }
});

export default withNavigationFocus(App);