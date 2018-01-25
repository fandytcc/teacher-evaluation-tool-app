import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const BATCH_STUDENT_UPDATED = 'BATCH_STUDENT_UPDATED'
export const BATCH_STUDENT_REMOVED = 'BATCH_STUDENT_REMOVED'

export const updateStudent = (batch, index, student) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/batches/${batch._id}/students/${student._id}`, { index, ...student })
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: BATCH_STUDENT_UPDATED })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const clearStudent = (batch, student) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.put(`/batches/${batch._id}/students/${student._id}`, { ...student })
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: BATCH_STUDENT_REMOVED })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
