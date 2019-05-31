import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ToastAndroid } from 'react-native';


export default class Informações extends Component {

    render() {
        const { total, receber } = this.props;

        let totalSemVirgula = total.replace(",", '');
        let receberSemVirgula = receber.replace(",", '');
        let sobrou = receberSemVirgula - totalSemVirgula;
        let sobrouConvert = sobrou.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.bloco}>
                        <Text style={styles.valor}>
                            <Text style={styles.real}>R$</Text> {total}
                        </Text>
                        <Text style={styles.texto}>Total Gasto no mês</Text>
                    </View>
                    <View style={styles.bloco}>
                        <Text style={styles.valor}>
                            <Text style={styles.real}>R$</Text> {receber}
                        </Text>
                        <Text style={styles.texto}>Dinheiro a receber</Text>
                    </View>
                </View>
                <View style={styles.centerCard}>
                    <Text style={styles.valor}>
                        <Text style={styles.real}>R$</Text> {sobrouConvert}
                    </Text>
                    <Text style={styles.texto}>Você tem sobrando</Text>
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
        backgroundColor: '#FFF',
        width: 190,
        height: 150,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    real: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    valor: {
        padding: 10,
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'justify',
        fontSize: 35,
        color: '#0d05a8'
    },
    texto: {
        color: '#070707'
    },
    centerCard: {
        marginTop: 30,
        height: 150,
        alignItems: 'center',
        backgroundColor: '#FFFF',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
})
