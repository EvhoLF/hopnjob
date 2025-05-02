import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

type ButtonProps = {
  onPress: () => void;
  children?: React.ReactNode;
  iconStart?: string;
  iconEnd?: string;
  variant?: 'primary' | 'link' | 'fab';
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconRight?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  iconStart,
  iconEnd,
  variant = 'primary',
  customStyle,
  textStyle,
}) => {
  const containerStyles = [
    styles.base,
    { primary: styles.primary, link: styles.link, fab: styles.fab }[variant],
    customStyle,
  ];

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <View style={styles.content}>
        {iconStart && <FontAwesome name={iconStart as any} size={16} />}
        {children && <Text style={[styles.text, variant === 'primary' && styles.textPrimary, textStyle]}>{children}</Text>}
        {iconEnd && <FontAwesome name={iconEnd as any} size={16} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  primary: {
    backgroundColor: '#467b9e',
    padding: 14,
    marginBottom: 16,
  },
  link: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 6,
    elevation: 4,
    zIndex: 10,
  },
  text: {
    fontSize: 16,
  },
  textPrimary: {
    color: '#fff',
  },
});

export default Button;
