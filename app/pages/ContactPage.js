import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../config/colors';
//import edesk from '../Edesk';

function ContactPage({navigation}) {

    const onPressHandler = () => {
        navigation.navigate('Eurodesk Polska');
    }

    return (
        <View style={styles.container}>
            <View >
                <View style={{textAlign: 'left' }}>
                <Text style={{ fontWeight: 700, marginTop: 0 }}>Krajowe Biuro Eurodesk Polska</Text>
                <Text style={{ marginTop: 15, color: '#999' }}>Fundacja Rozwoju Systemu Edukacji</Text>
                <Text style={{ color: '#999' }}>Aleje Jerozolimskie 142A</Text>
                <Text style={{ color: '#999' }}>02-305 Warszawa</Text>
                <Text style={{ marginTop: 15,color: '#999' }}>Tel.: 22 46 31 450</Text>
                <Text style={{ color: '#999' }}>E-mail: eurodesk@eurodesk.pl</Text>
                </View>
                <Image
                   source={require("../assets/logo-eurodesk-polska.png")}
                   style={styles.logo}
                   />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'left',
        justifyContent: 'top',
        backgroundColor: '#ffffff',
        padding: 30,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    logo: {
        width: 160,
        height: 48,
        marginTop: 30
    },

});

export default ContactPage;