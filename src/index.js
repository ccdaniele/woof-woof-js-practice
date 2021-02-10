function main(){
    fetchDogs()
    createEventListener()
    createContainer()
    createGoodBadEventListener()
};

function fetchDogs(){

    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog =>{
            const span = document.createElement('span')
            span.setAttribute('id',`${dog.id}`)
            span.innerText = dog.name

            const div = document.getElementById('dog-bar')
            div.append(span)
        })
    }) 

}

//if(click) div.style = 

function createContainer(){
    const div = document.querySelector('#dog-info')
    const img = document.createElement('img')
    img.setAttribute('id', 'dogImg')
    const h2 = document.createElement('h2')
    div.append(img, h2)
}

function createEventListener() {
    const div = document.querySelector('#dog-info')
    const dogDiv = document.getElementById('dog-bar')
    dogDiv.addEventListener('click', function(event){
       if (event.target.nodeName === 'SPAN'){

            fetch(`http://localhost:3000/pups/${event.target.id}`)
                .then(resp => resp.json())
                .then(dog => {
        
                    
                    const img = document.querySelector('#dogImg')
                    img.src = dog.image
                    const h2 = document.querySelector('h2')
                    h2.innerHTML = dog.name
                    
                    goodDog = dog.isGoodDog
                    
                    const goodDogBtn = document.querySelector('button')
                    goodDogBtn.setAttribute('id', `${dog.id}`)
                    goodDogBtn.innerText = goodDog? "Good dog!" : "Bad dog"
                    
                    div.append(img, h2, goodDogBtn)
                
                    });
        }            
    });
            
}

function createGoodBadEventListener(){

    const goodDogBtn = document.querySelector('button')

   
    goodDogBtn.addEventListener('click', function(event){
        let updatedDog
        if (event.target.innerText.includes("Good")){
            updatedDog = { isGoodDog: false }
        } else {
            updatedDog = { isGoodDog: true }
        }
        const newobj = {
            method: 'PATCH',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDog)
        }
        
        fetch (`http://localhost:3000/pups/${event.target.id}`, newobj)
            .then(resp => resp.json())
            .then(dog => {
                const button = document.querySelector('button')
                if (dog.isGoodDog){
                    button.innerText = "Good Dog!"
                } else {
                    button.innerText = "Bad Dog!"
                }


            })

    })
}



main()