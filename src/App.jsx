import React, {useState} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addTimer, removeTimer, setIntervalId, startStopTimer, updateTimerValue} from "./redux";
import moment from "moment";
import "moment-duration-format";
import pause from './icons/pause_circle_outline-black-18dp.svg';
import start from './icons/play_arrow-black-18dp.svg';

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

    const deleteTimerHandler = (id, intervalId) => {
        const currentTimer = state.timers.find(timer => timer.id === id)
        if (currentTimer.isRunning) {
            stopTimer(id, intervalId)
        }
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
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1>Tracker</h1>
                <form onSubmit={addTimerHandler}>
                    <input value={timerName} onChange={e => setTimerName(e.target.value)}
                           placeholder={'Enter tracker name'} type="text" autoFocus/>
                    <button/>
                </form>
                <div className={styles.timersContainer}>
                    {state.timers.map(timer => {
                        return (
                            <div key={timer.id} className={styles.timer}>
                                <p className={styles.timerName}>{timer.name}</p>
                                <nav>
                                    <p>{moment.duration(timer.value, 'ms').format('HH:mm:ss', {trim: false})}</p>
                                    <button onClick={() => switchStartStop(timer.id)} className={styles.start_stop_btn}
                                            style={timer.isRunning
                                                ? {background: `url(${pause})`}
                                                : {background: `url(${start})`}
                                            }>
                                    </button>
                                    <button onClick={() => deleteTimerHandler(timer.id, timer.intervalId)}
                                            className={styles.del_btn}/>
                                </nav>
                            </div>
                        )
                    }).reverse()}
                </div>
            </div>
        </div>
    )
}