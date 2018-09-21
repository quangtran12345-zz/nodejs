## API DOCUMENTATION
- Domain API: `https://cinema-hatin.herokuapp.com/`
- Các thông tin về ngày tháng là kiểu number (miliseconds timestamp)
## 1. API 
### 1.1 'api/cinema' [All]
`GET` - Get all movies <br>
#### Success Response
{ films: `<Movies Array>` } <br>
#### Error Response
{ error: `<String>` } <br>

### 1.2 '/api/cinema/'
`POST` - Create movie <br>
#### Request Params
`title`: Movie title `<String>` (required)
`genre`: Movie genre `<String>` (required)
`releaseDate`: Movie release date `<String: DD/MM/YYYY>` (required)
`content`: Movie description `<String>`
#### Request Example
```json
{  
  "name": "The Godfather II",
  "genre": "Hành động",
  "releaseDate": "12/1974",
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
cinema: {
  _id: "5ba46dfbc9a0f8001444cd7f",
  name: "Kungfu Panda",
  creatorId: "5ba4660cc9a0f8001444cd79",
  genre: "Hành động",
  content: "This is Kungfu Panda content",
  releaseDate: 1537462800000,
  posterURL: "/images/1526555148166.jpg",
  createdDate: 1537502715851,
  user: {
  _id: "5ba4660cc9a0f8001444cd79",
  email: "abc@email.com",
  password: "$2b$10$9SoGF9vh/ox5VXX/6N4e1e82ntf3He9NbgS1zNu3tmKC.LC6CHtOO",
  name: "mina",
  userLink: "mina-4cd79",
  avatarURL: "/images/source.gif"
  },
  link: "abc-4cd7f"
}
```
#### Success Response
{ message: `Movie created successfully`, photoURL: `<String>` } <br>
#### Error Response
{ errorMessage: `<String>` } <br>
#### Error Response
{ error: `<String>` }
