import { BrowserRouter,Route,Routes } from "react-router-dom"
import {logo} from './assets';
import { CreatePost, ImgCaption, SchedulePost, MainProduct, Dashboard} from './pages';
import SocialMediaManager from "./pages/Api";
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
         <Route path="/analyse-img" element={<ImgCaption/>}/>
         <Route path="/" element={<FeatureSection/>}/>
         <Route path="/chat-bot" element={<SocialMediaManager/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/schedule-post" element={<SchedulePost/>}/>
        <Route path="/main-post" element={<MainProduct/>}/>
      </Routes>
    </main>
   
   <Footer/>
   </BrowserRouter>
    </DallEProvider>
   
  
  )
}

export default App