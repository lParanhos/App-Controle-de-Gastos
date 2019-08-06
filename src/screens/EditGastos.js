import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormGastos from '../components/FormularioGastos';

export default class EditGastos extends Component {

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemID');
        const itemLocal = navigation.getParam('itemLocal');
        const itemValor = navigation.getParam('itemValor');
        const itemParcelas = navigation.getParam('itemParcelas');
        const itemVencimento = navigation.getParam('itemVencimento');
        const aux = itemVencimento.split('/');
        const formatDate = new Date(aux[2], aux[1] - 1, aux[0])
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Adicione seu Gasto</Text>
                <FormGastos style={styles.form}
                    edit={true} id={itemId} local={itemLocal}
                    valor={itemValor} parcelas={itemParcelas}  vencimento={formatDate}/>
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