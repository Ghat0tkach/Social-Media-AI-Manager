// import React, { useState } from 'react';
// import { ChatOpenAI } from "langchain/chat_models/openai"; 
// import { PromptTemplate, LLMChain } from 'langchain';
// import { Loader } from '../components';

// const SocialMediaManager = () => {
  // const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [tags,setTags]=useState('');

//   const generateResponse = async (userInput) => {
//     setIsLoading(true);
//     const model = new ChatOpenAI({ openAIApiKey,temperature: 0 });
//     const promptTemplate = new PromptTemplate({template: `As a reputed and well experienced social media manager, you are asked the following question: ${userInput}.Answer these question in breif by keeping socialMedia presence and Personal growth`, inputVariables: [] });
//     const chain = new LLMChain({ llm: model, prompt: promptTemplate });
//     const result = await chain.run({});
//     setResponse(result);
//     setIsLoading(false);
//   };
//    const generateTagsasync =async(userInput) => {
//     setIsLoading(true);
//     const model = new ChatOpenAI({ openAIApiKey: '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',temperature: 0 });
//     const promptTemplate = new PromptTemplate({template: `As a reputed and well experienced social media manager, you are asked the following question: ${userInput}.Display the latest trends regarding the business`, inputVariables: [] });
//     const chain = new LLMChain({ llm: model, prompt: promptTemplate });
//     const result = await chain.run({});
//     setTags(result);
//     setIsLoading(false);
//    }
//   const handleInputChange = (event) => {
//     setInput(event.target.value);
//   };
//   const handleTags = (event) => {
//     event.preventDefault();
//     generateTagsasync(input);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     generateResponse(input);
//   };
//   const refreshPrompt=()=>{
//     setInput('');
//     setResponse('');
//     setTags('');
//   }

//   return (
//     <div className='flex flex-col items-center gap-2 mb-2'>
//       <h1 className='m-5'>Your Personal Social Media Manager 🧑‍💼</h1>
//       <form className='flex flex-col items-center gap-2 mb-2' onSubmit={handleSubmit}>
//         <label className="block text-sm font-medium text-gray-900">
//           Input:
//           <input className='h-auto w-10 w-max bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3' type="text" value={input} onChange={handleInputChange} />
//         </label>
//         <div className='flex gap-3'>
//         <button type="submit" className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
//         <button onClick={handleTags} className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Analyze important trends</button>
//         {response  && <button type="submit" className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' onClick={refreshPrompt}>Generate New Prompt</button>}
//         </div>
        
//       </form>
//       <div className='h-auto w-auto font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
//         {isLoading ? <Loader/> : <p>{response}</p>}
//       </div>
//       <div className='h-auto w-auto font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
//         {isLoading ? <Loader/> : <p>{tags}</p>}
//         </div>
    
//     </div>
//   );
// };
// export default SocialMediaManager;
import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { FeatureBox } from '../components';


const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "As an experienced Social Media Manager, you are tasked with responding to various scenarios that arise in the realm of social media management. Your responses should reflect your expertise in handling different situations with professionalism, creativity, and a focus on achieving the client's goals.In addition to it , You should also provide important trends ongoing with the market regarding topic"
}

function  SocialMediaManager() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your SocialManager! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }
 
  function FeatureBox({ children }) {
    return (
      <div className="bg-opacity-50 backdrop-blur-lg hover:bg-opacity-75 transform transition-transform hover:scale-105 p-4 rounded-lg border border-gray-300">
        <p className="text-center text-lg">{children}</p>
      </div>
    )
  }
 return(
  <>
   <div className="mt-10 bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-900">
          <h1 className="mt-10 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-white">
            The best offer on the market <br /><span className='text-blue-300'>for your business</span>
          </h1>

        </div>
     <div className="bg-gray-200 min-h-1/2 p-4 md:p-10 flex flex-col md:flex-row">
      {/* Key Features */}
      <div className="md:w-1/2 px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Key Features</h2>
        <div className="space-y-4">
          <FeatureBox>Gives you the best trendy advices</FeatureBox>
          <FeatureBox>Generates content in any language</FeatureBox>
          <FeatureBox>Reliable and trustworthy</FeatureBox>
          <FeatureBox>Experienced master class in social media management</FeatureBox>
        </div>
      </div>
      
      {/* Chat Box */}
      <div className="md:w-1/2 max-w-md w-full mt-6 md:mt-0 md:ml-6">
        <div className="bg-white shadow-md rounded-lg">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} style={{ marginTop: "2rem", borderRadius: "3px" }} />
              ))}
            </MessageList>
            <MessageInput className="p-4 border-t border-gray-300" placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
          </MainContainer>
        </div>
      </div>
    
    </div>
    
    

    </>
  )
}


export default SocialMediaManager;