import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
const API_KEY = import.meta.env.VITE_SECRET;




const systemMessage = { 
  "role": "system", "content": "As an experienced Social Media Manager, you are tasked with responding to various scenarios that arise in the realm of social media management. Your responses should reflect your expertise in handling different situations with professionalism, creativity, and a focus on achieving the client's goals.In addition to it , You should also provide important trends ongoing with the market regarding topic"
}

function  Chatbot() {
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


    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { 
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
              typingIndicator={isTyping ? <TypingIndicator content="SocialMediaMangerGPT is typing" /> : null}
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


export default Chatbot;