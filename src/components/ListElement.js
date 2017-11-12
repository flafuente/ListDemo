import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from '../styles/style';
import ImageWithPlaceholder from './ImageWithPlaceholder';
// const placeholder = require('../images/placeholder.png');
export default class ListElement extends Component {
  render({ element } = this.props) {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            {/* {<Image defaultSource={placeholder}
            source={{uri: element.item.image_url}}
            style={styles.elementImage} />} */}
            {<ImageWithPlaceholder
              duration={1000}
              src={element.item.image_url}
            />}
          </View>
          <View style={styles.textContainer}>
            <Text testID={'nameText'} style={styles.elementName}>
              {element.item.name}
            </Text>
            <Text testID={ 'emailText' } style={styles.elementDescription}>
              {element.item.email}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
