import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TimeInput from './components/TimeInput';
import Countdown from './components/Countdown';
import vibrate from './utils/vibrate';

const DEFAULT_WORK_MINS = 25;
const DEFAULT_BREAK_MINS = 5;
const minToSec = mins => mins * 60;
const nextTimer = { work: 'break', break: 'work' };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: minToSec(DEFAULT_WORK_MINS),   // in sec
      breakTime: minToSec(DEFAULT_BREAK_MINS), // in sec
      timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000, // in millisec
      isStart: false,
      activeTimer: 'work',
    };
  }

  toggleTimer = () => {
    if (this.state.isStart) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({ isStart: false });
    }
    else {
      const newIntervalId = setInterval(() => {
        if (this.state.timeRemaining >= 0) {
          this.setState(prevState => ({
            timeRemaining: prevState.timeRemaining - 1000,
          }));
        }

        if (this.state.timeRemaining < 0) {

          vibrate();

          if (this.state.activeTimer === 'work') {
            this.setState(prevState => ({ activeTimer: nextTimer[prevState.activeTimer] }));
            this.setState({
              timeRemaining: this.state.breakTime * 1000
            });
          }
          else if (this.state.activeTimer === 'break') {
            this.setState(prevState => ({ activeTimer: nextTimer[prevState.activeTimer] }));
            this.setState({
              timeRemaining: this.state.workTime * 1000
            });
          }
        }
      }, 1000);
      this.interval = newIntervalId;
      this.setState({ isStart: true });
    }
  }

  resetTimer = () => {
    clearInterval(this.interval);
    const {activeTimer} = this.state;
    this.updateTime(activeTimer)(this.state[`${activeTimer}Time`]);
    this.interval = null;
  }

  updateTime = target => (time) => {
    if (this.state.activeTimer === target) {
      clearInterval(this.interval);
      const timeRemaining = +time * 1000;
      this.setState(
        {
          [`${target}Time`]: time,
          timeRemaining,
          isStart: false
        }
      )
    }
    else {
      if (this.state.isStart) {
        this.setState({[`${target}Time`]: time, isStart:true})
      }
      else {
        this.setState({[`${target}Time`]: time, isStart:false})
      }
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.center]}>{this.state.activeTimer.toUpperCase()} TIMER</Text>
        <Countdown style={styles.center} onReset={this.resetTimer} onToggle={this.toggleTimer} isStart={this.state.isStart} timeRemaining={this.state.timeRemaining} />
        <TimeInput
          title='Work Time    '
          value={this.state.workTime}
          onChange={this.updateTime('work')}
        />
        <TimeInput
          title='Break Time   '
          value={this.state.breakTime}
          onChange={this.updateTime('break')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 120,
  },
  center: {
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    textTransform: 'capitalize',
  },
});
