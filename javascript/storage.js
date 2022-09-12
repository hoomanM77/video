import {createVideoRow} from "./App.js";
import {storeAllUsers} from "./search.js";
import {saveAllUsers,getFavoriteData} from "./favorite and allVideos.js";

let allVideos=[]
class Storage {
    constructor() {
        this.database=null
        this.databaseInfo=null
        this.transaction=null
        this.videoDatabse=null
        this.req=null
    }
    createTx(mode){
        this.transaction=this.databaseInfo.transaction('video',mode)

        this.transaction.addEventListener('error',e=>{
            console.log('transaction error',e)
        })
        this.transaction.addEventListener('complete',e=>{
            console.log('transaction complete',e)
        })
        return this.transaction

    }


    storeData(newVideo){
        this.videoDatabse=this.createTx("readwrite").objectStore('video')

        this.req=this.videoDatabse.add(newVideo)

        this.req.addEventListener('error',e=>{
            console.log('req error',e)
        })

        this.req.addEventListener('success',e=>{
            console.log('req success',e)
        })
    }

    restoreData(){
        this.videoDatabse=this.createTx("readonly").objectStore('video')

        this.req=this.videoDatabse.getAll()

        this.req.addEventListener('error',e=>{
            console.log('req error',e)
        })

        this.req.addEventListener('success',e=>{
            createVideoRow(e.target.result)
            storeAllUsers(e.target.result)
            saveAllUsers(e.target.result)
            getFavoriteData(e.target.result)
            allVideos=e.target.result
            console.log('req success',e)
        })
    }
    deleteData(videoId){
        this.videoDatabse=this.createTx("readwrite").objectStore('video')

        this.req=this.videoDatabse.delete(videoId)

        this.req.addEventListener('error',e=>{
            console.log('req error',e)
        })

        this.req.addEventListener('success',e=>{
            console.log('req success',e)
        })
    }
    updateData(newData,id){
        this.videoDatabse=this.createTx("readwrite").objectStore('video')

        this.req=this.videoDatabse.get(id)

        this.req.addEventListener('error',e=>{
            console.log('update data error',e)
        })

        this.req.addEventListener('success',e=>{
            let updatingData=this.videoDatabse.put(newData)
            console.log(updatingData.transaction)
            console.log('update data success',e)
        })

    }

}




let storage=new Storage()

window.addEventListener('load',()=>{
    storage.database=indexedDB.open('video info',9)

    storage.database.addEventListener('error',e=>{
        console.log('create db error',e)
    })

    storage.database.addEventListener('success',e=>{
        storage.databaseInfo=e.target.result
        storage.restoreData()
        console.log('create db success',e)
    })


    storage.database.addEventListener('upgradeneeded',e=>{
        storage.databaseInfo=e.target.result

        if (!storage.databaseInfo.objectStoreNames.contains('video')){
            storage.databaseInfo.createObjectStore('video',{
                keyPath:'id'
            })
        }
        // if (storage.databaseInfo.objectStoreNames.contains('video')){
        //     storage.databaseInfo.deleteObjectStore('video')
        // }

        console.log('upgrade db',e)
    })
})

export {storage,allVideos}