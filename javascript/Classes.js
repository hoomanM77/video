class Video {
    constructor(title,description,category,imageUrl,videoUrl) {
        this.id=Math.floor(Math.random()*9999)
        this.view=Math.floor(Math.random()*100_000)
        this.like=Math.floor(Math.random()*100)
        this.title=title
        this.description=description
        this.category=category
        this.imageUrl=imageUrl
        this.videoUrl=videoUrl
    }
}
class UI {
    constructor() {
        this.title=document.getElementById('title')
        this.description=document.getElementById('description')
        this.category=document.getElementById('category')
        this.thumbnail=document.getElementById('thumbnail')
        this.video=document.getElementById('video')
        this.imageMessage=document.querySelector('.image_message')
        this.videoMessage=document.querySelector('.video_message')
        this.titleMessage=document.querySelector('.title_message')
        this.descMessage=document.querySelector('.desc_message')
        this.selectMessage=document.querySelector('.select_message')
        this.videoList=document.getElementById('video_list')
        this.videoTag=document.getElementById('videoPlayer')
        this.videoNumber=document.querySelector('.video_number')
        this.videoView=document.querySelector('.video_view')
        this.videoLike=document.querySelector('.video_like')
        this.videoDescription=document.querySelector('.video_description')
        this.profileImage=document.querySelector('.profile_image')
        this.playIconTop=document.querySelector('.bi-play-circle-fill')
        this.playIconBottom=document.querySelector('.play_icon_bottom')
        this.volumeTag=document.querySelector('.volumeIcon')
        this.videoDuration=document.querySelector('.whole_time')
        this.currentTime=document.querySelector('.current_time')
        this.progresFill=document.querySelector('.progress_fill')
        this.videoProgress=document.querySelector('.video_progress')
        this.fasterIcon=document.querySelector('.bi-fast-forward-fill')
        this.slowerIcon=document.querySelector('.bi-rewind-fill')
        this.changeVolumeInput=document.getElementById('changeVolumeInput')
        this.circleIcon=document.querySelector('.bi-circle-fill')
        this.videoSearch=document.getElementById('video_search')
        this.datalistTag=document.getElementById('browsers')
        this.searchBtn=document.querySelector('.search_btn')
        this.addToFavoriteBtn=document.querySelector('.add_to_favorite')
        this.showAllBtn=document.querySelector('.show_all')

        this.editBtn=document.querySelector('.edit_btn')
        this.editTitle=document.getElementById('edit_title')
        this.editDescription=document.getElementById('edit_description')
        this.editCategory=document.getElementById('edit_category')
        this.editThumbnail=document.getElementById('edit_thumbnail')
        this.editVideo=document.getElementById('edit_video')
        this.editTitleMessage=document.querySelector('.edit_title_message')
        this.editDescMessage=document.querySelector('.edit_desc_message')
        this.editSelectMessage=document.querySelector('.edit_select_message')
        this.editImageMessage=document.querySelector('.edit_image_message')
        this.editVideoMessage=document.querySelector('.edit_video_message')
    }
    validation(title,titleMessage,description,descMessage,category,selectMessage,thumbnail,imageMessage,video,videoMessage){
        if(!isNaN(title.value)){
            titleMessage.style.display='inline-flex'
        }else{
           titleMessage.style.display='none'
        }
        if(!isNaN(description.value)){
            descMessage.style.display='inline-flex'
        }else{
            descMessage.style.display='none'
        }
        if(category.value==='default'){
            selectMessage.style.display='inline-flex'
        }else{
            selectMessage.style.display='none'
        }
        if(!thumbnail.files[0]){
            imageMessage.style.display='inline-flex'

        }else{
            imageMessage.style.display='none'

        }
        if(!video.files[0]){

            videoMessage.style.display='inline-flex'
        }else{
            videoMessage.style.display='none'
        }
    }
}

let ui=new UI()

export {Video,ui}