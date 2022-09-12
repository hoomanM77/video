const changeThemeOption=document.querySelectorAll('.change_theme_option')
////////////////////////////// change theme handler /////////////
changeThemeOption.forEach(opt=>{
    opt.addEventListener('click',e=>{
        e.target.parentElement.parentElement.previousElementSibling.innerHTML=e.target.innerHTML
        changeThemeHandler(e.target.innerHTML)
        localStorage.setItem('videoTheme',e.target.innerHTML)
    })
})
window.addEventListener('load',()=>{
    let themeStatus=localStorage.getItem('videoTheme')
    document.querySelector('.dropdown-toggle').innerHTML=themeStatus
    themeStatus && changeThemeHandler(themeStatus)
})
const changeThemeHandler = (theme) => {
    switch (theme) {
        case 'Dark':{
            document.body.className=''
        }
            break
        case  'Light':{
            document.body.className='light'
        }
            break
        case 'Browser default':{
            if(matchMedia('(prefers-color-scheme: dark)').matches){
                document.body.className=''
            }else{
                document.body.className='light'
            }
        }
            break
    }

}
