import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';


export default class Informações extends Component {

    state = {
        total: '',
        salarios: {},
    }

    componentWillMount() {
        fetch('https://projetogastos.herokuapp.com/valores')
            .then(res => res.json())
            .then(valores => this.setState({ total: valores }))

        fetch('https://projetogastos.herokuapp.com/salarios')
            .then(res => res.json())
            .then(salarios => this.setState({ salarios: salarios[0] }))
    }
    render() {

        const totalSalarios = this.state.salarios.salarioLeandro + this.state.salarios.salarioSamira
        console.log(this.state.salarios)
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.bloco}>
                        <Text style={styles.valor}>R$ {this.state.total}</Text>
                        <Text style={styles.texto}>Total Gasto no mês</Text>
                    </View>
                    <View style={styles.bloco}>
                        <Text style={styles.valor}>R$ {parseInt(totalSalarios)} </Text>
                        <Text style={styles.texto}>Dinheiro a receber</Text>
                    </View>
                </View>
                <View style={styles.center}>
                    <Text style={styles.texto}>Você tem sobrando:</Text>
                    <Text style={styles.valor}>R$ {parseInt(totalSalarios) - this.state.total}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bloco: {
        alignItems: 'center'
    },
    valor: {
        fontSize: 40,
        color: '#0d05a8'
    },
    texto: {
        color: '#070707'
    },
    center: {
        marginTop: 30,
        alignItems: 'center'
    }
})
