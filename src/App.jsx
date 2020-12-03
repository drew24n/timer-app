import React from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";

export default function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    return (
        <div className={styles.container}>
        </div>
    )
}