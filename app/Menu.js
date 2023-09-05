import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from "axios";

function Menu() {

    const [ items, setData ] = useState([]);

    useEffect(() => {
       axios.get("https://app.eurodesk.pl/api/menu").then((response) => {
         setData(response.data);
       });
     }, []);

    return (
      <View style={styles.menu}>
        {items.map(item => (
        <TouchableOpacity>
            <Text key={item.id}>{item.page_subject} |</Text>
         </TouchableOpacity>
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 'auto',
    marginTop: 50,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  activeMenuItem: {
    backgroundColor: '#ccc',
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Menu;
