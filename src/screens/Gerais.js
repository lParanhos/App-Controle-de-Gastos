import React, { Component } from 'react';
import {
    View, FlatList, StyleSheet, PanResponder, Animated,
    Alert, ToastAndroid, TouchableHighlight, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import Header from '../components/Header';
import ItemRecebido from '../components/Recebimentos/item';

class Gerais extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            registros: [],
            show: true,
            mes: new Date().getMonth() + 1,
            ano: new Date().getFullYear(),
        }
    }
    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", () => {
            this.refresh(this.state.mes, this.state.ano);
        })
    }

    refresh = (mes, ano) => {
        this.setState({ loading: true })
        fetch(`https://projetogastos.herokuapp.com/receber/${mes}-${ano}`)
            .then(res => res.json())
            .then(registros => { console.log(registros) , this.setState({ loading: false, registros }) })
    }

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
                        fetch(`https://projetogastos.herokuapp.com/receber/${id}`, {
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

    handleFilter = (date) =>
        this.setState({ mes: new Date(date).getMonth() + 1, ano: new Date(date).getFullYear() },
            this.refresh(new Date(date).getMonth() + 1, new Date(date).getFullYear()))

    render() {
        const { loading } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <LinearGradient
                    locations={[0, 0.5, 0.6]}
                    colors={['#051937', '#008793', '#004d7a']}
                    style={{ flex: 1 }}                    >
                    <Header tittle="A Receber" filter callback={this.handleFilter} />
                    {loading ? (<ActivityIndicator size={100} color="#0000ff" />) : (
                        <FlatList data={this.state.registros} onScrollBeginDrag={() => this.setState({ show: !this.state.show })}
                            keyExtractor={item => item.id}  /* onScrollEndDrag={() => this.setState({ show: true })} */
                            renderItem={({ item }) => {
                                return (
                                    <TouchableHighlight onLongPress={() => this.handleDelete(item.id)}
                                        onPress={() => { }}
                                    >
                                        <ItemRecebido callBack={() => this.refresh()}
                                            dia={item.dia} mes={item.mes} ano={item.ano} id={item.id}
                                            de={item.de} valor={item.valor} status={item.recebido}
                                        />
                                    </TouchableHighlight>
                                )
                            }}
                        />
                    )}
                </LinearGradient>
                {this.state.show ? <ActionButton buttonColor="#48A2F8"
                    renderIcon={() =>
                        <Icon style={{ justifyContent: "center" }} name="plus" size={25} color="#fff" />}
                    onPress={() => navigate('AddRec')} /> : null}
            </View>
        )
    }
}

export default Gerais;

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%'
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
})