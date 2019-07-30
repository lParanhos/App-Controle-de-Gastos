import React from 'react';
import { View, DatePickerAndroid, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt_BR')

const DatePicker = (props) => {

    handleDate = (setDate) => {
        let data = new Date()
        DatePickerAndroid.open({
            date: data,
            mode: 'calendar',
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment();
                momentDate.date(e.day);
                momentDate.month(e.month);
                momentDate.year(e.year);
                setDate(momentDate)
            }
        })
    }
    
    return (
        <View >
            <TouchableOpacity style={styles.picker}
                onPress={() => this.handleDate(props.setDate)}>
                <Text style={styles.text}>{props.date ? moment(props.date).format('ddd, D [de] MMMM [de] YYYY')
                    : "Selcione uma data de vencimento   "}</Text>

                <Icon style={{ marginRight: 10 }} name="calendar" size={30} color="blue" />
            </TouchableOpacity>
        </View>
    );
}

export default DatePicker;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginLeft: 10
    },
    picker: {
        backgroundColor: '#FFFF',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        justifyContent: 'space-around',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    }
})