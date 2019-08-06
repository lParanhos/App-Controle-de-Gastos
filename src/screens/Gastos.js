import React, { Component } from 'react';
import {
    View, Text, FlatList, StyleSheet, TouchableOpacity,
    Alert, ToastAndroid, TouchableHighlight, ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

export default class Gasto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gastos: [],
            mes: new Date().getMonth() + 1,
            ano: new Date().getFullYear(),
            show: true
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const { mes, ano } = this.state;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.refresh(mes, ano);
        })
    }

    refresh = (mes, ano) => {
        this.setState({ loading: true })
        console.log(mes, ano)
        fetch(`https://projetogastos.herokuapp.com/gastos/${mes}-${ano}`)
            .then(res => res.json())
            .then(gastos => { this.setState({ loading: false, gastos }) })
    }

    handleFilter = (date) =>
        this.setState({ mes: new Date(date).getMonth() + 1, ano: new Date(date).getFullYear() },
            this.refresh(new Date(date).getMonth() + 1, new Date(date).getFullYear()))

    handleDelete = (id) => {
        Alert.alert('Aviso !', 'Deseja mesmo excluir esse registro ? ',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Exluir',
                    onPress: () => {
                        fetch(`https://projetogastos.herokuapp.com/gasto/${id}`, {
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
                                this.refresh(this.state.mes, this.state.ano);
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
        console.info("gastos=>", this.state.gastos)
        return (
            <View style={styles.container}>
                <Header tittle="Registros de Gastos" filter callback={this.handleFilter} />
                <LinearGradient
                    locations={[0, 0.5, 0.6]}
                    colors={['#051937', '#008793', '#004d7a']}
                    style={{ flex: 1 }}                    >
                    {loading ? (<ActivityIndicator size={100} color="#0000ff" />) : (
                        <FlatList data={this.state.gastos} onScrollBeginDrag={() => this.setState({ show: !this.state.show })}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableHighlight onLongPress={() => this.handleDelete(item.id)}
                                        onPress={() => navigate('EditGasto', {
                                            itemID: item.id,
                                            itemLocal: item.local,
                                            itemValor: item.valor,
                                            itemParcelas: item.parcela ? item.parcela.split('/')[1] : '',
                                            itemVencimento: item.vencimento
                                        })}
                                    >
                                        <View style={styles.resgistro} >
                                            <View>
                                                <Text style={styles.local}>{item.local}</Text>
                                                <Text style={styles.info}>Parcela: <Text style={styles.data}>{item.parcela} </Text> </Text>
                                                <Text style={styles.info}>Data de vencimento: <Text style={styles.data}>{item.vencimento} </Text> </Text>
                                                <Text style={styles.info}>Data de lançamento: <Text style={styles.data}>{item.lancamento} </Text> </Text>
                                            </View>
                                            <Text style={styles.valor}>R$ {item.valor}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                        />
                    )}

                </LinearGradient>
                {this.state.show ? <ActionButton buttonColor="#48A2F8"
                    renderIcon={() =>
                        <Icon style={{ justifyContent: "center" }} name="plus" size={25} color="#fff" />}
                    onPress={() => navigate('AddGasto')} /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 10
    },
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
    },
    data: {
        fontWeight: 'bold'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})