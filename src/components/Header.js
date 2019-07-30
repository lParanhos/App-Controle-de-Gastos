import React from 'react';
import { Header, Divider } from 'react-native-elements';
import { StyleSheet } from 'react-native';

// import { Container } from './styles';

const Cabecalho = (props) => (
    <>

        <Header containerStyle={styles.head}
/*         leftComponent={{ icon: 'menu', color: '#fff' }}
 */        centerComponent={{ text: props.tittle, style: styles.tittle }}
/*         rightComponent={{ icon: 'home', color: '#fff' }}
 */    />
        <Divider style={{ backgroundColor: '#171F33' }} />
    </>
);

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