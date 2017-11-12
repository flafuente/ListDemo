import {
    StyleSheet,
    Platform
} from 'react-native';

export default StyleSheet.create({
    // MAIN ELEMENT
    container: {
        marginTop: Platform.OS === 'ios' ? 64 : 0,
        flex: 1,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tailLoading: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "white"
    },
    // LIST ELEMENT
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderBottomColor: '#dddddd',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 5,
      },
      imageContainer: {
        backgroundColor: '#dddddd',
        width: 90,
        height: 90,
        marginRight: 10
      },
      textContainer: {
        flex: 1,
      },
      elementImage: {
        width: 90,
        height: 90,
      },
      elementName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
      },
      elementDescription: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
      },
      // ImageWithPlaceholder
      placeholderContainer: {
        flex: 1,
        alignSelf: "stretch",
        zIndex: 2,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
      }
});