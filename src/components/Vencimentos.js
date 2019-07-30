import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Vencimentos = (props) => {
    const registros = [{ id: '1', nome: 'Cartão Santander', data: '12/05/2020', status: 'pagar' },
    { id: '2', nome: 'Faculdade', data: '31/07/2019', status: 'pago' },
    { id: '3', nome: 'Internet', data: '08/09/2019', status: 'pagar' }
    ]
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={styles.title}>Vencimentos Próximos</Text>
            <FlatList
                data={registros}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.resgistro} >
                            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{item.data}</Text>
                            <Icon name={item.status === 'pago' ? 'check-circle' : 'times-circle'}
                                size={30} color={item.status === 'pago' ? 'green' : 'red'} />
                        </View>
                    )
                }}
            />
        </View>
    );
};

export default Vencimentos;

const styles = StyleSheet.create({
    resgistro: {
        width: '94%',
        height: 60,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: '#FFFF',
        flexGrow: 1,
        marginLeft: 12,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    title: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 5,
        color: '#fff'
    },
    containerAvatar: {
        width: 60,
        height: 60
    },
    conta: {
        alignContent: 'center'
    }
})