import React, {useState} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addTimer, removeTimer, setIntervalId, startStopTimer, updateTimerValue} from "./redux";
import moment from "moment";
import "moment-duration-format";

export default function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const [timerName, setTimerName] = useState('')

    const addTimerHandler = (e) => {
        e.preventDefault()
        const timerId = moment.now()
        dispatch(addTimer({
            id: timerId,
            intervalId: null,
            name: timerName || moment().format("YYYY-MM-DD"),
            value: 0,
            isRunning: false
        }))
        setTimerName('')
        startTimer(timerId)
    }

    const deleteTimerHandler = (id) => {
        dispatch(removeTimer(id))
    }

    const startTimer = (id) => {
        dispatch(startStopTimer(id, true))
        const intervalId = setInterval(() => dispatch(updateTimerValue(id, 1000)), 1000)
        dispatch(setIntervalId(id, intervalId))
    }

    const stopTimer = (id, intervalId) => {
        dispatch(startStopTimer(id, false))
        clearInterval(intervalId)
    }

    const switchStartStop = (id) => {
        const currentTimer = state.timers.find(timer => timer.id === id)
        if (!currentTimer.isRunning) {
            startTimer(id)
        } else {
            stopTimer(id, currentTimer.intervalId)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Tracker</h1>
            <form onSubmit={addTimerHandler}>
                <input value={timerName} onChange={e => setTimerName(e.target.value)} placeholder={'Enter tracker name'}
                       type="text" autoFocus/>
                <button>add</button>
            </form>
            {state.timers.map(timer => {
                return (
                    <div key={timer.id}>
                        <p>{timer.name} {moment.duration(timer.value, 'ms').format('HH:mm:ss', {trim: false})}</p>
                        <button onClick={() => switchStartStop(timer.id)}>{timer.isRunning ? 'stop' : 'run'}</button>
                        <button onClick={() => deleteTimerHandler(timer.id)}>del</button>
                    </div>
                )
            }).reverse()}
        </div>
    )
}