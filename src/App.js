/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ListElement from './components/ListElement';
import styles from './styles/style.js';

const fetchApi = require('./api/fetch');

export default class App extends Component {
  state = {
    isLoading: false,
    isLoadingTail: true,
    onEndReachedCalledDuringMomentum: true,
    endReached: false,
    page: 1,
    limit: 10,
    dataElements: [],
    refreshing: false
  }
  componentDidMount() {
    this.fetchItems();
  }
  fetchItems = () => {
    const that = this;
    fetchApi.collectData(this.state,function(data) {
      let endReached = (data.has_more) ? false : true;
      that.setState({
        isLoading: false,
        isLoadingTail: false,
        refreshing: false,
        endReached: endReached,
        onEndReachedCalledDuringMomentum: true,
        dataElements: [...that.state.dataElements, ...data.data]
      });  
    });
  }
  _onEndEditing = (event) => {
    this.setState({
      searchParam: event.nativeEvent.text,
      page: 1,
      isLoadingTail: true,
      onEndReachedCalledDuringMomentum: false,
      endReached: false,
      dataElements: []
    },
    () => {
      this.fetchItems();
    }
  );
  }
  _onEndReached = () => {
    // We're already fetching
    if (this.state.isLoadingTail || this.state.onEndReachedCalledDuringMomentum || this.state.endReached) {
      return;
    }
    this.setState({
        page: this.state.page + 1,
        isLoadingTail: true
      },
      () => {
        this.fetchItems();
      }
    );
  }
  _onRefresh = (rf) => {
    this.setState({
        isLoading: false,
        isLoadingTail: !rf,
        refreshing: rf,
        page: 1,
        onEndReachedCalledDuringMomentum: false,
        endReached: false,
        searchParam: '',
        dataElements: []
      },
      () => {
        this.fetchItems();
      }); 

  }
  _renderItem = (element,index) => {
    return (
      <ListElement
        testID={'listRow'}
        key={index}
        element={element}
      />
    );
  }
  _renderHeader = () => {
    return <SearchBar 
              testID={'searchBar'}
              placeholder="Type Here..." 
              clearIcon = {{ name: 'clear' }}
              onEndEditing={this._onEndEditing}
              onClearText = {() => { this._onRefresh(false)}}
              returnKeyLabel={'Search'}
              returnKeyType={'done'}
              round />;
  }
  _renderFooter = () => {
    if (!this.state.isLoadingTail || this.state.endReached) return null;
        return (
          <View style={styles.tailLoading}>
            <ActivityIndicator animating size="large" />
          </View>
        );
  }
  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading
          ? <View style={styles.loading}><Text>Loading...</Text></View>
          : <FlatList
            data={this.state.dataElements}
            renderItem={this._renderItem}
            keyExtractor={(item, key) => key}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0} 
            onRefresh={() => { this._onRefresh(true)}}
            refreshing={this.state.refreshing}
            ListFooterComponent={this._renderFooter.bind(this)}
            ListHeaderComponent={this._renderHeader}
            onMomentumScrollBegin={() => { this.state.onEndReachedCalledDuringMomentum = false; }}
          />
        }
      </View>
      
    );
  }
}