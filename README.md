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


## Curl Api Test


### Timestamp
curl -X GET -H "Accept: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" 'http://159.203.222.174:8001/Timestamp'

### Transaction Recording
curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "TransactionId": 1,
    "UserId": 2,
    "CurrencyAmount": 3,
    "Verifier": "fd6b91387c2853ac8467bb4d90eac30897777fc6"
}

' 'http://159.203.222.174:8001/Transaction'

### Transaction Data Querying
curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "UserId": 2
}

' 'http://159.203.222.174:8001/TransactionStats'


### Leaderboard Score Posting
curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "UserId": 8,
    "LeaderboardId": 1001,
    "Score": 18982
}

' 'http://159.203.222.174:8001/ScorePost'

### Leaderboard Get
curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "UserId": 2,
    "LeaderboardId": 1001,
    "Offset": 0,
    "Limit": 5
}

' 'http://159.203.222.174:8001/LeaderboardGet'

### User Save

curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "UserId": 1,
    "Data": {
        "Piece1": {
            "SubData": 1234,
            "SubData2": "abcd"
        },
        "Piece2": {
            "SubData": {
                "SubSubData": 5678
            }
        }
    }
}' 'http://159.203.222.174:8001/UserSave'

curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "UserId": 1,
    "Data": {
        "Piece2": {
            "SubData": {
                "SubSubData": 9999
            }
        }
    }
}' 'http://159.203.222.174:8001/UserSave'

### Load User Data

curl -X POST -H "Content-Type: application/json" -H "app-key: NwvprhfBkGuPJnjJp77UPJWJUpgC7mLz" -d '{
    "UserId": 1
}

' 'http://159.203.222.174:8001/UserLoad'
