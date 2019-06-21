import React from 'react';

import { View, StyleSheet, Text, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const ItemRecebido = (props) => {

    function handlePago(id, de, valor, ano, mes, dia ,status, callBack) {
        
        let submit = {
            De: de,
            Valor: valor,
            ano: ano,
            mes: parseInt(mes),
            dia: parseInt(dia),
            recebido: !status
        }
        console.log(submit)
        let msg = status ? 'Marcar como não recebido ?' : `Você recebeu o valor de ${valor} ?`
        Alert.alert(
            'Confirmar ',
            `${msg}`,
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sim', onPress: () => {
                        fetch(`https://projetogastos.herokuapp.com/receber/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(submit),

                        })
                            .then(res => {
                                ToastAndroid.show(`Editado com sucesso !`,
                                    ToastAndroid.LONG);
                                callBack();
                            })
                            .catch(err => {
                                console.log(err)
                                this.setState({ loading: false })
                                Alert.alert('Ops ! Problema no servidor, tente novamente em alguns instantes')
                            })
                    }
                },
            ],
            { cancelable: false },
        );
    }
    const { data, valor, de, status, id, callBack, ano, mes, dia } = props;
    return (
        <View style={styles.resgistro} >
            <View>
                <Text style={styles.de}>{de}</Text>
            </View>
            <Text style={styles.valor}>R$ {valor}</Text>
            <View style={{ alignItems: 'center' }}>
                <Text>Recebido</Text>
                <Icon
                    onPress={() => handlePago(id, de, valor, ano, mes, dia, status, callBack)}
                    name={status ? 'check-circle' : 'times-circle'}
                    size={30} color={status ? 'green' : 'red'} />
            </View>

        </View>
    );
}

export default ItemRecebido;


const styles = StyleSheet.create({
    resgistro: {
        height: 100,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: '#FFFF',
        flexGrow: 1,
        margin: 4,
        padding: 20,
        borderRadius: 10,
        elevation: 1,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    de: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#050505'
    },
    valor: {
        justifyContent: 'flex-start',
        color: '#0541ba',
        fontWeight: 'bold',
        fontSize: 25
    },
    info: {
        color: '#050505'
    },
    data: {
        fontWeight: 'bold'
    }

})