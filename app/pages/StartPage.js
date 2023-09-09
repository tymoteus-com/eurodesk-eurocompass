import React, {useState, useEffect, useCallback } from 'react';
import { StyleSheet, Button, ImageBackground, View, Image, Text, Alert, Platform, Pressable, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../config/colors';
import env from '../config/env';
import slug from '../config/slug';

const Stack = createStackNavigator();

const handlePressUrl = (url) => {
  Linking.openURL(url).catch((error) =>
    console.error('404. Błąd adresu URL:', error)
  );
};

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

function StartPage({navigation}) {

    const onPressHandlerFilters = () => {
        navigation.navigate(slug.navi.filters);
    }
    const onPressHandlerContact = () => {
         navigation.navigate(slug.navi.contact);
    }

    return (
            <View style={styles.container}>
                <View style={styles.sectionTop}>
                    <View style={styles.sectionLogo}>
                        <Image
                            fadeDuration={700}
                            style={styles.logo}
                            source={{
                                uri: env.eurodesk.url+"/images/logo-eurodesk-polska.png"
                            }} />
                    </View>
                </View>
                <View style={styles.sectionCenter}>
                    <Image
                        fadeDuration={700}
                        style={styles.icon}
                        source={require("../assets/ico-eurocompass.png")} />
                    <Text style={styles.h1}>{slug.app_name}</Text>
                    <Text style={styles.h2}>{slug.app_desc}</Text>
                    <Pressable
                        onPress={onPressHandlerFilters}
                        style={styles.btnBoxStart}>
                        <Text
                            fadeDuration={1100}
                            style={styles.btnStart}>
                            {slug.navi.start}
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.sectionBottom}>
                     <Pressable
                         onPress={onPressHandlerContact}
                         style={styles.boxBottomLink}>
                         <Text
                            fadeDuration={1200}
                            style={styles.btnLight}>
                            {slug.navi.contact}
                         </Text>
                     </Pressable>
                     <Pressable
                         onPress={() => handlePressUrl(env.eurodesk.url)}
                         style={styles.boxBottomLink}>
                            <Text
                                fadeDuration={1200}
                                style={styles.btnLight}>
                                {slug.navi.eurodesk}
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
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 0,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sectionTop : {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  sectionLogo: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    paddingHorizontal: 22,
  },
  logo: {
    width: 200,
    height: 50,
  },
  sectionCenter : {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
  h1: {
    fontSize: 60,
    fontWeight: "600",
  },
  h2: {
    fontSize: 32,
    fontWeight: "400",
  },
  btnBoxStart : {
    color: colors.primary,
    paddingHorizontal: 50,
    paddingVertical: 7,
    marginTop: 15,
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
  sectionBottom : {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
    paddingBottom: 15
  },
  boxBottomLink: {
    borderColor: colors.light,
  },
  btnLight: {
    color: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default StartPage;
