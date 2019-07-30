import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListaPoupanca = (props) => {
    const nomes = [{ id: '1', nome: 'Leandro', valor: 'R$50,00' },
    { id: '2', nome: 'Samira', valor: 'R$100,00' }]
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={styles.title}>Poupança</Text>

            <FlatList
                data={nomes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.resgistro} >
                            <Avatar containerStyle={styles.containerAvatar}
                                rounded
                                source={require('../assets/img/logoNubank.png')}
                            />
                            <View style={styles.conta}>
                                <Text>Conta:</Text>
                                <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                            </View>
                            <Text>{item.valor}</Text>
                            <Icon name="arrow-right" size={30} />
                        </View>
                    )
                }}
            />
        </View>
    );
};

export default ListaPoupanca;

const styles = StyleSheet.create({
    resgistro: {
        width: '94%',
        height: 80,
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