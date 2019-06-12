import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormGastos from '../components/FormularioGastos';

export default class AddGastos extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Adicione seu Gasto</Text>
                <FormGastos style={styles.form}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, title: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 25
    },
    form: {
        justifyContent: 'space-between'
    }
})