/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      priceList: [],
      lastUpdate: '',
    };
  }

  updatePrice() {
    this._isMounted = true;

    axios.get(`https://hourlypricing.comed.com/api?type=5minutefeed`)
      .then(res => {
        const nameList = res.data;
        const price = nameList[0].price;
        const last = nameList[0].millisUTC;
        //console.log("Price:", price);
        console.log("MOUNTED", this._isMounted)
        if(this._isMounted) {
        this.setState({ priceList: price, lastUpdate: last });
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    //console.log("State:", this.state.priceList);
  }


  // make the GET request to fetch data from the URL then using promise function to handle response.
  componentDidMount() {
    this.updatePrice();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo-ComEd.png')} />
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>{this.state.priceList}¢</Text>
          <Button title="Update" onPress={this.updatePrice} />
          <Text>Last Updated: {this.state.lastUpdate}</Text> 
        </View>
      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 100,
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingTop: 50,
  },
  body: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    //paddingBottom: 6,
  }

});

