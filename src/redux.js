import {compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const ADD_TIMER = "ADD_TIMER"
const REMOVE_TIMER = "REMOVE_TIMER"
const SET_TIMER_STATUS = "SET_TIMER_STATUS"
const UPDATE_TIMER_VALUE = "UPDATE_TIMER_VALUE"

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
        case SET_TIMER_STATUS:
            return {
                ...state, timers: state.timers.map(timer => {
                    if (timer.id === action.timer.id) {
                        timer.isRunning = action.timer.isRunning
                        return timer
                    } else {
                        return timer
                    }
                })
            }
        case UPDATE_TIMER_VALUE:
            return {
                ...state, timers: state.timers.map(timer => {
                    if (timer.id === action.timer.id) {
                        timer.value = action.timer.value
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
export const setTimerStatus = (id, isRunning) => ({type: SET_TIMER_STATUS, id, isRunning})
export const updateTimerValue = (id, value) =>({type: UPDATE_TIMER_VALUE, value})

export const store = createStore(timerReducer, compose(composeWithDevTools() ? composeWithDevTools() : f => f))