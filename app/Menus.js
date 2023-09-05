import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { Switch, Route } from 'react-router-dom';
import axios from "axios";

class Menus extends Component {

    constructor(props) {
        super(props);
        axios.get("https://app.eurodesk.pl/api/menu").then((response) => {
              //setData(response.data);
             this.props = response.data;
        });
    }

    get() {
          axios.get("https://app.eurodesk.pl/api/menu").then((response) => {
                   //setData(response.data);
                   //console.log(response.data);
                 });
    }

    getItems() {
        console.log(this.props);
    }

  render() {
//      const { items, activeItem, onItemPress } = this.props;
    this.getItems();

      return (
      <View style={styles.menu}>
          {this.props.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => onItemPress(item)}
            style={[
              styles.menuItem,
              item === activeItem ? styles.activeMenuItem : null,
            ]}
          >
            <Text style={styles.menuItemText}>{item}</Text>
          </TouchableOpacity>
        ))}

      </View>
    );
  }
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

export default Menus;
