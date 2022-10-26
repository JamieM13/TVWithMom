window.addEventListener('load', () => {
    document.getElementById('titleButton').addEventListener('click', () => {
        let titleTag = document.getElementById('tvTitle').value;
        console.log(titleTag);
        let obj ={"title": titleTag};
        let jsonData = JSON.stringify(obj);

        fetch("/tvInfo",{
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})

        //make a fetch request of type post to save information about tv show to the server
    })
    document.getElementById('getTvInfo').addEventListener('click', ()=> {
        //get info on the TV show
        fetch('/getTvInfo')
        .then(resp=> resp.json())
        .then(data =>{
            console.log(data.data);
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].title;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('tvInfo').appendChild(elt);
            
            }
        })
    })
})