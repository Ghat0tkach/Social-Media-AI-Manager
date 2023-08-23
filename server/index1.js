import SocialPost from "social-post-api";
const social= new SocialPost('5MA83GH-6EZ45ME-PS1TKHG-Q8V2PZM');

const getPostData=()=>{
    return{
        post:"Posting this from my react-app",
        "mediaUrls": ["https://img.ayrshare.com/012/gb.jpg"],
        shorten_links:true,
        platforms:['twitter']
    };
};

const run=async()=>{
    const content =getPostData();
    const json = await social.post(content).catch(console.error);
    console.log(json);
};

  
run();
