import { BrowserRouter,Route,Routes } from "react-router-dom"
import {  ImgCaption, SchedulePost,  Dashboard, Chatbot, GenerateImg, SocialMediaManagerGPT} from './pages';
import FeatureSection from "./pages/homePage";
import { Footer, Header } from "./components";
import { DallEProvider } from "./context/DallEContext";
const App = () => {
  return (
    <DallEProvider>
      <BrowserRouter>
   <Header/>
    <main className="smLp-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px]">
      <Routes>
         <Route path="/" element={<FeatureSection/>}/>
         <Route path="/collections" element={<Dashboard/>}/>
         <Route path="/CaptionGPT" element={<ImgCaption/>}/>
         <Route path="/Chatbot" element={<Chatbot/>}/>
        <Route path="/generateImage" element={<GenerateImg/>}/>
        <Route path="/schedulePost" element={<SchedulePost/>}/>
        <Route path="/SocialMediaManagerGPT" element={<SocialMediaManagerGPT/>}/>
      </Routes>
    </main>
   
   <Footer/>
   </BrowserRouter>
    </DallEProvider>
   
  
  )
}

export default App