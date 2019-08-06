import React, { Component } from 'react';

import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Button } from 'native-base';
import Formulario from '../components/Recebimentos/formulario';
import { formatDate } from '../assets/dateFunctions';


export default class AddRecebimento extends Component {


    state = {
        receberDe: '',
        valor: '',
        date: '',
        loading: false
    }
    addRecebimento = (de) => this.setState({ receberDe: de });

    addValor = (v) => this.setState({ valor: v });

    handleDate = (date) => this.setState({ date });

    handleSubmit = async () => {
        let selectDate = await formatDate(this.state.date);
        
        let formatValue = this.state.valor.replace(',', '.');
        let submit = {
            de: this.state.receberDe,
            valor: formatValue,
            ano: parseInt(selectDate.ano),
            mes: parseInt(selectDate.mes),
            dia: parseInt(selectDate.dia),
            recebido: false
        }

        Alert.alert(
            'Confirmar ',
            `Tem certeza que deseja adicionar esse registro ?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sim', onPress: () => {
                        fetch('https://projetogastos.herokuapp.com/receber', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(submit),

                        })
                            .then(res => {
                                this.setState({ receberDe: '', valor: '' })
                                ToastAndroid.show(`Adicionado com sucesso !`,
                                    ToastAndroid.LONG);
                                this.setState({ loading: false })
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
        )

    }

    render() {
        const { receberDe, valor, loading } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Adicionar um Recebimento</Text>
                <Formulario receber={receberDe} valor={valor}
                    callBackReceber={this.addRecebimento.bind(this)}
                    callBackValor={this.addValor.bind(this)} date={this.state.date}
                    callBackDate={this.handleDate.bind(this)} />
                {receberDe && valor && !loading ?
                    <Button style={styles.button} onPress={() => this.handleSubmit()}>
                        <Text style={styles.textButton}>Salvar</Text>
                    </Button> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 25
    },
    button: {
        marginLeft: 100,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 30,
        borderColor: '#acadaf',
        borderRadius: 10,
        backgroundColor: "rgba(14, 14, 251, 0.76)"
    },
    textButton: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})