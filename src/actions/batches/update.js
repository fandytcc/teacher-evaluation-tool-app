import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const STUDENT_UPDATED = 'STUDENT_UPDATED'
export const STUDENT_REMOVED = 'STUDENT_REMOVED'

export const updateStudent = (batchId, studentId, studentUpdates) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/batches/${batchId}/students/${studentId}`, studentUpdates)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: STUDENT_UPDATED, payload: res.body })
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

export const clearStudent = (batchId, studentId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.delete(`/batches/${batchId}/students/${studentId}`)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: STUDENT_REMOVED, payload: res.body })
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
