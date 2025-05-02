import { Href, useRouter } from 'expo-router';
import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native'

interface LinkRouteProps {
  style: StyleProp<TextStyle>;
  children?: React.ReactNode;
  href?: Href
}

const LinkRoute = ({ href = '/', style, children }: LinkRouteProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.replace(href)}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  )
}

export default LinkRoute