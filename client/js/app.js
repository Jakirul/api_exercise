

function getMessage(){
    fetch('http://localhost:3002')
        .then(r => r.json())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
   
    
    // msgText = msgText.replace(/^[a-z\d\-_\s]+$/i, '')
    
    // console.log("here")
    // let split = msgText.split('"')

    for (let name of msgText) {
        
        const msg = document.createElement('option');
        // name.replace(/\W/g, '');
        
        msg.textContent = name
     
        
        
        msg.style.color = 'red';
        let select = document.querySelector("select")
        select.append(msg);

    }
    
};

function btnClick() {
    const selector = document.querySelector("select").value
    
    // console.log(selector)
    fetch(`http://localhost:3002/${selector}`)
        .then(r => r.json())
        .then(profileMessage)
        .catch(console.warn)
}

function profileMessage(msgText) {

    // let selector = document.querySelector('section')
    let selector = document.createElement("section");
    selector.setAttribute("class", `${msgText['name']}`);
    
    console.log(selector)


    const arr = ['name', 'age', 'email']
    for (let i = 0; i < arr.length; i++) {
        
        const msg = document.createElement('h1');
        // name.replace(/\W/g, '');
        msg.textContent = `${arr[i]}: ${msgText[arr[i]]}`
        msg.style.color = 'red';
        document.querySelector("div").appendChild(selector)
        selector.append(msg)

    }

    
}


// create
function submitProfile(e){
    e.preventDefault();
    

    const profileData = {
        name: e.target.name.value,
        age: e.target.age.value,
        email: e.target.email.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(profileData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(`http://localhost:3002/`, options)
        .then(r => r.json())
        .then(appendCat)
        .catch(console.warn)
};


function appendCats(){
    document.body.style.backgroundColor = 'red'
};

function appendCat(catData){
    const newLi = document.createElement('li');
    newLi.textContent = `Successfully added: ${catData.name} to the database. Please refresh the page`
    const catsList = document.querySelector('ul');
    catsList.append(newLi);
};





const btn = document.querySelector('.first-btn');
const form = document.querySelector('form')
getMessage()

// Bind event listeners
btn.addEventListener('click', btnClick);
form.addEventListener('submit', submitProfile);