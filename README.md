## Prerequisite
Node.Js
Npm

## How to run 
Run `npm install` to install all the module dependencies. 


`MONGO_URL="apiUser:password@159.203.222.174:27017/gamedb" npm start`: starts the app and attached to the process
`npm run-script server-start`: runs the app using forever
`npm run-script server-stop`: stops all the process managed by forever
`npm run-script server-list`: list all processes that are managed by forever
`npm test`: run unit tests

## Assumptions


## Things to be done differently, given more time

- Maybe use relational database to manage userScore and leaderboard because it is
not easy to handle `ranked` result especially when scores are equal. Of course 
one option would be doing it the app server, but I'm not a big fan of doing that,
cuz of the impact on performance and memory footprint as the data grows.

- The other option is to use map-reduce or something that re-calculates the rank 
when a new user score is recorded (doesn't seem like a good idea).

- More unit test



