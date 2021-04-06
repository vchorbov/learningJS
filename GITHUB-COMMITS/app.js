function loadCommits() {
    let username = document.querySelector('#username').value;
    let repo = document.querySelector('#repo').value;
    let urlRequest = `https://api.github.com/repos/${username}/${repo}/commits`; 
    let arr = [];
    let ul = document.querySelector('#commits');
   let fetchPromise = fetch(urlRequest);

   fetchPromise.then(function(response){
       if(response.status == 200){
        return response;
       }else if(response.status == 404){
        let li = document.createElement('li');
        li.innerHTML = `The given resource is not available`;
        ul.appendChild(li);
       }
   })
   .then(response => response.json())
   .then(function(data){
       data.forEach(element => {
      let author = element.commit.author.name;
      let message = element.commit.message;
      let li = document.createElement('li');
      li.innerHTML = `${author}: ${message}`;
      ul.appendChild(li);
    })
   })

}
