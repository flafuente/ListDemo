import React, { Component } from 'react';
import {
  Image,
  View,
  Animated,
} from 'react-native';
import styles from '../styles/style';

const placeholder = require('../images/placeholder.png');

export default class ImageWithPlaceholder extends Component {
  static defaultProps = {
    duration: 750,
    resizeMode: 'contain',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fadeAnim: new Animated.Value(1),
    };
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        {this._renderPlaceholder.bind(this)()}
        {<Image
          resizeMode={this.props.resizeMode}
          onProgress={this._onProgress.bind(this)}
          style={styles.elementImage}
          source={{ uri: this.props.src }}
        />}
      </View>
    );
  }

  _onProgress = (event) => {
    const progress = event.nativeEvent.loaded / event.nativeEvent.total;
    this.setState({ isLoading: progress < 1 });
  }

  _renderPlaceholder = () => {
    return (
      <Animated.View style={this._getPlaceholderStyles()}>
        <Image
          source={placeholder}
          style={styles.elementImage}
        />
      </Animated.View>
    );
  }

  _getPlaceholderStyles = () => {
    const container = [styles.placeholderContainer];
    if (!this.state.isLoading) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: this.props.duration,
      }).start();
      container.push({ opacity: this.state.fadeAnim });
    }
    return container;
  }
}
