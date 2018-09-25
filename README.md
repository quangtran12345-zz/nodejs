## API DOCUMENTATION
- Domain API: `https://cinema-hatin.herokuapp.com/`
- Các thông tin về ngày tháng là kiểu number (miliseconds timestamp)
## 1. API MOVIE
### 1.1 'api/cinema' [All]
`GET` - Get all movies <br>
#### Success Response
{ films: `<Movies Array>` } <br>
#### Error Response
{ error: `<String>` } <br>

### 1.2 '/api/cinema/'
`POST` - Create movie <br>
#### Request Params
`title`: Movie title `<String>` (required)<br>
`genre`: Movie genre `<String>` (required)<br>
`releaseDate`: Movie release date `<String: DD/MM/YYYY>` (required)<br>
`content`: Movie description `<String>`<br>
#### Request Example
```json
{  
  "name": "The Godfather II",
  "genre": "Hành động",
  "releaseDate": "20/12/2017",
  "content": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate."
}
```
#### Success Response
{ message: `Movie created successfully`, photoURL: `<String>` } <br>
#### Error Response
{ errorMessage: `<String>` } <br>

### 1.3 '/api/v1/cinema/:id' [All]
`GET` - Get 1 movie by _id <br>
#### Success Response
{ cinema: `<Movies Object>` } <br>
#### Sample response
```json
{
"cinema": {
 "_id": "5ba46dfbc9a0f8001444cd7f",
 "name": "Kungfu Panda",
 "creatorId": "5ba4660cc9a0f8001444cd79",
 "genre": "Hành động",
 "content": "This is Kungfu Panda content",
 "releaseDate": 1537462800000,
 "posterURL": "/images/1526555148166.jpg",
 "createdDate": 1537502715851,
  "link": "abc-4cd7f"
 }
}
```
#### Success Response
{ cinema : `<Object>`} <br>
#### Error Response
{ error: `<String>` }
## 2. API AUTH
### 2.1 '/api/auth/signup' [All]
`POST` - Sign up an account <br>
#### Request Params
`email`: Email `<String>` (required)
`username`: User's name `<String>` (required)
`password`: Password `<String>` (required)
#### Request Example
```json
{
  "email": "test1@cinema.com",
  "username": "Test Cinema",
  "password": "maenic"
}
```
#### Success Response
{ user: `<User Object>`} <br>
#### Error Response
{ error: `<String>` } <br>

### 2.2 '/api/auth/signin' [All]
`POST` - Sign in <br>
#### Request Params
`email`: Email `<String>` (required)
`password`: Password `<String>` (required)
#### Request Example
```json
{
  "email": "test1@cinema.com",  
  "password": "maenic"
}
```
#### Success Response
{ status: `200`, user: `<User Object>`, token: `<String>` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>
