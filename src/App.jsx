import React, {useState} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addTimer, removeTimer} from "./redux";
import moment from "moment";

export default function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const [name, setName] = useState('')

    const addTimerHandler = (e) => {
        e.preventDefault()
        dispatch(addTimer({
            id: moment.now(),
            name: name,
            value: 0,
            isRunning: false
        }))
        setName('')
    }

    const deleteTimerHandler = (e, id) => {
        e.preventDefault()
        dispatch(removeTimer(id))
    }

    return (
        <div className={styles.container}>
            <h1>Tracker</h1>
            <form onSubmit={addTimerHandler}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={'Enter tracker name'}
                       type="text"/>
                <button>add</button>
            </form>
            {state.timers.map(timer => {
                return (
                    <span key={timer.id}>
                        <p>{timer.name} {timer.value}</p>
                        <button onClick={e => deleteTimerHandler(e, timer.id)}>del</button>
                    </span>
                )
            })}
        </div>
    )
}