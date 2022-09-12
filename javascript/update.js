import  {ui} from "./Classes.js";
import {targetEdit,getImageUrl,getVideoUrl,targetBtn,clearInputs} from "./App.js";
import {storage} from "./storage.js";

const editModal = new bootstrap.Modal('#editModal')

ui.editBtn.addEventListener('click',async e=>{
    ui.validation(ui.editTitle,ui.editTitleMessage,ui.editDescription,ui.editDescMessage,ui.editCategory,ui.editSelectMessage,ui.editThumbnail,ui.editImageMessage,ui.editVideo,ui.editVideoMessage)


    if(ui.editThumbnail.files[0] && ui.editVideo.files[0] && isNaN(ui.editTitle.value) && ui.editCategory.value!=='default' && isNaN(ui.editDescription.value)){

        let imageUrl = await getImageUrl(ui.editThumbnail)
        let videoUrl = await getVideoUrl(ui.editVideo)
        targetBtn.parentElement.previousElementSibling.children[0].children[0].innerHTML=ui.editTitle.value
        targetBtn.parentElement.previousElementSibling.children[0].children[1].innerHTML=ui.editCategory.value
        targetBtn.parentElement.previousElementSibling.children[1].innerHTML=ui.editDescription.value
        targetBtn.parentElement.parentElement.parentElement.children[0].setAttribute('src',`${imageUrl}`)
        targetEdit[0].title=ui.editTitle.value
        targetEdit[0].description=ui.editDescription.value
        targetEdit[0].category=ui.editCategory.value
        targetEdit[0].imageUrl=imageUrl
        targetEdit[0].videoUrl=videoUrl
        storage.updateData(targetEdit[0],Number(targetEdit[0].id))
        editModal.hide()
        clearInputs(ui.editVideo,ui.editThumbnail,ui.editTitle,ui.editDescription,ui.editCategory)
    }

})

window.addEventListener('load',e=>{
    clearInputs(ui.editVideo,ui.editThumbnail,ui.editTitle,ui.editDescription,ui.editCategory)
})