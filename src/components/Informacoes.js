import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class Informações extends Component {
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.bloco}>
                        <Text style={styles.valor}>R$127,90</Text>
                        <Text style={styles.texto}>Total Gasto no mês</Text>
                    </View>
                    <View style={styles.bloco}>
                        <Text style={styles.valor}>R$1900,00</Text>
                        <Text style={styles.texto}>Dinheiro a receber</Text>
                    </View>
                </View>
                <View style={styles.center}>
                    <Text style={styles.texto}>Você tem sobrando:</Text>
                    <Text style={styles.valor}>R$1200,00</Text>
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
