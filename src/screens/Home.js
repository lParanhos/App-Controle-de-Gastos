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
    mes: '',
    ano: '',
    loadingCard: false,
  }

  componentDidMount() {
    const { navigation } = this.props;
    let currentMounth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    this.setState({ mes: currentMounth, ano: currentYear });
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
    this.setState({ loadingCard: true, mes });
    fetch(`https://projetogastos.herokuapp.com/dash/${mes}-${this.state.ano}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ values: data });
        this.setState({ loadingCard: false, });
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show('Erro no servidor !',
          ToastAndroid.LONG);
      })
  }

  refresh = () => {
    const { mes, ano } = this.state;
    this.setState({ loading: true })
    fetch(`https://projetogastos.herokuapp.com/dash/${mes}-${ano}`)
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
    const { loading, values, mes, loadingCard } = this.state;
    return (
      <ImageBackground style={styles.imageBackground}
        source={require('../assets/img/backGround.jpg')}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Resumo</Text>
          {loading ?
            (<ActivityIndicator size={100} color="#0000ff" />) :
            (<>
              {loadingCard ? <ActivityIndicator size={100} color="#0000ff" /> :
                <CardInfo callback={this.changeMount.bind(this)} mounth={mes ? mes : null}
                  total={values.totalGasto} receber={values.aReceber} />}
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