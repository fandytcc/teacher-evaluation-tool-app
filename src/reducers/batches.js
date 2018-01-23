// src/reducers/batches.js
import { FETCHED_BATCHES } from '../actions/batches/fetch'
import {
  BATCH_CREATED,
  BATCH_UPDATED,
  BATCH_REMOVED,
  BATCH_STUDENTS_UPDATED,
} from '../actions/batches/subscribe'

const batches = [
  {
    _id: 1,
    title: "Batch 1",
    students: [
      {
        name: "Jason Lo",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "Y", remark: "You are doing great!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "G", remark: "You are doing great!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Peter Pan",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "R", remark: "Try harder!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Need more attention", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "Good job!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "James Wong",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are doing great!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "Try harder!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Mary Lo",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "R", remark: "Try harder!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Need more attention", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "Try harder!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Cat Lo",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "Y", remark: "OK", evaluatedAt: "Jan 23, 2018 " },
          { code: "Y", remark: "OK", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "OK", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Queenie Leung",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "Good job!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Awesome!", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "Google more!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Elisa Boel",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are doing great!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "G", remark: "You are doing great!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Ken Cheung",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "R", remark: "Try harder!", evaluatedAt: "Jan 23, 2018 " },
          { code: "Y", remark: "Need more attention", evaluatedAt: "Jan 22, 2018 " },
          { code: "G", remark: "Good job!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Sebastian Lam",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "Y", remark: "OK", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "Try harder", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Roberto Chan",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "R", remark: "Try harder!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Need more attention", evaluatedAt: "Jan 22, 2018 " },
          { code: "G", remark: "Good job!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
    ],
    startDate: "Dec 10, 2018",
    endDate: "Feb 10, 2018",
  },
  {
    _id: 2,
    title: "Batch 2",
    students: [
      {
        name: "Danny Koh",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "G", remark: "You are doing great!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Paul Cheese",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Try google more.", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "keep it going!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Susan Lo",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "Y", remark: "Good job", evaluatedAt: "Jan 23, 2018 " },
          { code: "Y", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "okay", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Oliver Key",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Try google more.", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "try harder", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Alice Leung",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "Google more", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Matt Peth",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Try google more.", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "need more attention", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "John Hap",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "Y", remark: "Good job", evaluatedAt: "Jan 23, 2018 " },
          { code: "Y", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "Y", remark: "okay", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Alicia Chui",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Try google more.", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "try harder", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Lorence France",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "G", remark: "Good job", evaluatedAt: "Jan 22, 2018 " },
          { code: "G", remark: "You are doing great!", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
      {
        name: "Xander Ox",
        photo: "https://picsum.photos/200/300/?random",
        evaluations: [
          { code: "G", remark: "You are awesome!", evaluatedAt: "Jan 23, 2018 " },
          { code: "R", remark: "Try google more.", evaluatedAt: "Jan 22, 2018 " },
          { code: "R", remark: "Need more attention", evaluatedAt: "Jan 21, 2018 " },
        ]
      },
    ],
    startDate: "Jan 20, 2018",
    endDate: "Mar 24, 2018",
  },
]

export default (state = batches, { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    // case FETCHED_ONE_BATCH :
    //   const gameIds = state.map(g => g._id)
    //   if (gameIds.indexOf(payload._id) < 0) {
    //     return [{ ...payload }].concat(state)
    //   }
    //   return state.map((batch) => {
    //     if (batch._id === payload._id) {
    //       return { ...payload }
    //     }
    //     return batch
    //   })
    //
    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)
    //
    // case BATCH_UPDATED :
    //   return state.map((batch) => {
    //     if (batch._id === payload._id) {
    //       return { ...payload }
    //     }
    //     return batch
    //   })
    //
    // case BATCH_STUDENTS_UPDATED :
    //   return state.map((batch) => {
    //     if (batch._id === payload.batch._id) {
    //       return { ...payload.batch, students: payload.students }
    //     }
    //     return batch
    //   })
    //
    // case BATCH_REMOVED :
    //     return state.filter((batch) => (batch._id !== payload._id))

    default :
      return state

  }
}
