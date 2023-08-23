import React, { useState } from 'react';
import { ChatOpenAI } from "langchain/chat_models/openai"; 
import { PromptTemplate, LLMChain } from 'langchain';
import { Loader } from '../components';

const MainProduct= () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tags,setTags]=useState('');
  const openAIApiKey = import.meta.env.VITE_SECRET;
  const generateResponse = async (userInput) => {
    setIsLoading(true);
    const model = new ChatOpenAI({ openAIApiKey,temperature: 0 });
    const promptTemplate = new PromptTemplate({template: `As a reputed and well experienced social media manager, you are asked the following question: ${userInput}.Answer these question in breif by keeping socialMedia presence and Personal growth`, inputVariables: [] });
    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
    const result = await chain.run({});
    setResponse(result);
    setIsLoading(false);
  };
   const generateTagsasync =async(userInput) => {
    setIsLoading(true);
    const model = new ChatOpenAI({ openAIApiKey: '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',temperature: 0 });
    const promptTemplate = new PromptTemplate({template: `As a reputed and well experienced social media manager, you are asked the following question: ${userInput}.Display the latest trends regarding the business`, inputVariables: [] });
    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
    const result = await chain.run({});
    setTags(result);
    setIsLoading(false);
   }
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleTags = (event) => {
    event.preventDefault();
    generateTagsasync(input);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    generateResponse(input);
  };
  const refreshPrompt=()=>{
    setInput('');
    setResponse('');
    setTags('');
  }

  return (
    <div className='flex flex-col items-center gap-2 mb-2'>
      <h1 className='m-5'>Your Personal Social Media Manager 🧑‍💼</h1>
      <form className='flex flex-col items-center gap-2 mb-2' onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-900">
          Input:
          <input className='h-auto w-10 w-max bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3' type="text" value={input} onChange={handleInputChange} />
        </label>
        <div className='flex gap-3'>
        <button type="submit" className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
        <button onClick={handleTags} className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Analyze important trends</button>
        {response  && <button type="submit" className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' onClick={refreshPrompt}>Generate New Prompt</button>}
        </div>
        
      </form>
      <div className='h-auto w-auto font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
        {isLoading ? <Loader/> : <p>{response}</p>}
      </div>
      <div className='h-auto w-auto font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
        {isLoading ? <Loader/> : <p>{tags}</p>}
        </div>
    
    </div>
  );
};


export default MainProduct;