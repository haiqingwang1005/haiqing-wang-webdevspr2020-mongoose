# haiqing-wang-webdevspr2020-Assignment4
Assignment 4 for cs5610

Heroku deployment: https://haiqing-tiny.herokuapp.com/
Github repository: https://github.com/haiqingwang1005/haiqing-wang-webdevspr2020-mongoose

## Features
### Front End
The react app consist of two main pages:
1. The `/shorten` page
    1. User can generate the tiny url in this page. User can input the original long url, and an optional branded index.
    2. If user doesn't input the branded index, the tiny url will be with a random generated unbranded index, like `/tiny/SCmFMzWMn`.
    If user inputs the branded index, like 'banana', the tiny url will be with this customized index, like `/tiny/banana`.
    3. There is a navigation bar on the top of the page, where user can come back to this page later.

2. The `/:shortenIndex/edit` page
    1. When the tiny url is generated, the link will be shown on the `/shorten` page, and there is an edit button near it. User
    can click it and it will redirect user to `/:shortenIndex/edit` page.
    2. On the edit page, user can revise the long url, and click the edit button to edit it. Or click the delete button to delete the tiny url.
    3. After successfully editing, an alert will show. After successfully deleting, user will be redirect to `/shorten` page.
    4, There is a navigation bar on the top of the page, where user can nav to the `/shorten` page.
    
3. Error handling and complications    
    1. If multiple users try to tiny the same long url, it will return the same existing tiny url for that long url.
    2. If user try to use a branded index that already exists, there are two case:
        * If the current long url is the same with the long url presented by the existing branded index, it will return the same tiny url.
        * If the current long url is different than the long url presented by the existing branded index, it will return an error. The UI will
        show error message that the customized branded URL already exist.
    3. There are two schemas in the database. One is "MappingSchema", which is a one to one tinyKey-longUrl mapping. The other schema is "URLSchema"", which is a
        one to many mapping, the key is the long url hashing, and the value is a list of pair. Each pair has the tinyKey and the original long url.
        Unbranded and branded URLs are stored in the same database and need to touch the same two schemas.
    4. If the user try to shorten an invalid URL, it will show an error page saying the URL is invalid. 
    5. After the user delete a tiny url, it will redirect user to the `/shorten` page.
    6. If users try to edit a non-existing page, it will show a error page indicating the content doesn't exit.
    7. If users try to query a non-existing tiny url, it will return a `404` error.
    
### Mongoose and MongoDB
1. In development, I use Mongodb Atlas, the database URL is config in local `.env` file. In Heroku production, I use the mLab MongoDB, and the
database URL is configured in heroku setting Config Vars.
2. There are two schemas in the database. One is "MappingSchema", which is a one to one tinyKey-longUrl mapping. The other schema is "URLSchema"", which is a 
one to many mapping, the key is the long url hashing, and the value is a list of pair. Each pair has the tinyKey and the original long url. Each schema will be
used to create/update/delete/query data.

### Backend RESTful API
There are 5 APIs
1. GET /api/shorten/:shortenKey
    * It returns the long url for the shortenKey. If the long url doesn't exist, it return 404.
    
2. POST /api/shorten, with body { original: <longUrl>, index: <brandedIndex> (optional)}. 
    * It create a new tiny.
    
3. PUT /api/shorten/:shortenKey, with body {newUrl: <longUrl>}, 
    * It update the long url behind the tiny url
    
4. DELETE /api/shorten/:shortenKey
    * It delete the long url behind the tiny url
    
5. GET /tiny/:shortenKey
    * It is the url we returned to user. 
    * When user make a get request to it, it does a 302 redirect to the long url behind the key shortenKey.
    * If users try to query a non-existing tiny url, it will return a `404` error.

## Development Steps
### Start the application locally
`npm install` then `npm run dev`

### Heroku deployment tricky
1. Heroku doesn't allow us specify the port number, and we should use the `proccess.env.PORT`
2. In Heroku the app is running as prod, and react app cannot be started automatically. To locate react app, we need to add the following code
```
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}
```

### Useful commands:
1. `npm run dev` will run back and frontend simultaneously
2. `npm run devserver` will just run the backend
