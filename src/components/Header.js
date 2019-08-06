import React from 'react';
import { Header, Divider } from 'react-native-elements';
import { StyleSheet, DatePickerAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt_BR')


const Cabecalho = (props) => {

    renderFilter = (setDate) => {
        let data = new Date()
        DatePickerAndroid.open({
            date: data,
            mode: 'spinner',
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
        <>

            <Header containerStyle={styles.head}
/*         leftComponent={{ icon: 'menu', color: '#fff' }}
    */        centerComponent={{ text: props.tittle, style: styles.tittle }}
                rightComponent={props.filter ?
                    <Icon style={{ marginBottom: 20 }} name="calendar"
                        color="#fff" size={30} onPress={() => { renderFilter(props.callback) }} />
                    : null}
            />
            <Divider style={{ backgroundColor: '#171F33' }} />
        </>
    );

}
export default Cabecalho;

const styles = StyleSheet.create({
    head: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#243254'
    },
    tittle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold'
    }
})