import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import CardInfo from '../components/CardInfo';
import ListaPoupanca from '../components/ListaPoupanca';
import Vencimentos from '../components/Vencimentos';
class App extends Component {

  state = {
    loading: true,
    values: {},
    mes: ''
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

  changeMount(mes) {
    console.log(mes)
    this.setState({ mes })
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
        source={require('../assets/img/backGround.jpg')}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Resumo</Text>
          {loading ?
            (<ActivityIndicator size={100} color="#0000ff" />) :
            (<>
              <CardInfo callback={this.changeMount.bind(this)} mes={this.state.mes}
                total={values.totalGasto} receber={values.aReceber} />
              <ScrollView style={{ marginTop: 10 }}
                showsVerticalScrollIndicator={false}
              >
                <ListaPoupanca />
                <Vencimentos />
              </ScrollView>
            </>
            )}
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