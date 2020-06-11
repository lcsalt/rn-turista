import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import preloadImages from './preloadImages';




// cache images
const cacheImages = images => {
  return Object.values(images).map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });
};

// preload async
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = await Font.loadAsync({
    "openSans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "openSansItalic": require("../assets/fonts/OpenSans-Italic.ttf"),
    "openSansSemibold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "openSansSemiboldItalic": require("../assets/fonts/OpenSans-SemiBoldItalic.ttf"),
    "openSansBold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "openSansBoldItalic": require("../assets/fonts/OpenSans-BoldItalic.ttf"),
    "openSansLight": require("../assets/fonts/OpenSans-Light.ttf"),
    "openSansLightItalic": require("../assets/fonts/OpenSans-LightItalic.ttf"),
    "paytoneOne": require("../assets/fonts/PaytoneOne-Regular.ttf"),
  });
  const imageAssets = cacheImages(preloadImages);

  // promise load all
  return Promise.all([fontAssets, ...imageAssets]);
};



export default {
  cacheImages,
  loadAssetsAsync,
};