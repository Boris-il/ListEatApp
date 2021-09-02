import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { List, Button, TextInput, Divider, Checkbox } from 'react-native-paper';

import { ListItem, Icon, CheckBox } from 'react-native-elements';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Context as IngredientsContext } from '../context/Ingredients/IngredientsContext';
import SearchBar from '../components/SearchBar';

const IngredientsScreen = () => {
  const [term, setTerm] = useState('');
  const [amount, setAmount] = useState('');
  const {
    state,
    initExpanded,
    getAllIngredients,
    deleteIngredient,
    editIngredient,
  } = useContext(IngredientsContext);
  // required for api sync in useEffect
  let isRendered = useRef(false);
  // fetch loading state
  const [isLoading, setIsLoading] = useState(true);

  const userId = '1';

  useEffect(() => {
    isRendered = true;
    getAllIngredients(`${userId}`, () => {
      initExpanded();
      setIsLoading(!isLoading);
    });
    return () => {
      isRendered = false;
    };
  }, []);

  const keyExtractor = (recipe, index) => index.toString();

  const resolveAmountByMeasurementType = (measurement) => {
    switch (measurement) {
      case 'גרם':
      case 'גרמים':
      case 'מל':
        return 50;

      default:
        return 1;
    }
  };

  const handleAmountChange = (id, userId, oldAmount, measurement, type) => {
    if (type === 'increment')
      var newAmount = oldAmount + resolveAmountByMeasurementType(measurement);
    else if (type === 'decrement') {
      var newAmount = oldAmount - resolveAmountByMeasurementType(measurement);
    } else {
      console.log('error in handleAmountChange -  unknown operation');
    }
    if (newAmount >= 0) {
      editIngredient(id, userId, newAmount, measurement);
    } else {
      ToastAndroid.show("Can't Set Negative Amount!", ToastAndroid.BOTTOM);
    }
  };

  const formatAmount = (num) => {
    return num.toFixed(1);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Divider />
        <List.Accordion
          titleStyle={{ alignSelf: 'flex-end', flexWrap: 'wrap' }}
          title={item.ingredient.name}
          descriptionStyle={{ alignSelf: 'flex-end' }}
          description={
            <Text>
              {formatAmount(item.ingredient.amount)}{' '}
              {item.ingredient.measurement}
            </Text>
          }>
          <List.Item
            left={() => (
              <TouchableOpacity
                style={{ marginTop: 3 }}
                onPress={() => deleteIngredient(item.id, userId)}>
                <FontAwesome5 name='trash' size={24} color='black' />
              </TouchableOpacity>
            )}
            right={() => (
              <View style={styles.button_container}>
                <Button
                  contentStyle={styles.button_text}
                  style={styles.button}
                  labelStyle={{ fontSize: 20 }}
                  mode='contained'
                  onPress={() => {
                    handleAmountChange(
                      item.id,
                      userId,
                      item.ingredient.amount,
                      item.ingredient.measurement,
                      'increment'
                    );
                  }}>
                  +
                </Button>
                <TextInput
                  style={styles.text_input}
                  mode='outlined'
                  clearTextOnFocus={true}
                  onChangeText={(newVal) => {
                    editIngredient(
                      item.id,
                      userId,
                      newVal,
                      item.ingredient.measurement
                    );
                  }}
                  selectionColor='#b0b0b0'
                  selectTextOnFocus={true}
                  value={`${item.ingredient.amount}`}
                  //placeholder={`${item.ingredient.amount}`}
                  onPress={() => {}}
                />
                <Button
                  contentStyle={styles.button_text}
                  style={styles.button}
                  labelStyle={{ fontSize: 20 }}
                  mode='contained'
                  onPress={() => {
                    handleAmountChange(
                      item.id,
                      userId,
                      item.ingredient.amount,
                      item.ingredient.measurement,
                      'decrement'
                    );
                  }}>
                  -
                </Button>
              </View>
            )}></List.Item>
        </List.Accordion>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
      <SearchBar
        term={term}
        type='חיפוש מרכיבים'
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {}}
      />
      <View style={{ borderWidth: 1, borderColor: 'red' }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginVertical: 10 }}
            size='large'
            color='#0000ff'
          />
        ) : (
          <FlatList
            vertical
            showsVerticalScrollIndicator
            data={state.filter((ingredient) =>
              ingredient.name.toLowerCase().includes(term.toLowerCase() || '')
            )}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button_container: {
    flex: 1,
    marginRight: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 2,
    height: 30,
  },
  button_text: {
    marginTop: -8,
  },
  text_input: {
    flex: 0,
    height: 28,
    width: 80,
    marginTop: -6,
    textAlign: 'center',
  },
  text_input_selected: {
    color: '#fefcfc',
    flex: 0,
    height: 28,
    width: 80,
    marginTop: -6,
    textAlign: 'center',
  },
});

export default IngredientsScreen;
