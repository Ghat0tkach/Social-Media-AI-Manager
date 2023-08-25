# Installation

## Install the dependencies
```npm install```

## Run the server
```cd server```
```npm start```

## Run the python backend server
```cd server```
```cd flask-app```

## Start the app
```cd client```
```npm run dev```

please make sure to add .env files in both client and server directory
in client directory
.env file should have 
```VITE_SECRET=OpenAI Key```
```VITE_POST='AryShare Key```

.env file in server directory should have   
OPENAI_API_KEY=``OpenAPI KEY````
MONGODB_URL=```MongoDB URL```
GOOGLE_SEARCH_API=```google search api```
CLOUDINARY_CLOUD_NAME=```CLOUDINARY_CLOUD_NAME```
CLOUDINARY_API_KEY=```CLOUDINARY_API_KEY```
CLOUDINARY_API_SECRET=```CLOUDINARY_API_SECRET```
