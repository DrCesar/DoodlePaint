
import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'


function addPoints(points) {
  console.log(points)
  fetch('http://127.0.0.1:4000/draw', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      line: points
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error.message)
  })
}

function save() {
  fetch('http://127.0.0.1:4000/manage', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: 'save'
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error.message)
  })
}

let Settings = ({ points }) => (
  <View>
    <Button title="Add" onPress={() => addPoints(points)} />
    <Button title="Save" onPress={() => save()} />
  </View>
)


export default Settings
