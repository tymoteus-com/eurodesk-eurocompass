import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../config/colors';
//import edesk from '../Edesk';

function BlankPage({navigation}) {

    const onPressHandler = () => {
        navigation.navigate('Eurodesk Polska');
    }

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/background.png')}
        >
        <View style={styles.logoContainer}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                />
            <Text style={styles.logoText}>Eurodesk Polska</Text>
        </View>
           <Pressable style={{ marginTop: 30}}>
               <Button
                    style={styles.loginButton}
                    title="Powrót"
                    onPress={edesk.onPressBack}
                    />
               </Pressable>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    logo: {

    },
    logoContainer: {
      position: 'absolute',
      top: 100,
      alignItems: 'center'
    },
    logoText: {
        paddingTop: 10,
        color: 'white'
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: colors.info,
    },
    regButton: {
      width: '100%',
      height: 70,
      backgroundColor: colors.warning,
    },
});

export default BlankPage;