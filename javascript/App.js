import {ui, Video} from "./Classes.js";
import {allVideos, storage} from "./storage.js";
import {iconToDefault, videoHandler} from "./videoCustomize.js";
import {storeAllUsers} from "./search.js";
import {saveAllUsers} from "./favorite and allVideos.js";
////////////////////Variables//////////////////////////////////////
const $=document
const uploadButton=_q('.upload_btn')
let videoUrl,imageUrl;
let profileImage=['images/boy.svg','images/man-1.svg','images/man-2.svg','images/man-3.svg']
let favoriteVideo=[]
let favoriteVideoId=[]
const modal = new bootstrap.Modal('#exampleModal')
let targetEdit,targetBtn
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
/////////////////////////////// set details on videos
const setVideoSenderDetail = (vUrl,pUrl,title,category,view,like,desc) => {
    ui.videoTag.setAttribute('src',vUrl)
    ui.videoTag.setAttribute('poster',pUrl)
    ui.videoNumber.innerHTML=`${title}(${category})`
    ui.videoView.innerHTML=`${view} views`
    ui.videoLike.innerHTML=`${like}k like`
    ui.videoDescription.innerHTML=desc
    ui.profileImage.setAttribute('src',profileImage[Math.floor(Math.random()*4)])
}

/////////////////// play video handler /////////////////
ui.videoList.addEventListener('click', e=>  {
    if(e.target.classList.contains('btn-outline-dark')){
        ui.progresFill.style.width=`0`
        ui.videoTag.addEventListener('canplay',e=>{
            videoHandler(e.target.duration)
            localStorage.setItem('duration',e.target.duration)
        })
        iconToDefault()
        let videoId=Number(e.target.dataset.video)
        let targetVideo=allVideos.filter(video=>{
            return video.id===videoId
        })
        setVideoSenderDetail(targetVideo[0].videoUrl,targetVideo[0].imageUrl,targetVideo[0].title,targetVideo[0].category,targetVideo[0].view,targetVideo[0].like,targetVideo[0].description)

        if(matchMedia('(max-width:1200px)').matches){
            window.scrollTo(0,0)
        }
    }
    if(e.target.classList.contains('btn-outline-danger')){
        e.target.parentElement.parentElement.parentElement.remove()
        setVideoSenderDetail('','','Video Number 1','','20,356','6','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab est eveniet excepturi hic id pariatur porro quas quia quis totam? Architecto aut corporis esse, et fuga fugit porro quam? Iure.')
        storage.deleteData(Number(e.target.previousElementSibling.dataset.video))
    }
    if(e.target.classList.contains('btn-outline-warning')){
        e.target.parentElement.parentElement.parentElement.style.border='1px solid #ffc107'
        let targetId=Number(e.target.dataset.videoid)
        let targetVideos=allVideos.filter(av=>{
            return av.id===targetId
        })
        favoriteVideo.push(targetVideos[0])
        favoriteVideoId.push(targetId)
        localStorage.setItem('faId',JSON.stringify(favoriteVideoId))



    }
    if(e.target.classList.contains('btn-outline-primary')){
        targetBtn=e.target
        let editId=Number(e.target.dataset.editid)
        targetEdit=allVideos.filter(av=>{
            return av.id===editId
        })
        ui.editTitle.value=targetEdit[0].title
        ui.editDescription.value=targetEdit[0].description
        ui.editCategory.value=targetEdit[0].category




    }
})
//////////////////////// get information and store in object
function getImageUrl(image) {
    return new Promise((resolve, reject)=>{
        let ImageReader=new FileReader()
        ImageReader.readAsDataURL(image.files[0])
        ImageReader.addEventListener('load', e=>{
            imageUrl=e.target.result
            resolve(imageUrl)
        })
    })
}
function getVideoUrl(video) {
    return new Promise((resolve, reject)=>{
        let videoReader=new FileReader()
        videoReader.readAsDataURL(video.files[0])
        videoReader.addEventListener('load',  e=>{
            videoUrl=e.target.result
            resolve(videoUrl)
        })
    })
}
function setVideoProperty(imageUrl,videoUrl) {
    return new Promise((resolve, reject)=>{
        let video=new Video(ui.title.value,ui.description.value,ui.category.value,imageUrl,videoUrl)
        resolve(video)
    })
}
async function getInfo() {
    ui.validation(ui.title,ui.titleMessage,ui.description,ui.descMessage,ui.category,ui.selectMessage,ui.thumbnail,ui.imageMessage,ui.video,ui.videoMessage)

    if(ui.thumbnail.files[0] && ui.video.files[0] && isNaN(ui.title.value) && ui.category.value!=='default' && isNaN(ui.description.value)){
        let imageUrl = await getImageUrl(ui.thumbnail)
        let videoUrl = await getVideoUrl(ui.video)
        let videoObj = await setVideoProperty(imageUrl, videoUrl)

        createVideoRow([videoObj])
        allVideos.push(videoObj)
        storeAllUsers(allVideos)
        saveAllUsers(allVideos)
        storage.storeData(videoObj)
        modal.hide()
        clearInputs(ui.video,ui.thumbnail,ui.title,ui.description,ui.category)

    }
}


////////////////////// generate video list
const createVideoRow = video => {
    let allInOne=video.map(item=>{
        return `<div  class="video_row d-flex rounded-3 overflow-hidden position-relative mb-2"><img src="${item.imageUrl}" alt="" class="img-fluid"><i class="bi bi-play-circle position-absolute"></i><div class="d-flex flex-column w-100 p-2 justify-content-between"><div><h5 class="lh-base m-0 fw-bold"><span>${item.title}</span></span><span class="badge bg-danger ms-2">${item.category}</span></h5><p class="lh-base">${item.description}</p></div><div class="btn_container"><button class="btn btn-outline-warning btn-sm" data-videoId="${item.id}" data-bs-toggle="modal" data-bs-target="#favoriteModel">favorite</button><button  data-video="${item.id}" class="btn btn-sm btn-outline-dark">Play</button><button class="btn btn-sm btn-outline-danger">Remove</button><button data-editId="${item.id}" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></div></div></div>`
    }).join('')
   ui.videoList.insertAdjacentHTML('beforeend',allInOne)
}
/////////////////// clear input
const clearInputs = (video,thumbnail,title,description,category) => {
    video.value=''
    thumbnail.value=''
    title.value=''
    description.value=''
    category.value='default'
}

uploadButton.addEventListener('click',getInfo)
window.addEventListener('load',()=>{
    clearInputs(ui.video,ui.thumbnail,ui.title,ui.description,ui.category)
    favoriteVideoId=JSON.parse(localStorage.getItem('faId'))
})













export {createVideoRow,favoriteVideo,targetEdit,getImageUrl,getVideoUrl,targetBtn,clearInputs}