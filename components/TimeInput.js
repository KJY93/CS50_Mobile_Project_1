import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

export default function TimeInput(props) {
  const [minInput, setMinInput] = useState(Math.floor(props.value / 60));
  const [secInput, setSecInput] = useState(props.value % 60);

  const handleMinChange = (event) => {
    const min = +event;
    setMinInput(min);
    props.onChange(min * 60 + secInput);
  };

  const handleSecChange = (event) => {
    const sec = +event;
    setSecInput(sec);
    props.onChange(minInput * 60 + sec);
  };

  return (
    <View style={styles.container}>
      {props.title && <Text style={styles.bold}>{props.title}</Text>}
      <Text>Mins:  </Text>
      <TextInput 
        defaultValue={`${minInput}`}
        style={styles.input}
        keyboardType="numeric"
        returnKeyType="done"
        onChangeText={handleMinChange}        
      />
      <Text>Secs:  </Text>
      <TextInput 
        defaultValue={`${secInput}`}
        style={styles.input}
        keyboardType="numeric"
        returnKeyType="done"
        onChangeText={handleSecChange}        
      />      
    </View>
  )
}

TimeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
  },
  controls: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    paddingHorizontal: 5,
    minWidth: 50,
    borderRadius: 3,
    textAlign: 'center'
  },
})