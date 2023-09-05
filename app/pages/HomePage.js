import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native';

import colors from '../config/colors';

function HomePage(props) {
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
            <View style={styles.loginButton}></View>
            <View style={styles.regButton}></View>
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

export default HomePage;