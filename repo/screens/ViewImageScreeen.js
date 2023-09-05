import React from 'react';
import { Image } from 'react-native';

import colors from '../config/colors';

function ViewImageScreen(props) {
    return <Image source={require("../assets/page.jpg")} />;
}

export default ViewImageScreen;