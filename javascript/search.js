import {ui} from "./Classes.js";
import {createVideoRow} from "./App.js";

let allVideoArray=[]
const storeAllUsers = allUsers => {
    allVideoArray=[...allUsers]
}
ui.videoSearch.addEventListener('keyup',e=>{
    let targetsVideo=allVideoArray.filter(video=>{
        return video.title.includes(e.target.value)
    })
    ui.datalistTag.innerHTML=''
    let allInOne=targetsVideo.map(tg=>{
        return `<option value="${tg.title}">`
    }).join('')

    ui.datalistTag.insertAdjacentHTML('beforeend',allInOne)

})
ui.searchBtn.addEventListener('click',()=>{
    let value=ui.videoSearch.value
    let targetsVideo=allVideoArray.filter(video=>{
        return video.title.includes(value)
    })
    ui.videoList.innerHTML=''
    createVideoRow(targetsVideo)

    console.log(targetsVideo)

})
window.addEventListener('load',()=>{
    ui.videoSearch.value=''
    ui.datalistTag.innerHTML=''
    let allInOne=allVideoArray.map(tg=>{
        return `<option value="${tg.title}">`
    }).join('')

    ui.datalistTag.insertAdjacentHTML('beforeend',allInOne)
})
export {storeAllUsers}