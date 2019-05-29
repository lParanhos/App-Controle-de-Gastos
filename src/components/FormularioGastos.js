import React, { Component } from 'react';
import {
    View, TextInput, TouchableOpacity,
    StyleSheet, Dimensions, Text, Alert, Image, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class FormGastos extends Component {

    state = {
        local: this.props.local ? this.props.local : '',
        valor: this.props.valor ? this.props.valor : '',
        edit: this.props.edit
    }

    
    handleSubmit = (id) => {
        let submit = {
            Local: this.state.local,
            Valor: this.state.valor
        }
        let text = id ? 'editar' : 'adicionar';
        Alert.alert(
            'Confirmar ',
            `Tem certeza que deseja ${text} esse registro ?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
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
                                msg === 'Editado' ? null : this.setState({ local: '', valor: '' })
                                ToastAndroid.show(`${msg} com sucesso !`,
                                    ToastAndroid.LONG);
                            })
                            .catch(err => {
                                console.log(err)
                                Alert.alert('Ops ! Problema no servidor, tente novamente em alguns instantes')
                            })
                    }
                },
            ],
            { cancelable: false },
        );

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.TextInputStyleClass} autoFocus={true}
                    placeholder='Local....' value={this.state.local}
                    onChangeText={local => this.setState({ local })} />
                <TextInput style={styles.TextInputStyleClass} value={this.state.valor}
                    placeholder='Valor gasto..' keyboardType={'numeric'}
                    onChangeText={valor => this.setState({ valor })} />
                <TouchableOpacity style={styles.button}
                    onPress={() => this.handleSubmit(this.props.id ? this.props.id : '')}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>
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
        // Setting up Hint Align center.
        textAlign: 'center',

        // Setting up TextInput height as 50 pixel.
        width: '100%',

        // Set border width.
        borderWidth: 2,

        // Set border Hex Color Code Here.
        borderColor: '#acadaf',

        // Set border Radius.
        borderRadius: 20,

        //Set background color of Text Input.
        backgroundColor: "#FFFFFF"

    }, button: {
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
    }
})