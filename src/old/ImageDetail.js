import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const ImageDetail = ({ imageSource, imageTitle, imageScore }) => {
    return (
        <View>
            <Image source={imageSource} />
            <Text>{imageTitle}</Text>
            <Text>Image score - {imageScore}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ImageDetail;