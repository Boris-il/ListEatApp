import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DataTable } from 'react-native-paper';

const NutritionTable = ({ values }) => {
  const formatValues = (values) => {
    Object.keys(values).forEach((key, index) => {
      values[key] = formatDecimal(values[key]);
    });
  };

  const formatDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const checkIfNull = (values) => {
    if (values['נתרן'] === null) {
      return true;
    }
    return false;
  };

  const renderNutiritionValues = (values) => {
    if (checkIfNull(values) == 1) {
      return <Text>מתנצלים, במתכון לא סופקו כמויות</Text>;
    }

    return (
      <DataTable>
        {formatValues(values)}
        <DataTable.Header>
          <DataTable.Title numeric>כמות למתכון</DataTable.Title>
          <DataTable.Title numeric>ערך תזונתי</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['נתרן']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>נתרן</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['כולסטרול']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>כולסטרול</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['זרחן']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>זרחן</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['חלבונים']} גרם</DataTable.Cell>
          <DataTable.Cell numeric>חלבונים</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['סידן']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>סידן</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['ברזל']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>ברזל</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['סיבים']} גרם</DataTable.Cell>
          <DataTable.Cell numeric>סיבים</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['וויטמין C']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>וויטמין C</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['וויטמין D']} מק"ג</DataTable.Cell>
          <DataTable.Cell numeric>וויטמין D</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['וויטמין E']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>וויטמין E</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['שומן רווי']} גרם</DataTable.Cell>
          <DataTable.Cell numeric>שומן רווי</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['אבץ']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>אבץ</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['שומנים']} גרם</DataTable.Cell>
          <DataTable.Cell numeric>שומנים</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['וויטמין B6']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>וויטמין B6</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['סוכרים']} גרם</DataTable.Cell>
          <DataTable.Cell numeric>סוכרים</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['פחמימות']} גרם</DataTable.Cell>
          <DataTable.Cell numeric>פחמימות</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['מגנזיום']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>מגנזיום</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell numeric>{values['אשלגן']} מ"ג</DataTable.Cell>
          <DataTable.Cell numeric>אשלגן</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  };

  return renderNutiritionValues(values);
};

const styles = StyleSheet.create({});

export default NutritionTable;
