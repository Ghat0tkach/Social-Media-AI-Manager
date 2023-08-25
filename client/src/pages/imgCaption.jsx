import React, { useEffect, useState } from 'react';
import { ChatOpenAI } from "langchain/chat_models/openai"; 
import { PromptTemplate, LLMChain } from 'langchain';
import { Loader } from '../components';
import axios from 'axios';

function ImgCaption() {
  const openAIApiKey = import.meta.env.VITE_SECRET;

  const [prediction, setPrediction] = useState('');
  const [isLoading,setIsLoading]=useState(false)
  const [isLoading2,setIsLoading2]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the selected image
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error predicting:', error);
    }finally{
        setIsLoading(false);
    }
  };
  const [response, setResponse] = useState('');
  const generateResponse = async (userInput) => {
   
      setIsLoading2(true);
    const model = new ChatOpenAI({ openAIApiKey,temperature: 0 });
    const promptTemplate = new PromptTemplate({
      template: `You are very good content writer , as content writer you are asked to write on the following question: ${userInput}
      .Answer these question in brief with proper grammar and vocab`,
      inputVariables: [],
    });
    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
    const result = await chain.run({});
   setResponse(result)
    // console.log(result)
    setIsLoading2(false);
  
    }
    

  const handleSubmit = (e) => {
        e.preventDefault();
        generateResponse(prediction);
      };

  return (
    <>
    <div className="mt-10 bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-900">
    <h1 className="mt-10 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-white">
      Generate Content from your <br /><span className='text-blue-300'>Images</span>
    </h1>

  </div>
  <div className="min-h-80 mt-10 flex flex-col lg:flex-row justify-around items-center bg-gray-100">
  <div className="bg-white p-8 rounded shadow-lg mb-4 lg:mb-0 lg:mr-4 lg:flex-shrink-0">
    <h1 className="text-2xl mb-4">Image Captioning App</h1>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="mb-4"
    />
    {previewImage && (
      <img src={previewImage} alt="Selected" className="max-w-md mb-4" />
    )}
    {isLoading ? (
      <Loader />
    ) : (
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload and Analyze
      </button>
    )}
    {prediction && <p className="mt-4">Prediction: {prediction}</p>}
   
  </div>

  <div className="bg-white p-8 rounded shadow-lg overflow-y-auto">
  {prediction && (
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>Generate content</button>
    )}
    <p>Your content will be generated here</p>
    {isLoading2 ? <Loader /> : <p>{response}</p>}
  </div>
</div>

 
    </>
  );
}


export default ImgCaption