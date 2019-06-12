import React from 'react';

import { View, Text, StyleSheet, Picker } from 'react-native';

import { Card, Badge } from 'react-native-elements';

const CadrInfo = (props) => {

    const { total, receber, callback, mes } = props;
    let totalSemVirgula = total.replace(",", '');
    let receberSemVirgula = receber.replace(",", '');
    let sobrou = receberSemVirgula - totalSemVirgula;
    let sobrouConvert = sobrou.toLocaleString('pt-br', { minimumFractionDigits: 2 });
    const meses = [{ mes: "Janeiro", valor: "01" },
    { mes: "Fevereiro", valor: "02" }, { mes: "Março", valor: "03" },
    { mes: "Abril", valor: "04" }, { mes: "Maio", valor: "05" },
    { mes: "Junho", valor: "06" }, { mes: "Julho", valor: "07" },
    { mes: "Agosto", valor: "08" }, { mes: "Setembro", valor: "09" },
    { mes: "Outubro", valor: "10" }, { mes: "Novembro", valor: "11" },
    { mes: "Dezembro", valor: "12" },
    ]
    return (
        <Card containerStyle={{ borderRadius: 10 }}>
            <Picker onValueChange={(item) => callback(item)} selectedValue={mes}>
                {meses.map((mes, i) =>
                    <Picker.Item key={mes.valor} label={mes.mes} value={mes.valor} />
                )}
            </Picker>
            <View style={styles.dados}>
                <Text style={styles.valor}>
                    <Text style={styles.moeda}>R$ </Text>
                    {sobrouConvert}
                </Text>
                <View style={styles.registros}>
                    <View>
                        <View style={styles.info}>
                            <Badge status="success" badgeStyle={styles.badge} />
                            <Text>A Receber</Text>
                        </View>
                        <Text style={styles.receber}>
                            <Text style={{ fontSize: 15 }}>R$ </Text>
                            {receberSemVirgula}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.info}>
                            <Badge status="error" badgeStyle={styles.badge} />
                            <Text>Gastos</Text>
                        </View>
                        <Text style={styles.receber}>
                            <Text style={{ fontSize: 15 }}>R$ </Text>
                            {totalSemVirgula}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    )
};

export default CadrInfo;

const styles = StyleSheet.create({
    dados: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    valor: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    moeda: {
        fontSize: 20
    },
    info: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    badge: {
        marginTop: 3,
        width: 15,
        height: 15,
        borderRadius: 7,
        marginRight: 5
    },
    receber: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    registros: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})