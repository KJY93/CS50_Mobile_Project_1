import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    text: { fontSize: 56 },
    center: {
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 48,
        textTransform: 'capitalize',
    },
    button: {
        borderColor: '#0dbab1',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#0dbab1',
        borderRadius: 7,
        width: 90,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        lineHeight: 35,
    },
    toggleButton: {
        marginRight: 8,
    },
    resetButton: {
        marginLeft: 8,
    }
});

const Countdown = props => {
    const totalSec = Math.round((props.timeRemaining) / 1000);
    const mins = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    const minPaddedZero = mins < 10 ? '0' : '';
    const secPaddedZero = sec < 10 ? '0' : '';
    const buttonTitle = props.isStart ? 'Stop' : 'Start';
    return (
        <View>
            <Text style={[styles.text, styles.center]}>{minPaddedZero}{mins}:{secPaddedZero}{sec}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.toggleButton ]} onPress={props.onToggle}>
                    <Text style={styles.buttonText}>{buttonTitle}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.resetButton ]} onPress={props.onReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



Countdown.propTypes = {
    timeRemaining: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Countdown