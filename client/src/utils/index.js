import  {supriseMePrompts}  from "../constants";
import FileSaver from 'file-saver'
export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*
    supriseMePrompts.length);
    const randomPrompt =supriseMePrompts[randomIndex];

   if(randomPrompt===prompt) return getRandomPrompt(prompt)



    return randomPrompt;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpeg`)
}