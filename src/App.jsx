import React, {useState} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addTimer, removeTimer, setIntervalId, startStopTimer, updateTimerValue} from "./redux";
import moment from "moment";

export default function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const [name, setName] = useState('')

    const addTimerHandler = (e) => {
        e.preventDefault()
        dispatch(addTimer({
            id: moment.now(),
            intervalId: null,
            name: name,
            value: 0,
            isRunning: false
        }))
        setName('')
    }

    const deleteTimerHandler = (id) => {
        dispatch(removeTimer(id))
    }

    const switchTimer = (id) => {
        const currentTimer = state.timers.find(timer => timer.id === id)

        if (!currentTimer.isRunning) {
            dispatch(startStopTimer(id, true))
            const intervalId = setInterval(() => dispatch(updateTimerValue(id, 1000)), 1000)
            dispatch(setIntervalId(id, intervalId))
        } else {
            dispatch(startStopTimer(id, false))
            clearInterval(currentTimer.intervalId)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Tracker</h1>
            <form onSubmit={addTimerHandler}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={'Enter tracker name'}
                       type="text" required={true} autoFocus={true}/>
                <button>add</button>
            </form>
            {state.timers.map(timer => {
                return (
                    <span key={timer.id}>
                        <p>{timer.name} {moment.utc(timer.value).format('HH:mm:ss')}</p>
                        <button
                            onClick={() => switchTimer(timer.id)}>{timer.isRunning ? 'stop' : 'run'}</button>
                        <button onClick={() => deleteTimerHandler(timer.id)}>del</button>
                    </span>
                )
            })}
        </div>
    )
}