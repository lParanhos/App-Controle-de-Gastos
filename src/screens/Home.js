import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Text, Button } from 'react-native';
import Informacoes from '../components/Informacoes';

export default class App extends Component {

  state = {
    loading: true,
    values: {}
  }

  componentDidMount() {
    this.refresh();
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
        <Button style={styles.botao} title="Atualizar"
          onPress={() => this.refresh()} />
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
  botao: {
    backgroundColor: '#0541ba',
  }
});

