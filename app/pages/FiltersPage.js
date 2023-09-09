import React, {useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Platform, Button, Alert, Pressable, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import axios from "axios";

import colors from '../config/colors';
import env from '../config/env';
import slug from '../config/slug';

function FiltersPage({navigation}) {

    const [isLoading, setIsLoading] = useState(true);
    // kategorie
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCheckBoxChangeCategory = (value, index) => {
        const newSelectedCategory = [...selectedCategory];

        if (value) {
          newSelectedCategory.push(index);
        } else {
          const indexToRemove = newSelectedCategory.indexOf(index);
          newSelectedCategory.splice(indexToRemove, 1);
        }
        setSelectedCategory(newSelectedCategory);
    };

    const [ items, setData ] = useState([]);

    useEffect(() => {
        const api_uri = `${env.api.url}eurocompass/category`;
        axios.get(api_uri).then((response) => {
             setData(response.data.item);
             setIsLoading(false);
        });
    }, []);
    // end kategorie

    // dla kogo
    const [selectedWhom, setSelectedWhom] = useState([]);

    const handleCheckBoxChangeWhom = (value, index) => {
        const newSelectedWhom = [...selectedWhom];

            if (value) {
              newSelectedWhom.push(index);
            } else {
              const indexToRemove = newSelectedWhom.indexOf(index);
              newSelectedWhom.splice(indexToRemove, 1);
            }
            setSelectedWhom(newSelectedWhom);
    };

    const [ itemsWhom, setDataWhom ] = useState([]);

    useEffect(() => {
        const api_uri = `${env.api.url}eurocompass/filters/whom`;
        axios.get(api_uri).then((response) => {
              setDataWhom(response.data);
              setIsLoading(false);
        });
    }, []);
    // end dla kogo

    // zrodla
    const [selectedSource, setSelectedSource] = useState([]);

    const handleCheckBoxChangeSource = (value, index) => {
        const newSelectedSource = [...selectedSource];

            if (value) {
              newSelectedSource.push(index);
            } else {
              const indexToRemove = newSelectedSource.indexOf(index);
              newSelectedSource.splice(indexToRemove, 1);
            }
            setSelectedSource(newSelectedSource);
    };

    const [ itemsSource, setDataSource ] = useState([]);

    useEffect(() => {
        const api_uri = `${env.api.url}eurocompass/filters/source`;
        axios.get(api_uri).then((response) => {
              setDataSource(response.data);
              setIsLoading(false);
        });
    }, []);
    // end zrodla

    const [ refreshing, setRefreshing ] = useState(false);
    const onRefresh = ()=> {
        setRefreshing(true);
        { page < 5 ?
        setPage((page) => (page + 1))
        : null }
        setRefreshing(false);
    }

    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#fcc519" />
          </View>
        );
    }

    return (
       <View style={styles.container}>
        <ScrollView>
            <Text style={styles.listHeader}>
                {slug.label.form_whom}
            </Text>
            {
                itemsWhom.map((item) => {
                     return (
                        <BouncyCheckbox
                            key={item.id}
                            style={styles.checkbox}
                            fillColor={colors.primary}
                            textStyle={{
                                textDecorationLine: "none",
                            }}
                            text={item.name}
                            isChecked={selectedWhom.includes(item.id)}
                            onPress={(isChecked) => handleCheckBoxChangeWhom(isChecked, item.id)}
                            />
                        )
                     })
                }
            <Text style={styles.listHeader}>
               {slug.label.category}
            </Text>
            {
               items.map((item) => {
                   return (
                      <BouncyCheckbox
                        key={item.id}
                        style={styles.checkbox}
                        fillColor={colors.primary}
                        textStyle={{
                           textDecorationLine: "none",
                        }}
                        text={item.name}
                        isChecked={selectedCategory.includes(item.id)}
                        onPress={(isChecked) => handleCheckBoxChangeCategory(isChecked, item.id)}
                      />
                   )
                })
            }
            <Text style={styles.listHeader}>
                 {slug.label.source}
            </Text>
            {
                itemsSource.map((item) => {
                    return (
                        <BouncyCheckbox
                            key={item.id}
                            style={styles.checkbox}
                            fillColor={colors.primary}
                            textStyle={{
                                textDecorationLine: "none",
                            }}
                            text={item.name}
                            isChecked={selectedSource.includes(item.id)}
                            onPress={(isChecked) => handleCheckBoxChangeSource(isChecked, item.id)}
                            />
                    )
                })
            }
        </ScrollView>
        <RNBounceable
           style={styles.btnSend}
           onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('Eurokompas', {
                whom_id: {selectedWhom},
                category_id: {selectedCategory},
                source_id: {selectedSource},
              });
           }}>
           <Text style={styles.btnSendText}>
              {slug.navi.search}
           </Text>
        </RNBounceable>
       </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    listHeader: {
        fontSize: 20,
        color: colors.dark,
        fontWeight: "600",
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
    },
    checkbox: {
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    item: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 13,
        marginRight: 13,
        padding: 19,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: colors.light,
        borderRadius: 3,
    },
    btnSend: {
        marginBottom: 20,
        marginTop: 16,
        marginLeft: 20,
        marginRight: 20,
        height: 45,
        //width: "50%",
        backgroundColor: colors.primary,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    btnSendText: {
        color: "#fff",
        fontSize: 15,
    }
});

export default FiltersPage;