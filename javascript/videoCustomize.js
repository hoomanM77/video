import {ui} from "./Classes.js";
let timer1,timer2,interval1,interval2

ui.playIconTop.addEventListener('click',e=>{
    if(e.target.classList.contains('bi-play-circle-fill')){
        ui.videoTag.play()
        interval1=setInterval(()=>{
            currentTimeHandler(Math.floor(ui.videoTag.currentTime))
            moveVideoProgress(ui.videoTag.currentTime)
        },1000)

        timer1=setTimeout(()=>{
            e.target.parentElement.classList.add('hover-active')
        },1000)
        e.target.classList.replace('bi-play-circle-fill','bi-pause-circle-fill')
        ui.playIconBottom.classList.replace('bi-play-fill','bi-pause-fill')
    }else{
        ui.videoTag.pause()
        clearTimeout(timer1)
        clearInterval(interval1)
        e.target.parentElement.classList.remove('hover-active')
        e.target.classList.replace('bi-pause-circle-fill','bi-play-circle-fill')
        ui.playIconBottom.classList.replace('bi-pause-fill','bi-play-fill')
    }
})
ui.playIconBottom.addEventListener('click',e=>{
    if(e.target.classList.contains('bi-play-fill')){
        ui.videoTag.play()
        interval2=setInterval(()=>{
            currentTimeHandler(Math.floor(ui.videoTag.currentTime))
            moveVideoProgress(ui.videoTag.currentTime)
        },1000)
         timer2=setTimeout(()=>{
            e.target.parentElement.parentElement.parentElement.classList.add('hover-active')
        },1000)
        e.target.classList.replace('bi-play-fill','bi-pause-fill')
        ui.playIconTop.classList.replace('bi-play-circle-fill','bi-pause-circle-fill')
    }else{
        ui.videoTag.pause()
        clearInterval(interval2)
        clearTimeout(timer2)
        e.target.parentElement.parentElement.parentElement.classList.remove('hover-active')
        e.target.classList.replace('bi-pause-fill','bi-play-fill')
        ui.playIconTop.classList.replace('bi-pause-circle-fill','bi-play-circle-fill')
    }
})
const iconToDefault = () => {
    ui.playIconTop.className='bi bi-play-circle-fill position-absolute play_icon_top'
    ui.playIconBottom.className='bi bi-play-fill fs-3 mx-2 play_icon_bottom'
    document.querySelector('.video').className='video position-relative'
}
ui.volumeTag.addEventListener('click',e=>{
    if(e.target.nextElementSibling.style.display==='none'){
        e.target.nextElementSibling.style.display='flex'
    }else{
        e.target.nextElementSibling.style.display='none'
    }
})
const videoHandler = (duration) => {
    let min=Math.floor(duration/60)
    let sec=Math.floor(duration%60)
    if(duration<60 && duration>9){
        ui.videoDuration.innerHTML=`00:${Math.floor(duration)}`
    }else if(duration<10){
        ui.videoDuration.innerHTML=`00:0${Math.floor(duration)}`

    } else if(sec<10){
        ui.videoDuration.innerHTML=`${min}:0${sec}`
    }else if(sec>9){
        ui.videoDuration.innerHTML=`${min}:${sec}`
    }

}
const currentTimeHandler = ct => {
    let min=Math.floor(ct/60)
    let sec=Math.floor(ct%60)

    if(ct<60 && ct>9){
        ui.currentTime.innerHTML=`00:${ct}`
    }else if(ct<10){
        ui.currentTime.innerHTML=`00:0${ct}`
    }else if(min<10 && sec <10) {
        ui.currentTime.innerHTML=`0${min}:0${sec}`
    }else if(min>9 && sec <10){
        ui.currentTime.innerHTML=`${min}:0${sec}`
    }else if(min<10 && sec>9){
        ui.currentTime.innerHTML=`0${min}:${sec}`
    }else if(min>9 && sec >9){
        ui.currentTime.innerHTML=`${min}:${sec}`
    }
}
ui.videoTag.addEventListener('ended',e=>{
    iconToDefault()

},false)
const moveVideoProgress =currentTime => {
    let duration=Number(localStorage.getItem('duration'))
    let progressPercent=Math.floor((currentTime/duration)*100)
    ui.progresFill.style.width=`${progressPercent}%`
    if(progressPercent===100){
        clearInterval(interval1)
        clearInterval(interval2)
    }

}
ui.videoProgress.addEventListener('click',e=>{
    let progressWidth=e.target.clientWidth
    let whereIsClicked=e.offsetX

    let duration=Number(localStorage.getItem('duration'))

    let targetTime=Math.floor((whereIsClicked/progressWidth)*duration)

    ui.progresFill.style.width=`${whereIsClicked}px`

    ui.videoTag.currentTime=targetTime

})
ui.fasterIcon.addEventListener('click',e=>{
    let currenTime=ui.videoTag.currentTime
    ui.videoTag.currentTime=currenTime + 10
})
ui.slowerIcon.addEventListener('click',e=>{
    let currenTime=ui.videoTag.currentTime
    ui.videoTag.currentTime=currenTime - 10
})
ui.changeVolumeInput.addEventListener('input',e=>{
    ui.videoTag.volume=(Number(e.target.value))/100
    if(e.target.value==='0'){
        ui.volumeTag.classList.replace('bi-volume-up-fill','bi-volume-mute-fill')
    }else{
        ui.volumeTag.classList.replace('bi-volume-mute-fill','bi-volume-up-fill')
    }
})
ui.changeVolumeInput.addEventListener('change',e=>{
    e.target.parentElement.style.display='none'
})



export {iconToDefault,videoHandler}
