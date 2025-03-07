let timer
let delteFirstPhotoDelay

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreedList(data.message)
    } catch (e) {
        console.log("There was a problem fetching the breed list. :( ")
    }
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a Dog Breed</option>
            ${Object.keys(breedList).map(function (breed) {
                return `<option>${breed}</option>`
            }).join('')}
        </select>
    `
}

async function loadByBreed(breed) {
    if (breed != "Chose a Dog Breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(images) {
    let currentPos = 0
    clearInterval(timer)
    clearTimeout(delteFirstPhotoDelay)

    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPos += 2
        if (images.length == 2)currentPos=0
        timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
    }

    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPos]}')"></div>`)
        delteFirstPhotoDelay = setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPos + 1 >= images.length) {
            currentPos = 0
        } else {
            currentPos++
        }
    }
}

