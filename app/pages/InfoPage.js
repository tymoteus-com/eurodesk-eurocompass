import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

function InfoPage(props) {
    return (
    <Video source={{uri: "https://20.eurodesk.pl/storage/video/eurodesk-ig.mp4" }}   // Can be a URL or a local file.
       style={styles.backgroundVideo} />
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default InfoPage;