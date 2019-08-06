import React from 'react';
import { View, DatePickerAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt_BR')

const Filter = (props) => {
    renderFilter = () => {
        let data = new Date()
        DatePickerAndroid.open({
            date: data,
            mode: 'spinner',
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment();
                props.callback(momentDate.month(e.month), momentDate.year(e.year))
            }
        })
    }


    return (
        <View >
            <Icon style={{ marginBottom: 20 }} name="calendar"
                color="#fff" size={30} onPress={() => { renderFilter() }} />
        </View>)
};

export default Filter;
