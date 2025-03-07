const form = document.querySelector(".form")
const inputs = form.querySelectorAll("input, textarea")
const stepIndicator = form.querySelectorAll(".form-inner li")
const progress = form.querySelector(".progress")
const prevBtn = form.querySelector(".prev")
const nextBtn = form.querySelector(".next")
const submitBtn = form.querySelector(".submit")
const steps = form.querySelectorAll(".step")
const stepsContainer = form.querySelector(".step-container")


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

inputs.forEach(input => {
    input.addEventListener("focus", function (e) {
        if(!validStep()) return;
        const focusedInput = e.target
        const focusedStep = [...steps].findIndex(step => {
            return step.contains(focusedInput)
        })
        
        if (focusedStep !== -1 && focusedStep !== currStep) {
            currStep = focusedStep
            updateProgress()
        }
        
        stepsContainer.scrollTop = 0
        stepsContainer.scrollLeft = 0

    })
})

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

form.addEventListener("submit", (e)=> {
    e.preventDefault()

    if (!form.checkValidity()) return

    const formData = new FormData(form)
    console.log(Object.fromEntries(formData))

    submitBtn.disabled = true
    submitBtn.textContent = "Submitting..."
    
    setTimeout(() => {
        form.querySelector(".completed").hidden = false
    }, 3000);
    
})