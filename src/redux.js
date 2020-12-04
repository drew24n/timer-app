import {compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const ADD_TIMER = "ADD_TIMER"
const REMOVE_TIMER = "REMOVE_TIMER"
const START_STOP_TIMER = "START_STOP_TIMER"
const UPDATE_TIMER_VALUE = "UPDATE_TIMER_VALUE"
const SET_INTERVAL_ID = "SET_INTERVAL_ID"

const initialState = {
    timers: [],
}

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TIMER:
            return {
                ...state, timers: [...state.timers, action.timer]
            }
        case REMOVE_TIMER:
            return {
                ...state, timers: state.timers.filter(timer => timer.id !== action.id)
            }
        case START_STOP_TIMER:
            return {
                ...state, timers: state.timers.map(timer => {
                    if (timer.id === action.id) {
                        timer.isRunning = action.isRunning
                        return timer
                    } else {
                        return timer
                    }
                })
            }
        case UPDATE_TIMER_VALUE:
            return {
                ...state, timers: state.timers.map(timer => {
                    if (timer.id === action.id) {
                        timer.value += action.value
                        return timer
                    } else {
                        return timer
                    }
                })
            }
        case SET_INTERVAL_ID:
            return {
                ...state, timers: state.timers.map(timer => {
                    if (timer.id === action.id) {
                        timer.intervalId = action.intervalId
                        return timer
                    } else {
                        return timer
                    }
                })
            }
        default:
            return state
    }
}

export const addTimer = (timer) => ({type: ADD_TIMER, timer})
export const removeTimer = (id) => ({type: REMOVE_TIMER, id})
export const startStopTimer = (id, isRunning) => ({type: START_STOP_TIMER, id, isRunning})
export const updateTimerValue = (id, value) => ({type: UPDATE_TIMER_VALUE, id, value})
export const setIntervalId = (id, intervalId) => ({type: SET_INTERVAL_ID, id, intervalId})

export const store = createStore(timerReducer, compose(composeWithDevTools() ? composeWithDevTools() : f => f))