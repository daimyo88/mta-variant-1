# My transportation assistant
This a pet project of mine where I can share/practice skills in web development. The idea of project is a closed CRM for a group of road freight transportation companies where they can share data about their transportation prices and see statistics for average prices, product groups (based on other users input).

## Technologies

### Front-end:
#### React/Nextjs
  - Material UI
  - SWR (for state management)
  - Chart.js
  - Formik (with Yup)
  - Next translate
  - Axios

### Back-end
#### Node/Express/MongoDB(cloud version)
  - JWT
  - Express validator
  - Mongoose
  - Axios
  - CORS

### Environment
#### Docker

## To Run the project

- Rename ./client/.env.example and ./server/.env.example to .env with changing variables to yours ones.
- Please ensure docker agent is running and then run 
```
docker-compose up 
```

from the root directory.


