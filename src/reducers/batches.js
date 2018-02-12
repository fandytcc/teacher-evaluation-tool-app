// src/reducers/batches.js
import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { BATCH_CREATED, STUDENT_CREATED } from '../actions/batches/create'
import { STUDENT_UPDATED, STUDENT_REMOVED } from '../actions/batches/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return Object.assign({}, state, {allBatches: payload})

    case FETCHED_ONE_BATCH :
      return Object.assign({}, state, {selectedBatch: payload})

    case FETCHED_ONE_STUDENT :
      return Object.assign({}, state, {selectedStudent: payload})

    case BATCH_CREATED :
      const newBatch = Object.assign({}, state, {...payload})
      return [newBatch].concat(state)

      

    case STUDENT_CREATED :
      const newStudent = { ...payload }
      return state.map((batch) => {
        if (batch._id === payload.batch._id) {
          return [newStudent].concat(state)
        }
        return batch
      })

    case STUDENT_UPDATED :
      return state.map((batch) => {
        if (batch._id === payload.batch._id) {
          return { ...payload }
        }
        return batch
      })

    case STUDENT_REMOVED :
        return state.filter((batch) => (batch._id !== payload._id))

    default :
      return state

  }
}
