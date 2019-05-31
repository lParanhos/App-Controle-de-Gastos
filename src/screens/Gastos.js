import React, { Component } from 'react';
import {
    View, Text, FlatList, StyleSheet, TouchableOpacity,
    Alert, ToastAndroid, TouchableHighlight, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Gasto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gastos: [],

        }
    }
    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        this.setState({ loading: true })
        fetch('https://projetogastos.herokuapp.com/gastos')
            .then(res => res.json())
            .then(gastos => { this.setState({ loading: false, gastos }) })
    }

    handleDelete = (id) => {
        Alert.alert('Aviso !', 'Deseja mesmo excluir esse registro ? ',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Exluir',
                    onPress: () => {
                        fetch(`https://projetogastos.herokuapp.com/gastos/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                        })
                            .then(res => {
                                console.log(res);
                                /** como melhoria no back end, fazer ele devolver 
                                 * um array com os item que restaram no banco
                                 */
                                ToastAndroid.show('Excluido com sucesso !', ToastAndroid.LONG);
                                this.refresh();
                            })
                            .catch(err => {
                                console.log(err);
                                Alert.alert('Ops !', ' Problema no servidor, tente novamente em alguns instantes');
                            })
                    }
                }
            ])
    }


    render() {
        const { loading } = this.state;
        const { navigate } = this.props.navigation;
        console.info(navigate)
        return (
            <View style={styles.container}>
                <View style={styles.topo}>
                    <Text style={styles.titulo}>Registro de Gastos</Text>
                    <TouchableOpacity onPress={() => this.refresh()}>
                        <Icon name='refresh' size={30} color='blue' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('AddGasto')}>
                        <Icon name='plus-square' size={30} color='blue' />
                    </TouchableOpacity>
                </View>
                {loading ? (<ActivityIndicator size={100} color="#0000ff" />) : (
                    <FlatList data={this.state.gastos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableHighlight onLongPress={() => this.handleDelete(item.id)}
                                    onPress={() => navigate('EditGasto', {
                                        itemID: item.id,
                                        itemLocal: item.local,
                                        itemValor: item.valor
                                    })}
                                >
                                    <View style={styles.resgistro} >
                                        <View>
                                            <Text style={styles.local}>{item.local}</Text>
                                            <Text style={styles.info}>Parcela: </Text>
                                            <Text style={styles.info}>Data de lançamento: </Text>
                                        </View>
                                        <Text style={styles.valor}>R$ {item.valor}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        }}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 25,
    },
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
    local: {
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

    }

})