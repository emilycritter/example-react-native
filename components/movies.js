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

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var Movies = React.createClass ({

  getInitialState(){
    return {
      movies: [],
      loaded: false
    }
  },

  componentDidMount(){
    this.fetchData();
  },

  fetchData() {
    var component = this;
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        component.setState({
          movies: responseData.movies,
          loaded: true
        });
      })
      .done();
  },

  render() {
    this.state.movies = this.state.movies.sort(function(a, b) {return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);});

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var rows = dataSource.cloneWithRows(this.state.movies);

    if (!this.state.loaded) {
     return this.renderLoadingView();
    }

    return (
      <ScrollView style={styles.scrollY}>
        <Text style={styles.heading}>Movies</Text>
        <ListView
          dataSource={rows}
          renderRow={this.renderMovie}
          style={styles.listView}
        />
      </ScrollView>
    );
  },

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    textAlign: 'center',
    fontSize: 36,
    marginTop: 18
  },
  rightContainer: {
   flex: 1,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  scrollY : {
    flex: 1,
  }
});

module.exports = Movies;
