const stepIndicator = document.querySelectorAll(".form-inner li")
const progress = document.querySelector(".progress")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const submitBtn = document.querySelector(".submit")



let currStep = 0

function updateProgress() {
    let width = currStep / (stepIndicator.length - 1)
    progress.style.transform = `scaleX(${width})`

    stepIndicator.forEach((indicator, index) => {
        indicator.classList.toggle("current", currStep === index)
        indicator.classList.toggle("done", currStep > index)
    })

    updateButton()
}

function updateButton() {
    prevBtn.hidden = currStep === 0
    nextBtn.hidden = currStep >= stepIndicator.length - 1
    submitBtn.hidden = !nextBtn.hidden
}

prevBtn.addEventListener("click", function (e) {
    e.preventDefault()

    if (currStep > 0) {
        currStep--
        updateProgress()
    }
})

nextBtn.addEventListener("click", function (e) {
    e.preventDefault()

    if (currStep < stepIndicator.length - 1) {
        currStep++
        updateProgress()
    }
})
updateProgress()