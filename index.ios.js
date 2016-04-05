/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Movies from './components/movies'

class PracticeReactApp extends Component {
  render() {
    return (
      <Movies/>
    );
  }
}

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('PracticeReactApp', () => PracticeReactApp);
