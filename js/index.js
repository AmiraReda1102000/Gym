//check if there's local storage color option
let mainColors = localStorage.getItem("color_option")
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors)
    document.querySelectorAll(".colors-list li").forEach(element => {
        //remove active class from all colors list item
        element.classList.remove("active")
        //add active class on element with data-color === local storage item
        if (element.dataset.color === mainColors) {
            //add active class
            element.classList.add("active")
        }
    })
}




//random background option
let backgroundOption = true
//variable to control the background interval
let backgroundInterval
// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option")
//check if random background local storge is not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    //remove active class from all span 
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active")
    })
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-background .yes").classList.add("active")
    } else {
        document.querySelector(".random-background .no").classList.add("active")
    }
}



// click on toggle settings gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    //Toggle Class Fa-spin For Rotation on Self
    this.classList.toggle("fa-spin")
    //Toggle Class Open On Main Settings Box
    document.querySelector(".setting-box").classList.toggle("open")
}



//Swich Colors
const colorLi = document.querySelectorAll(".colors-list li") 
//loop on all list item
colorLi.forEach(li => {
    //click on every list item
    li.addEventListener("click", (e) => {
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        //set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color)
        handleActive(e)
    })
})


//Swich random background option
const randomBackEl = document.querySelectorAll(".random-background span") 
//loop on all spans
randomBackEl.forEach(span => {
    //click on every list item
    span.addEventListener("click", (e) => {
        handleActive(e)
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true
            randomizeImgs()
            localStorage.setItem("background-option", true)
        } else {
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background-option", false)
        }
    })
})



// Select Landing Page Element
let landingPage = document.querySelector(".landing-page") 
//Get Array Of Imgs
let imgsArray = ["land-2.jpg", "land-3.jpg", "land-4.jpg"]
//function to randomize image 
function randomizeImgs() {
    if (backgroundOption === true) {
            backgroundInterval= setInterval(() => {
            //Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
            //Change Background Image Url
            landingPage.style.background ='url("imgs/' + imgsArray[randomNumber] + '")'
            }, 3000)
    }
        
}
randomizeImgs()

//Select Skills Selector
let ourSkills = document.querySelector(".skills")
window.onscroll = function () {
    // Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop
    //skills outer height 
    let skillsOuterHeight = ourSkills.offsetHeight
    // window height
    let windowHeight = this.innerHeight
    // window scrollTop 
    let windowScrollTop = this.pageYOffset 
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span")
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
        // console.log("ssss")
    }
}

//create popup with the image 
let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener('click',(e) => {//create overlay element
        let overlay = document.createElement("div")
        //add class to overlay
        overlay.className = 'popup-overlay'
        //append overlay to the body
        document.body.appendChild(overlay)
        //create the popup box
        let popupBox = document.createElement("div")
        //add class to the popup box
        popupBox.className = 'popup-box'
        if (img.alt !== null) {
             // create heading 
        let imgHeading = document.createElement("h3")
        //create text for image
        let imgText = document.createTextNode(img.alt)
        //append text to heading
        imgHeading.appendChild(imgText)
        //append heading to popup box
        popupBox.appendChild(imgHeading)
        }
        //create the image 
        let popupImage = document.createElement("img")
        //set image source 
        popupImage.src = img.src
       //add image to popup box
        popupBox.appendChild(popupImage)
        //append the popup box to body
        document.body.appendChild(popupBox)
        //create the close button span
        let closeButton = document.createElement("span")
        //create the close button text
        let closeButtonText = document.createTextNode("X")
        //append text to close button
        closeButton.appendChild(closeButtonText)
        //add class to close button
        closeButton.className = 'close-button'
        //add close button to th popup box
        popupBox.appendChild(closeButton)
    })

})

//close popup 
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        //remove the current popup
        e.target.parentNode.remove()
        document.querySelector(".popup-overlay").remove()
    }
})

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")


const alllinks = document.querySelectorAll(".links a")


function scrollToSomewhere(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollToSomewhere(allBullets)
scrollToSomewhere(alllinks)


function handleActive(ev) {
      //remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })

    //add active class on self
    ev.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets_option")
if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = 'none'
    }   document.querySelector(".bullets-option .no").classList.add("active")

}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullets_option", 'block')
        } else {
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option", 'none')
        }
        handleActive(e)

    })

})

document.querySelector(".reset-options").onclick = function () {
    //هعمل دي لو مفيش غير دول لاكن لو في حاجات تانيه مينفعش هعمل التانيين
    // localStorage.clear()
    localStorage.removeItem("color_option")
    localStorage.removeItem("background-option")
    localStorage.removeItem("bullets_option")
    
    // reload window
    window.location.reload()

}
//toggle menu
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")
toggleBtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation()
    // toggle class "menu-active" on button
    this.classList.toggle("menu-active")
    // toggle class "open" on links
    tLinks.classList.toggle("open")
}
//click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        // check if menu is open
        if (tLinks.classList.contains("open")) {
            //toggle class "menu-active" on button
            toggleBtn.classList.toggle("menu-active")
            //toggle class "open" on links
            tLinks.classList.toggle("open")
        }
    }
})

// stop propagation on menu 
tLinks.onclick = function (e) {
    e.stopPropagation()
}