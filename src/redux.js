import {compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const ADD_TIMER = "ADD_TIMER"
const START_TIMER = "START_TIMER"
const UPDATE_TIMER_VALUE = "UPDATE_TIMER_VALUE"
const PAUSE_TIMER = "PAUSE_TIMER"
const REMOVE_TIMER = "REMOVE_TIMER"

const initialState = {
    timers: [],
}

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TIMER:
            return {
                ...state, timers: [...state.timers, ...action.timer]
            }
        case START_TIMER:
            return {
                ...state, timers: state.timers.map(timer => {
                    if (timer.id === action.timer.id) {
                        timer.isRunning = true
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
export const startTimer = (id, isRunning) => ({type: START_TIMER, id, isRunning})

export const store = createStore(timerReducer, compose(composeWithDevTools() ? composeWithDevTools() : f => f))