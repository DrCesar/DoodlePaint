
import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'


let Settings = ({ dispatch }) => (
  <View>
    <Button title="save" onPress={() => console.log('hola')} />
  </View>
)

Settings = connect()(Settings)

export default Settings
