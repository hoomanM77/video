import {favoriteVideo,createVideoRow} from "./App.js";
import {ui} from "./Classes.js";
import {allVideos} from "./storage.js";

let allVideoInOne=[]
const saveAllUsers = allUsers => {
    allVideoInOne=[...allUsers]
}

ui.addToFavoriteBtn.addEventListener('click',e=>{
    ui.videoList.innerHTML=''
    createVideoRow(favoriteVideo)
    document.querySelectorAll('.video_row').forEach(tg=>{
        tg.style.border='1px solid #ffc107'
    })
})

ui.showAllBtn.addEventListener('click',e=>{
    ui.videoList.innerHTML=''
    createVideoRow(allVideos)
})

const getFavoriteData = allVideoInOne => {
    let favoriteId=JSON.parse(localStorage.getItem('faId'))
    if(favoriteId!==null){
        favoriteId.forEach(fd=>{
            allVideoInOne.forEach(av=>{
                if(av.id===fd){
                    favoriteVideo.push(av)
                }
            })
        })

    }
}


export {saveAllUsers,getFavoriteData}
