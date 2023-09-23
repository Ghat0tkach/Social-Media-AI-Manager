# Social Media Manager GPT

**An AI Powered Social media manager website to reduce dependency on managers by 50%.**

**Project Status**: Active

**Last Updated**: August 2023

## Overview

The Social Media Manager GPT is a web application powered by artificial intelligence, designed to supercharge your social media management. It offers several features to make your social media management tasks easier and more efficient.

### Features

- **Personalized Social Media Chatbot**: Dedicated to streamlining your social media management tasks.
- **Image Generation**: Create images from prompts and save them to your dashboard.
- **Seamless Posting to Twitter**: Easily post generated images to your Twitter account.
- **Caption Crafting**: AI-powered caption generation for images.
- **Paragraph Composition**: Create entire paragraphs of text for your social media posts.
- **TrendSetter**: Curates the latest trends and provides AI-generated captions and images tailored to your preferences.

## Installation

Follow these steps to set up and run the Social Media Manager GPT locally:

1. Install the dependencies:

   ```bash
   npm install
   ```
2. Run the server:   
    ```
   cd server
   npm start
    ```
3. Run the python backend server
    ```
    cd server/flask-app
    python app.py
    ```

4. Start the app
    ```
     cd client
     npm run dev
    ```

please make sure to add .env files in both client and server directory
in client directory
.env file should have 
  ```
   VITE_SECRET=OpenAI Key
   VITE_POST='AryShare Key
```



.env file in server directory should have  

    
        OPENAI_API_KEY=OpenAPI KEY
        MONGODB_URL=MongoDB URL
        GOOGLE_SEARCH_API=google search api
        CLOUDINARY_CLOUD_NAME=CLOUDINARY_CLOUD_NAME
        CLOUDINARY_API_KEY=CLOUDINARY_API_KEY
        CLOUDINARY_API_SECRET=CLOUDINARY_API_SECRET
      
