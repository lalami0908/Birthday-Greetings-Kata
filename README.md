# Birthday-Greetings-Kata

## Usage
need to create a file and set variables in **.env** first.
```
$ cd Birthday-Greetings-Kata
$ npm start
```
server will listen in port 4000

## branch
use MongoDB in version1, 2, 3, 5 and mysql in version4.
change with the variable **DBIS_MONGO** in .env

### version
- verson1:
    - URL
        - GET http://localhost:4000/greeting/api/v1
    - PARAMETERS
        - today: empty or string of Date
        - ex: 8/8, 2021/8/8, 08/08
        -  empty will query for today's date
    - RESPONSE
        - FORMAT: JSON

- version2: GET http://localhost:4000/greeting/api/v2
- version3: GET http://localhost:4000/greeting/api/v3
- version4: GET http://localhost:4000/greeting/api/v4
- version5: GET http://localhost:4000/greeting/api/v5
    - RESPONSE
        - FORMAT: XML
