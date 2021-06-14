import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'

const ListScreen = function () {
    // array to turn to list
    const friends = [
        { name: 'Mokady homo', age: 25 },
        { name: 'Yuval', age: 25 },
        { name: 'Adi', age: 25 },
        { name: 'Boris', age: 25 },
        { name: 'OneMore', age: 25 },
        { name: 'OneMore2', age: 25 }

    ];

    return (
        <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={function (friend) { friend.name }}
            data={friends}
            // renderItem is a function which will be called for each element in friends
            // the {item} is a reference to each element of the array. Could also pass normal argument and then access to field via 'item' object
            renderItem={function ({ item }) {
                return <Text style={styles.textStyle}>{item.name} - Age {item.age}</Text>
            }

            }>

        </FlatList>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 50

    }


});

export default ListScreen;