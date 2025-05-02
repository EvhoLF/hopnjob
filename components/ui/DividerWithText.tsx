import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = ({ children = 'or' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{children}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB', // можно заменить на другой цвет по дизайну
  },
  text: {
    marginHorizontal: 10,
    color: '#6B7280', // серый
    fontWeight: '500',
  },
});

export default DividerWithText;
