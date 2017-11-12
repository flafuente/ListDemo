# ListDemo

## Requirements
* NodeJs [More info](https://nodejs.org)
* React Native Cli [More info](https://www.npmjs.com/package/react-native-cli)
* Xcode [More info](https://developer.apple.com/xcode/)
* MacOS [More info](https://www.apple.com/macos)

![List Demo](https://raw.githubusercontent.com/flafuente/ListDemo/master/demoGif.gif "List Demo")

## Installation steps
```
git clone https://github.com/flafuente/ListDemo.git
```
```
cd ListDemo
```
```
npm install
```
```
react-native run-ios
```
## Testing
#### Unit + component testing
Tests are contained in the `__tests__` directory.
```
npm test
```
#### E2e
Requires `appium server` and app running using `'react-native run-ios'`
Tests are contained in the `__e2e__` directory.
```
yarn test:e2e
```

## Features

### FlatList component
The flatlist component brings performance features like setting visibility only to elements within the viewport, allowing big list elements.

The component also has the following props used to compose the demo:
* onEndReached -> To lazyload items.
* onRefresh -> Pull to refresh functionality
* ListFooterComponent -> Show activity loader when loading a new set of data.
* ListHeaderComponent -> Search bar header to filter results
### Image Lazy Load performance
A custom ImageWithPlaceholder component `src/components/ImageWithPlaceholder.js` has been created to lazy load images after displaying a placeholder image.

For performance reasons i would recommend to use the native Image component that contains a placeholder feature that performs much better but can't make use of the transition animation.

### Multiple search
Using a single search bar input the fetch class `src/api/fetch.js` creates api calls for the different cases:
* Email -> Regex tests for `email` present.
* Name / Surname -> Single string without spaces will perform an api call with `last_name` filter and if no results were return with the `first_name` filter. 
* Full Name -> If spaces are present in the string up to 3 different api calls will be made in case no results were returned in the following order: 1) `name` 2) `last_name` 3) `first_name`