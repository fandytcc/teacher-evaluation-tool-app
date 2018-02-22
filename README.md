# An Evaluation Tool for Teachers

A React app for teachers to evaluate each student by assignment a colour code on a daily basis based on their performance. 

This app is to learn how to use front-end frameworks [React.js](https://github.com/facebookincubator/create-react-app), [React-Redux](https://github.com/reactjs/redux) with back-end RESTful API [Express.js](https://github.com/expressjs/express) and NoSQL document database [MongoDB](https://github.com/mongodb/mongo) along with [Mongoose](https://github.com/Automattic/mongoose).

These colour codes are: GREEN, YELLOW, and RED. GREEN meaning all good and on track. YELLOW meaning slightly off-track. RED meaning needs extra attention. If a students is marked YELLOW or RED, teachers will have to fill in a remark. For GREEN students, teachers are allowed to omit the remark.

<img width="1000" alt="screen shot 2018-02-22 at 15 39 30" src="https://user-images.githubusercontent.com/32798242/36544456-d2bf7cd6-17e6-11e8-90c4-fd9bd1fc202e.png">
<img width="1000" alt="screen shot 2018-02-22 at 15 40 23" src="https://user-images.githubusercontent.com/32798242/36544454-d27aac64-17e6-11e8-9f6e-cd5de5aa20de.png">

## Algorithm
From the class view, a teacher can click a button “ASK A QUESTION”. It shows the name and picture of a random student for the teacher to ask a question. RED students get ~47% of the questions YELLOW students ~32%, and GREEN students ~21%. 

## Steps
These are the steps I followed when working on this app:
1. Set up a Github project board to keep track of the development progress
2. Draw wireframes, sketch out how users navigate
3. Plan data models, database structure by understanding the impacts of user interaction
4. Create seed data
5. Set up authentication in the back-end
6. Set up a front-end for signing up, in, out and read data from the back-end
7. Tie front-end & back-end together by making buttons, URLs
8. Work on the key feature concerning the algorithm
9. Styling with the latest [material-ui@next](https://material-ui-next.com/)

## Database Structure & Back-end API
Please refer to the related API repo: https://github.com/fandytcc/teacher-evaluation-api

## Work-in-progress
I built this final individual assignment within 4.5 days for Codaisseur Academy graduation assessment. After graduation, I'm currently working on the following features in both front-end & back-end:
  * Edit button on student page
  * Save & next button on student page

## Running Locally
Make sure you have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed.

[IMPORTANT!]
Make sure you have signed in with the details below. Otherwise, it won't work!!
* login email: paul@test.com
* password: a123456

```bash
git clone git@github.com:fandytcc/teacher-evaluation-tool-app.git
cd teacher-evaluation-tool-app
yarn install
yarn start
git clone git@github.com:fandytcc/teacher-evaluation-api.git
cd teacher-evaluation-api
yarn install
yarn start
```

## Related documentation
For more information about using React-Redux, ExpressJS and Mongoose, see these links:

* [React](https://facebook.github.io/react-native/)
* [Redux](https://redux.js.org/)
* [ExpressJS](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [material-ui@next](https://material-ui-next.com/)
