import React from 'react'
import {Text, StyleSheet, View} from 'react-native'


// show some text to the user
const ComponentScreen = function() {
    // javascript variable
    // can be any value and be used in the text element, except javascript object
    const name = 'Boris';
    const greeting2 = <Text>Hi!</Text>;

    return (
    <View>
    <Text style={styles.textStyle}>This is the components screen</Text>
    <Text style={styles.subHeaderStyle}>my name is {name}</Text>
    {greeting2}

    </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25
    },
    subHeaderStyle:{
        fontSize: 20
    }
});

// export this component so we can use this is other places
export default ComponentScreen;