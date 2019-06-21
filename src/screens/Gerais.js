import React, { Component } from 'react';
import {
    View, Text, ImageBackground, FlatList, StyleSheet, TouchableOpacity,
    Alert, ToastAndroid, TouchableHighlight, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemRecebido from '../components/Recebimentos/item';

class Gerais extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            registros: [],

        }
    }
    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", () => {
            this.refresh();
        })
    }

    refresh = () => {
        this.setState({ loading: true })
        fetch('https://projetogastos.herokuapp.com/receber')
            .then(res => res.json())
            .then(registros => { this.setState({ loading: false, registros }) })
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
        return (
            <ImageBackground style={styles.backgroundImage}
                source={require('../assets/img/backGround.jpg')}>
                <View style={styles.container}>
                    <View style={styles.topo}>
                        <Text style={styles.titulo}>A Receber</Text>
                        <TouchableOpacity onPress={() => navigate('AddRec')}>
                            <Icon name='plus-square' size={30} color='blue' />
                        </TouchableOpacity>
                    </View>
                    {loading ? (<ActivityIndicator size={100} color="#0000ff" />) : (
                        <FlatList data={this.state.registros}
                            keyExtractor={item => item.id}
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
                </View>
            </ImageBackground>
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