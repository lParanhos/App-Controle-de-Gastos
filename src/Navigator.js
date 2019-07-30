import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './screens/Home';
import Gastos from './screens/Gastos';
import AddGastos from './screens/AddGastos';
import EditGastos from './screens/EditGastos';
import Receber from './screens/Gerais';
import AddRecebimento from './screens/AddRec';

const RecebimentosRoutes = createStackNavigator({

    Receber: {
        screen: Receber,
        navigationOptions: {
            title: 'Receber'
        }
    },
    AddRec: { screen: AddRecebimento, navigationOptions: { title: 'Adicionar' } }
}, {
        initialRouteName: 'Receber',
        headerMode: 'none'
    });


const GastosRoutes = createStackNavigator({
    Gastos: {
        screen: Gastos,
        navigationOptions: {
            title: 'Gastos'
        }
    },
    AddGasto: { screen: AddGastos, navigationOptions: { title: 'Adicionar' } },
    EditGasto: { screen: EditGastos, navigationOptions: { title: 'Editar' } },
}, {
        initialRouteName: 'Gastos',
        headerMode: 'none'

    })


const menuRoutes = {

    Gastos: {
        name: 'Gastos',
        screen: GastosRoutes,
        navigationOptions: {
            title: 'Gastos',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='list-alt' size={30} color={tintColor} />
        }
    },
    Home: {
        name: 'Home',
        screen: Home,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='home' size={35} color={tintColor} />
        }
    },


    Receber: {
        name: 'Receber',
        screen: RecebimentosRoutes,
        navigationOptions: {
            title: 'Receber',
            tabBarIcon: ({ tintColor }) =>
                <Icon name='bank' size={30} color={tintColor} />
        }
    }
}

const menuConfig = {
    initialRouteName: 'Gastos',
    tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }
    }
}

const MenuRoutes = createBottomTabNavigator(menuRoutes, menuConfig);

const Menu = createAppContainer(MenuRoutes);
export default Menu;