import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate, LLMChain } from 'langchain';
import { Loader } from '../components';
import { ChatOpenAI } from "langchain/chat_models/openai"; 
import { DallEProvider } from '../context/DallEContext';
import { useDallE } from '../context/DallEContext';
 
function DallEComponent(prompt){
    const [form, setForm] = useState({
        prompt:`${prompt}`,
        photo: '',
      });
    const [generatingImg, setGeneratingImg] = useState(false);

    const generateImage = async () => {
        if (form.prompt) {
          try {
            setGeneratingImg(true);
            const response = await fetch('http://localhost:8000/api/v1/dalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: form.prompt,
              }),
            });
    
            const data = await response.json();
            setForm({ ...form, photo: data.photo});
            console.log(prompt)
            console.log(form.photo)
            
          } catch (err) {
            alert(err);
          } finally {
            setGeneratingImg(false);
          }
        } else {
          alert('Please provide proper prompt');
        }
      };
      useEffect(() => {
        const timeoutId = setTimeout(() => {
          generateImage({ prompt });
        }, 10000); // 30 seconds
      
        return () => clearTimeout(timeoutId); // Clear the timeout on unmount
      }, []);
    return(
    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
    {generatingImg?<Loader/>:
      <img
          src={form.photo}
          alt={form.prompt}
        className="w-full h-full object-contain"
      />}

    </div>)
  }

  function LangChainComponent({sentences}) {
    const [isLoading, setIsLoading] = useState(false);
    
    const [responses, setResponses] = useState([]);
    const [generatedCaption, setGeneratedCaption] = useState('');
    const openAIApiKey = import.meta.env.VITE_SECRET;
    
    const generateResponse = async (sentences) => {
        setIsLoading(true);
        const model = new ChatOpenAI({ openAIApiKey,temperature: 0 });
        const promptTemplate = new PromptTemplate({
          template: `You are a well known and established writer known for writing captivating captions for long sentences . You have been asked to write caption about ${sentences}, Write a short crisp and captivating caption for this`,
          inputVariables: ['sentences']
        });
        const chain = new LLMChain({ llm: model, prompt: promptTemplate });
        const caption = await chain.run({});
        return caption;
    }
        // setResponse(results);
      
        const generateCaptionsForSentences = async (sentences) => {
            setIsLoading(true);
            for (const sentence of sentences) {
                try {
                    const caption = await generateResponse(sentence);
                    console.log(`Sentence: "${sentence}" => Caption: "${caption}"`);
                    setGeneratedCaption(caption);
                    setResponses(prevResponses => [...prevResponses, caption]);
                    await new Promise(resolve => setTimeout(resolve, 30000)); // 10 seconds delay
                } catch (error) {
                    console.error(`Error generating caption for sentence "${sentence}":`, error);
                }
            }
            setIsLoading(false);
        };
    const handleGenerateResponses=()=>{
   
        generateCaptionsForSentences(sentences);
    }
  
    return (
        <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">AI GENERATED CAPTION AND IMAGE</h1>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          onClick={handleGenerateResponses}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Responses'}
        </button>
        <div className="grid gap-4 mt-4">
        {responses.map((response, index) => (
          <div key={index} className="bg-white p-4 shadow rounded">
            <div className="mb-2">
              <strong>Original Sentence:</strong> {sentences[index]}
            </div>
            <div>
              {isLoading ? <Loader /> : <strong>Generated Response:</strong>} {response}
              <DallEComponent prompt={generatedCaption} /> {/* Pass the generated caption as a prop */}
            </div>
          </div>
        ))}
      </div>
        
      </div>
      
    );
  }



  


function RealTimeTrendingStories() {
    const [trendingStories, setTrendingStories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
   

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const fetchTrendingStories = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/v1/googletrends');
            console.log(response.data);
            const trendingStoryData = response.data.storySummaries.trendingStories;

            const currentDate = new Date();
            const firstEightTrendingStories = trendingStoryData
                .slice(0, 2)
                .map((entry, index) => ({
                    schedule: {
                        dayOfWeek: daysOfWeek[(currentDate.getDay() + index + 1) % 7],
                        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index + 1),
                    },
                    story: entry.articles[0].articleTitle,
                }));

            setTrendingStories(firstEightTrendingStories);
        } catch (error) {
            console.error('Error fetching trending stories:', error);
        }
        setIsLoading(false);
    };

    const handleArticleClick = (index) => {
        setSelectedArticle(index === selectedArticle ? null : index);
    };

    return (
        <div className="real-time-trending-stories p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Real-Time Trending Stories</h1>
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
                onClick={fetchTrendingStories}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Fetch Trending Stories'}
            </button>
            <ul>
                {trendingStories.map((story, index) => (
                    <li
                        key={index}
                        className={`flex items-center mb-4 cursor-pointer ${selectedArticle === index ? 'bg-blue-100' : ''}`}
                        onClick={() => handleArticleClick(index)}
                    >
                        <div className="w-3/4 pr-4">
                            <span className="font-semibold">Article {index + 1}:</span> {story.story}
                        </div>
                        <div className="w-1/4 text-right">
                            {story.schedule && (
                                <>
                                    <div>{story.schedule.dayOfWeek}</div>
                                    <div className="text-xs">{story.schedule.date.toDateString()}</div>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {selectedArticle !== null && (
                <div className="mt-4 p-4 bg-white shadow rounded">
                    <h2 className="text-xl font-semibold mb-2">
                        Selected Article: {trendingStories[selectedArticle].story}
                    </h2>
                    <p>
                        Scheduled for {trendingStories[selectedArticle].schedule.daysOfWeek},
                        {trendingStories[selectedArticle].schedule.date.toDateString()}
                    </p>
                </div>
            )}
            <LangChainComponent sentences={trendingStories.map(story => story.story)} />
        </div>
    );
}

function SocialMediaManagerGPT() {


  return (
      <div className="min-h-screen mt-20 bg-gradient-to-r from-blue-400 to-purple-600 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="text-center">
                  <h1 className="text-3xl font-extrabold text-white">
                      Social Media Manager with GPT-3
                  </h1>
              </div>
              <div className="mt-10">
                  <RealTimeTrendingStories />
                
              </div>
          </div>
      </div>
  );
}
export default SocialMediaManagerGPT
