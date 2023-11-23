import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../config/colors';
import edesk from '../Edesk';
import slug from '../config/slug';


function ContactPage({navigation}) {

    const onPressHandlerFilters = () => {
        navigation.navigate(slug.navi.filters);
    }
    const onPressHandler = () => {
        navigation.navigate('Eurodesk Polska');
    }

    return (
        <View style={styles.container}>
            <View >
                <View style={{textAlign: 'left' }}>
                    <Text style={styles.txt}>Wyszukiwarka informacji dla młodzieży i osób pracujących z młodzieżą. Jest systematycznie aktualizowana i zawiera tylko zweryfikowane informacje.</Text>
                    <Text style={styles.txt}>Można je wyszukiwać według tematów, rodzajów źródeł i grup docelowych. Po zaznaczeniu odpowiednich kategorii kliknij „wyszukaj”.</Text>
                    <Text style={styles.txt}>Jeśli któryś z wyników Cię zainteresuje, kliknij na jego tytuł, a przejdziesz do strony, na której znajdziesz więcej informacji. Powodzenia!</Text>
                    <Text style={styles.txt}>Krajowe Biuro Eurodesk Polska</Text>
                </View>
                <Pressable
                    onPress={onPressHandlerFilters}
                    style={styles.btnBoxStart}>
                    <Text
                        fadeDuration={1100}
                        style={styles.btnStart}>
                        Przejdź do wyszukiwania
                        </Text>
                    </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        backgroundColor: '#ffffff',
        padding: 30,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    logo: {
        width: 30,
        height: 30,
    },
    txt: {
        marginTop: 10,
        color: '#666',
        fontSize: 16
    },
    btnBoxStart : {
        color: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 30,
        marginBottom: 0,
        borderRadius: 5,
        borderColor: colors.light,
        borderWidth: 1,
        width: 'auto',
    },
      btnStart: {
        color: colors.primary,
        fontSize: 17,
        fontWeight: "500",
        textAlign: 'center',
    },
});

export default ContactPage;