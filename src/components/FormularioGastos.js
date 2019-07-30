import React, { Component } from 'react';
import {
    View, TouchableOpacity,
    StyleSheet, Alert, ActivityIndicator, ToastAndroid, DatePickerAndroid
} from 'react-native';
import { Input, Text, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from './datePicker';

import { formatDate } from '../assets/dateFunctions';

export default class FormGastos extends Component {

    state = {
        loading: false,
        local: this.props.local ? this.props.local : '',
        valor: this.props.valor ? this.props.valor : '',
        edit: this.props.edit,
        checked: false,
        qtd: this.props.valor ? this.props.valor : '',
        mesPrimeiraParcela: ''
    }


    handleSubmit = async (id) => {


        /* 	"local": "teste parcelas",
            "valor": "123,1231",
            "ano": 2019,
            "mes":  6,
            "dia" : 21,
            "parcelado": true,
            "qtdParcelas": 10,
            "dataLancamento" : "21/6/2019"  */




        const { local, valor, qtd, mesPrimeiraParcela, checked } = this.state;
        if ((!local || !valor) || (checked && (!qtd || !mesPrimeiraParcela)))
            return alert('Preencha todas as informações necessárias');

        this.setState({ loading: true });
        let currentDate = await formatDate(new Date());
        let selectDate = await formatDate(mesPrimeiraParcela);
        /* let data = new Date();
        let dia = data.getDate();
        if (dia < 10) {
            dia = "0" + dia;
        }
        let mes = data.getMonth() + 1;
        if (mes < 10) {
            mes = "0" + mes;
        }
        let ano = data.getFullYear(); */


        let formatValor = this.state.valor.replace(',', '.');

        let submit = {
            local: this.state.local,
            valor: formatValor,
            ano: selectDate ? selectDate.ano : '',
            mes: selectDate ? parseInt(selectDate.mes) : '',
            dia: selectDate ? parseInt(selectDate.dia) : '',
            parcelado: checked,
            qtdParcelas: qtd,
            dataLancamento: `${currentDate.dia}/${currentDate.mes}/${currentDate.ano}`

        }
        let text = id ? 'editar' : 'adicionar';
        Alert.alert(
            'Confirmar ',
            `Tem certeza que deseja ${text} esse registro ?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => this.setState({ loading: false }),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        let url = '';
                        if (id)
                            url = `https://projetogastos.herokuapp.com/gastos/${id}`
                        else
                            url = `https://projetogastos.herokuapp.com/gastos`;

                        fetch(url, {
                            method: id ? 'PUT' : 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(submit),

                        })
                            .then(res => {
                                let msg = id ? 'Editado' : 'Adicionado';
                                this.setState({ loading: false })
                                msg === 'Editado' ? null : this.setState({ local: '', valor: '', qtd: '', mesPrimeiraParcela: '' })
                                ToastAndroid.show(`${msg} com sucesso !`,
                                    ToastAndroid.LONG);
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

    handleDate = (date) => this.setState({ mesPrimeiraParcela: date })

    renderOpcoesParcela = () => {
        if (this.state.checked) {
            return (
                <View>
                    <Input placeholder="Quantidade de parcelas ..."
                        keyboardType='decimal-pad'
                        value={this.state.qtd}
                        inputContainerStyle={styles.TextInputStyleClass}
                        rightIcon={<Icon name='credit-card' size={30} color='blue' />}
                        onChangeText={qtd => this.setState({ qtd })} />
                    {/* <Input placeholder="Qual o mês da primeira parcela ?"
                        value={this.state.mesPrimeiraParcela}
                        inputContainerStyle={styles.TextInputStyleClass}
                        rightIcon={<Icon name='calendar' size={30} color='blue' />}
                        onChangeText={mes => this.setState({ mesPrimeiraParcela: mes })} /> */}
                </View>
            );
        }
    }
    render() {
        /* console.log("aqui => ", this.state) */
        return (
            <View style={styles.container}>
                <Input placeholder="Local onde foi gasto ..."
                    value={this.state.local}
                    inputContainerStyle={styles.TextInputStyleClass}
                    rightIcon={<Icon name='location' size={30} color='blue' />}
                    onChangeText={local => this.setState({ local })} />
                <Input placeholder="Quanto você gastou..."
                    value={this.state.valor}
                    keyboardType='numeric'
                    inputContainerStyle={styles.TextInputStyleClass}
                    rightIcon={<Icon name='wallet' size={30} color='blue' />}
                    onChangeText={valor => this.setState({ valor })} />
                <CheckBox title='Parcelado ?'
                    containerStyle={{ width: '100%' }}
                    center
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })} />
                {this.renderOpcoesParcela()}
                <DatePicker setDate={this.handleDate.bind(this)}
                    date={this.state.mesPrimeiraParcela}
                />
                {this.state.loading ? null :
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.handleSubmit(this.props.id ? this.props.id : '')}>
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                }

                {/*   
                <TextInput style={styles.TextInputStyleClass} autoFocus={true}
                    placeholder='Local....' value={this.state.local}
                    onChangeText={local => this.setState({ local })} />
                <TextInput style={styles.TextInputStyleClass} value={this.state.valor}
                    placeholder='Valor gasto..' keyboardType={'numeric'}
                    onChangeText={valor => this.setState({ valor })} />
                {this.state.loading ? null :
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.handleSubmit(this.props.id ? this.props.id : '')}>
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                } */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    TextInputStyleClass: {
        marginBottom: 10,
        width: '100%',

    }, button: {
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
    success: {
        alignItems: 'center'
    },
    select: {
        flexDirection: 'row'
    }
})