// src/reducers/batches.js
import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { BATCH_CREATED, STUDENT_CREATED } from '../actions/batches/create'
import { BATCH_STUDENT_UPDATED, BATCH_STUDENT_REMOVED } from '../actions/batches/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    case FETCHED_ONE_BATCH :
      const batchIds = state.map(b => b._id)
      if (batchIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })

    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)

    case STUDENT_CREATED :
      const newStudent = { ...payload }
      return state.map((batch) => {
        if (batch._id === payload.batch._id) {
          return [newStudent].concat(state)
        }
        return batch
      })

    case FETCHED_ONE_STUDENT :
    if (batchIds.indexOf(payload._id) < 0) {
      return [{...payload}].concat(state)
    }
    return state.map((batch, student) => {
      if (batch._id === payload.batch._id && student._id === payload.batch.student._id) {
        return { ...payload.batch, student: payload.student }
      }
      return batch
    })

    case BATCH_STUDENT_UPDATED :
      return state.map((batch) => {
        if (batch._id.students._id === payload.batch._id.student._id) {
          return { ...payload.batch, students: payload.student }
        }
        return batch
      })

    case BATCH_STUDENT_REMOVED :
        return state.filter((batch) => (batch._id.student._id !== payload._id.student._id))

    default :
      return state

  }
}
