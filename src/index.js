document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('submit', handleSubmitButton)
    renderAllHogs()
})

function renderAllHogs() {
 fetch('http://localhost:3000/hogs')
 .then(resp => resp.json())
 .then(data => data.forEach(hog => renderHog(hog)))
}

function renderHog(hog) {
    const hogContainer = document.getElementById('hog-container')
    const hogCard = document.createElement('card')
    hogCard.setAttribute('class', 'hog-card')
    const name = document.createElement('div')
    name.textContent = hog.name
    const specialty = document.createElement('div')
    specialty.textContent = hog.specialty
    const checkbox = document.createElement('div')
    // originally had the element above as a class and not a div
    //went with div just to show if they were greased or ungreased
    checkbox.setAttribute('type', 'checkbox')
    // checkbox.addEventListener('click', handleCheckBox)
    checkbox.dataset.id = hog.id
    let greased = hog.greased
    let isGreased = (greased == true ? "greased" : "ungreased")
    const medal = document.createElement('div')
    medal.textContent = hog["highest medal achieved"]
    const weight = document.createElement('div')
    weight.textContent = hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
    const image = document.createElement('img')
    image.src = hog.image
    const deleteButton = document.createElement('button')
    deleteButton.dataset.id = hog.id
    deleteButton.setAttribute('class', 'delete')
    deleteButton.addEventListener('click', handleDeleteButton)
    deleteButton.textContent = "delete hog"   

    hogContainer.appendChild(hogCard)
    hogCard.appendChild(name)
    hogCard.appendChild(specialty)
    checkbox.append(isGreased)
    hogCard.appendChild(checkbox)
    hogCard.appendChild(medal)
    hogCard.appendChild(weight)
    hogCard.appendChild(deleteButton)
    hogCard.appendChild(image)
   
}

function handleDeleteButton(e){
    e.target.parentNode.remove()
    const id = e.target.dataset.id
   fetch(`http://localhost:3000/hogs/${id}`, {
       method: 'DELETE'
   })
   .then(resp => resp.json())
}

function handleSubmitButton(e){
    e.preventDefault()
    console.log(e.target.elements)
   let name = e.target.elements["name"].value
   let specialty = e.target.elements["specialty"].value
   let medal = e.target.elements["medal"].value
   let weight = e.target.elements["weight"].value
   let image = e.target.elements["img"].value
   let greased = e.target.elements["greased"].value

   fetch('http://localhost:3000/hogs', {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           name: name,
           specialty: specialty,
           medal: medal,
           weight: weight,
           image: image,
           greased: greased
       })
   })
   .then(resp => resp.json())
   .then(hog => renderHog(hog))
   e.target.reset();
}

function handleCheckBox(e){
    console.log(e.target)
    // const checkbox = d
    //tried to get the checkbox to work for greased or ungreased. 

}


