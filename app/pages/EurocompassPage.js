import React, {useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Linking, Share, View, Image, Text, Platform, Alert, Pressable, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import axios from "axios";

import colors from '../config/colors';
import env from '../config/env';
import slug from '../config/slug';

var items;
var setData;
var code;

// udostepnianie wynikow wyszukiwania
const onShare = async () => {
    try {
       generatorShortCode();

       const result = await Share.share({
       message:
          'Eurodesk Polska - Eurokompas | '+ code,
       });
       if (result.action === Share.sharedAction) {
          if (result.activityType) {
              // shared with activity type of result.activityType
           } else {
              // shared
              sendDataProductIds();
           }
       } else if (result.action === Share.dismissedAction) {
           // dismissed
            console.log('dismissed');
       }
    } catch (error) {
       Alert.alert(error.message);
    }
};

// przekierowanie na strone www z pełnym opisem danego rekordu
const handlePressUrl = (uri) => {
  let url = env.eurodesk.url+'/'+uri;
  Linking.openURL(url).catch((error) =>
    console.error('404. Błąd adresu URL:', error)
  );
};

// generowanie krotkiego linku do udostepnienia - do wynikow wyszukiwania
const generatorShortCode = ()=> {
    if(!code) {
        let length = 8;
        code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        for (let i = 0; i < length; i++) {
             code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        code = `${env.eurodesk.url}/share/${code}`;
    }
    return code;
};

// Zapis znalezionych rekordów wraz z udstepionym shortlinkiem
const sendDataProductIds = async () => {
    try {
        const ids = [];
        items.map((item) => {
            ids.push(item.id);
        });

        const data = { link: code, id: ids };
        const response = await axios.post(env.api.url+'eurocompass', data);
        //console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// lista
function EurocompassPage({ route, navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const [ label, setLabel ] = useState(false);
    const [ count, setCount ] = useState('szukam...');
    [ items, setData ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);
    const [ page, setPage ] = useState(1);
    const { whom_id, category_id, source_id, qsearch } = route.params;
//console.log(qsearch);
    const onRefresh = ()=> {
        setRefreshing(true);
        { page < 5 ?
        setPage((page) => (page + 1))
        : null }
        setRefreshing(false);
    }

    useEffect(() => {
        code = ''; //category_id.selectedCategory.toString() +'-'+ source_id.selectedSource.toString();
        const api_uri = `${env.api.url}eurocompass?q=&whom=${whom_id.selectedWhom.toString()}&category=${category_id.selectedCategory.toString()}&source=${source_id.selectedSource.toString()}`;
  console.log(qsearch);
        axios.get(api_uri).then((response) => {
             setData(response.data.item);
             setCount(response.data.count);
             setLabel(response.data.label);
             setIsLoading(false);
           });
        }, []);

    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#fcc519" />
          </View>
        );
    }

    return (
       <View style={styles.containerFluid}>
            <View style={styles.header}>
                <View style={styles.headerTxt}>
                    <Text style={styles.qtyrecords}>{slug.label.records_number}: {count}</Text>
                </View>
                <View style={styles.headerIco}>
                {(count > 0 && count < 51) ?
                    <Pressable onPress={onShare}>
                        <Image
                            fadeDuration={500}
                            source={require("../assets/icon-share.png")}
                            style={styles.icons}
                        />
                    </Pressable>
                : null }
                </View>
            </View>
            {label ?
            <View style={styles.headerLabel}>
                <Text style={styles.headerLabelSpan}>{label}</Text>
            </View>
            : null }
        {count === 0 ?
            <Text style={styles.alert}>{slug.label.empty_records}</Text>
        : null }
        <FlatList
            data={items}
            renderItem={({item})=> (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handlePressUrl(item.location_parent)}
                    style={[styles.item, styles.shadowProp]}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.teaser} numberOfLines={4}>{item.short_title}</Text>
                </TouchableOpacity>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={ refreshing }
                    onRefresh={ onRefresh }
                    colors={['#17a2b8']}
                    />
                }
            >
        </FlatList>
       </View>
    )
}


const styles = StyleSheet.create({
    containerFluid: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'center',
         marginBottom: 45,
         backgroundColor: colors.dark,
         width: '100%',
    },
    headerTxt: {
        backgroundColor: colors.dark,
        height: 45,
        fontSize: 15,
        fontWeight: 300,
        width: '60%',
        paddingTop: 13,
        paddingBottom: 10,
        paddingLeft: 20,
    },
    qtyrecords: {
        color: colors.light
    },
    headerIco : {
        backgroundColor: colors.dark,
        height: 45,
        width: '40%',
        paddingTop: 8,
        paddingBottom: 5,
        paddingRight: 25,
        alignItems: 'flex-end',
    },
    headerLabel: {
        backgroundColor: '#f5f5f5',
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        width: '100%',
    },
    headerLabelStrong: {
        fontWeight: 500,
        color: colors.secondary,
        fontStyle: 'italic',
    },
    headerLabelSpan: {
        color: colors.secondary,
        fontStyle: 'italic',
    },
    icons: {
        width: 30,
        height: 30,
    },
    item: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 18,
        marginRight: 18,
        paddingBottom: 20,
        paddingTop: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: colors.light,
        borderRadius: 0,
    },
    title: {
        fontSize: 17,
        color: colors.primary,
        paddingTop: 0,
        paddingBottom: 5,
        fontWeight: '700'
    },
    alert: {
        fontSize: 18,
        padding: 20,
        color: colors.secondary
    },
    teaser: {
        color: colors.secondary,
        lineHeight: 18,
    },
    textMore : {
        color : colors.grey,
        textAlign: 'center',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderWidth: 0,
        borderColor: colors.light,
        borderRadius: 6,
        marginBottom: 0,
        marginTop: 5,
    },
    btnEdesk: {
        marginTop: 20,
        marginBottom: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    shadowProp: {
        shadowOffset: {width: 0, height: 1},
        shadowColor: '#888',
        shadowOpacity: 0.6,
        shadowRadius: 0,
    },
});

export default EurocompassPage;