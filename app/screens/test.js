import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, Platform } from 'react-native';

import env from '../config/env';


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





export default function App() {

  const handlePress = () => console.log('Text press');

  return (
      <SafeAreaView style={styles.container}>
           <View style={{
               backgroundColor: "dodgerblue",
               width: '50%',
               height: 70
           }}>
           </View>
         <Text numberOfLines={2} onPress={handlePress}>Jak napisać tę pieprzoną apkę na konferencje eurodesk polska która już niebawem ma się odbyć??? apkę na konferencje eurodesk polska która już niebawem ma się odbyć???</Text>
         <Image source={require("./assets/logo.png")} />
         <Text> Dupass dupa sdsssdfdfdsds222d pawdsdssss żurek</Text>
         <Text style={styles.text}>......... Eurokompas ........</Text>
         <Image
           fadeDuration={1000}
           style={styles.logo}
           source={{
             uri: "https://www.eurodesk.pl/images/logo-black.png"
           }}
         />
         <Button
           color="#f194ff"
           title="Wejdź"
           onPress={() => Alert.alert ('Center button pressed')}
          />
          <Button
                  color="#11a40f"
                  title="Spadaj"
                  onPress={() => Alert.alert ('Center button pressed')}
                 />
         <StatusBar style="auto" />
       </SafeAreaView>
       <OpenURLButton url={env.eurodesk.url} style={styles.btnEdesk}>www.eurodesk.pl</OpenURLButton>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
    color: 'red',
  },
  logo: {
    width: 203,
    height: 52,
  }
});
