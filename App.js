import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from './app/config/colors';

import StartPage from './app/pages/StartPage';
import ContactPage from './app/pages/ContactPage';
import FiltersPage from './app/pages/FiltersPage';
import EurocompassPage from './app/pages/EurocompassPage';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Eurodesk Polska"
                component={StartPage}
                options={{
                    header: () => null
                }}
            />
            <Stack.Screen
                name="Wyszukaj"
                component={FiltersPage}
                options={{
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="Eurokompas"
                component={EurocompassPage}
                options={{
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="Kontakt"
                component={ContactPage}
                options={{
                    headerTitleAlign: 'center'
                    }}
            />
        </Stack.Navigator>
        <StatusBar style="auto" />
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 23,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navigationStack : {

  },
  stack: {
    color: 'red'
  },
  text: {
    fontSize: 25,
    fontWeight: 500,
    color: 'red',
  },
  logo: {
    width: 203,
    height: 52,
    marginBottom: 30,
  },
  title: {
      fontSize: 24,
      fontWeight: 700,
    },
  boxBtnFooter: {
    position: 'absolute',
    bottom: 15,
    left:5,
     borderWidth: 1,
     borderColor: colors.light,
  },
  btnBoxPrimary : {
    color: colors.primary,
    paddingHorizontal: 30,
    paddingVertical:10,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: colors.light,
    borderWidth: 1,
    width: 200,
  },
  btnTextPrimary : {
      color: colors.primary,
      fontSize: 20,
      textAlign: 'center',
  },
  btnBoxDanger : {
      color: colors.danger,
      paddingHorizontal: 30,
      paddingVertical:10,
      borderRadius: 5,
      borderColor: colors.light,
      borderWidth: 1
    },
  btnTextDanger : {
        color: colors.danger,
        fontSize: 16,
        fontWeight: 700,
        textAlign: 'center',
    },
});
