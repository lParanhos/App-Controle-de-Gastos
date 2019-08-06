import React from 'react';

import { View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from '../datePicker';
const Formulario = (props) => (
    <View>
        <Input placeholder="Receber de....."
            rightIcon={<Icon name='user' size={30} color='blue' />}
            value={props.receber}
            onChangeText={de => props.callBackReceber(de)}
        />
        <Input placeholder="Valor ... " keyboardType='numeric'
            rightIcon={<Icon name='wallet' size={30} color='blue' />}
            value={props.valor}
            onChangeText={valor => props.callBackValor(valor)}
        />
        <DatePicker setDate={props.callBackDate} date={props.date}/>
    </View>
);

export default Formulario;
