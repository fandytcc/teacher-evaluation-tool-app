// src/reducers/batches.js
import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { BATCH_CREATED, STUDENT_CREATED } from '../actions/batches/create'
import { STUDENT_UPDATED, STUDENT_REMOVED } from '../actions/batches/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return Object.assign({}, state, { allBatches: payload })

    case FETCHED_ONE_BATCH :
      return Object.assign({}, state, { selectedBatch: payload, studentsPerBatch: payload.students })

    case FETCHED_ONE_STUDENT :
      return Object.assign({}, state, { selectedStudent: payload })

    case BATCH_CREATED :
      return Object.assign({}, state, { allBatches: [payload].concat(state.allBatches) })
      // return [newBatch].concat(state)

    case STUDENT_CREATED :
      return Object.assign({}, state, { selectedBatch: payload })

    case STUDENT_UPDATED :
      return Object.assign({}, state, { selectedBatch: payload })

    case STUDENT_REMOVED :
      return Object.assign({}, state, { selectedBatch: payload })

    default :
      return state

  }
}
