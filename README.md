# Instructions
## _Follow the steps to load the information into the database_

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,

- Make sure you have the mongodb instance running on your computer
        -  ```brew services start mongodb-community``` (S.O Mac OS)
        -  ```mongod --port 27017``` (S.O Windows)
- Raise the backend server with npm or yarn
        -  ```yarn dev``` or ```npm dev``` 
- In this step it is important to have a software that pretends to be a Client such as Postman or Insomnia
- Now once the mongodb instance and the backend are running, we proceed to make a ```POST``` request to the endpoint: 
    - ```http://localhost:3009/api/v1/movie/many```
    - The endpoint receives an Array of objects from the following Movie Schema
    - @Schema
 * @Array of movies
 * {String}  title                
 * {String}  release_date         
 * {Number}  duration             
 * {String}  overview             
 * {String}  cover_url            
 * {String}  trailer_url          
 * {String}  directed_by          
 * {Number}  phase                
 * {String}  saga                 
 * {Number}  chronology           
 * {Number}  post_credit_scenes   
    # Example of request POST

 ![alt text](https://firebasestorage.googleapis.com/v0/b/grupoquasar-d750e.appspot.com/o/Screen%20Shot%202021-07-12%20at%2016.44.16.png?alt=media&token=6d07e509-780c-422f-a1e8-ff35f1eb4155)