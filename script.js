const stepIndicator = document.querySelectorAll(".form-inner li")
const progress = document.querySelector(".progress")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const submitBtn = document.querySelector(".submit")
const steps = document.querySelectorAll(".step")
const stepsContainer = document.querySelector(".step-container")




let currStep = 0

function updateProgress() {
    let width = currStep / (stepIndicator.length - 1)
    progress.style.transform = `scaleX(${width})`

    stepsContainer.style.height = steps[currStep].offsetHeight + "px"

    stepIndicator.forEach((indicator, index) => {
        indicator.classList.toggle("current", currStep === index)
        indicator.classList.toggle("done", currStep > index)
    })

    steps.forEach((step, index) => {
        step.style.transform = `translateX(-${currStep * 100}%)`
        step.classList.toggle("current", currStep === index)
    })

    updateButton()
}

function updateButton() {
    prevBtn.hidden = currStep === 0
    nextBtn.hidden = currStep >= stepIndicator.length - 1
    submitBtn.hidden = !nextBtn.hidden
}

const validStep = ()=> {
    const fields = steps[currStep].querySelectorAll("input, textarea")
    return [...fields].every((field) => field.reportValidity())
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

    if(!validStep()) return;

    if (currStep < stepIndicator.length - 1) {
        currStep++
        updateProgress()
    }
})
updateProgress()