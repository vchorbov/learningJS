function solve() {
    let btn = document.querySelector("#container button");
    let ul = document.querySelector("#adoption ul");
    let adopted = document.querySelector("#adopted");
    // event listener on the first button
    btn.addEventListener("click", e => {
        // prevents the page from refreshing after every click on the button in the form (default behaviour)
        e.preventDefault();
        //collects all the input-fields in an array with the rest operator
        let [name, age, kind, owner] = [...document.querySelectorAll("#container input")];
        //take the actual values of the properties
        name = name.value;
        age = age.value;
        kind = kind.value;
        owner = owner.value;

        /* logic behind the validation
        *  all fields need to be filled
        *  the age must be of type 'number'
        */
        if (name && age && kind && owner) {
            if (Number(age)) {
                ul.innerHTML += `<li>
        <p>
           <strong>${name}</strong>
           "is a"
           <strong>${age}</strong>
           "year old"
           <strong>${kind}</strong>
       </p>
       <span>Owner: ${owner}</span>
       <button>Contact with owner</button>
       </li>`;

         clear();

        // event listener on all the 'contact owner button
        let ownerBtn = [...document.querySelectorAll("#adoption ul button")]
        ownerBtn.forEach(b => b.addEventListener("click", contactOwner));

   
            } else {
                alert("The age must be a valid number!")
            }
        } else {
            alert("All fields must be filled!")
            clear();

        }
        // clears the values of the form-fields to make the process more user-fiendly
        function clear() {
            let inputs = [...document.querySelectorAll("#container input")];
            inputs.forEach(i => {
                i.value = "";
            })
        }
        // the logic behind the contactOwner-function inside the eventListener
        function contactOwner(e){

            let btn = e.target;
            // we want to get the <p> Node and attach the <div> to it
            let parent = btn.parentElement.firstChild.nextSibling;
            btn.remove();
            /*
             * e.currentTarget.innerHTML = "Yes, I take it!"
             * let div = document.createAttribute('div');
             *
             * This is how we can just change the text inside the btn
             * 
             */
           
            parent.innerHTML += `<div>
                            <input placeholder = "Enter your names">
                            <button>Yes, I take it!</button>
                            </div>`;
            
            
        // event listener on the new  "Yes, I like it btn!"
        let iTakeItBtn  = document.querySelector("#adoption ul div button");
        iTakeItBtn.addEventListener("click", changeOwnerAndMoveToNewHome);
            
        } 
        /* the logic behind the changeOwnerAndMoveToNewHome-function inside the eventListener
        * the function is inside contactOwner();
        */
        function changeOwnerAndMoveToNewHome(e){
            let newOwnerName = document.querySelector("#adoption ul div input").value;
            // it is crucial to work with e.target and not just to access elements via querySelector
            let LI = e.target.parentElement.parentElement.parentElement;
            console.log(LI);
            let DIV = LI.querySelector("div");
            console.log(DIV)
        
           //remove the redundant btn and input field
            DIV.remove();
        
           //Change the name of the owner
           let SPAN = LI.querySelector("span");
           SPAN.innerText = `New owner: ${newOwnerName}`;
           

           //create and append the new BTN-Checked
           let BTN = document.createElement("button");
           BTN.innerText = "Checked";
           LI.appendChild(BTN);

           // append it to "buddies with new home"
           adopted.appendChild(LI);
           // add new eventListener on teh Checked btn
           let allBTNs = adopted.querySelectorAll("button");
           allBTNs.forEach(checked => checked.addEventListener("click", del));
           console.log(allBTNs);
        }

        function del(e){
         (e.target.parentElement).remove();
        }
       
 

    });

}

