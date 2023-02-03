import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from 'react'

const Loading = () => {
  return (
    <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator size="large" />
      <Text style>Loading</Text>
    </View>
  )
}

export default Loading