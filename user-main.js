
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log(userId);
const btnPost = document.getElementById('btn');
const divUsers = document.getElementById('user-info');
const titleClick = document.getElementById('titleClick')
function toUpFirstLetter (string){
  return   string.charAt(0).toUpperCase() + string.slice(1)
}

async function addUserInfo (idUser){
    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/` + idUser).then(response => response.json());
               for (const key in user) {
            if (typeof user[key] === 'object') {
                const userItem = user[key];
                const ulAddress = document.createElement('ul');
                const p = document.createElement('p');
                p.innerText = `${toUpFirstLetter(key)} :`
                divUsers.append(p, ulAddress);
                for (const element in userItem) {
                    if (typeof userItem[element] === 'object') {
                        const userGeo = userItem[element];
                        let ul = document.createElement('ul');
                        let li = document.createElement('li');
                        li.innerText = `${toUpFirstLetter(element)} : `;
                        ulAddress.appendChild(li);
                        li.appendChild(ul);
                        for (const elementKey in userGeo) {
                            const li = document.createElement('li')
                            li.innerText = `${toUpFirstLetter(elementKey)}:  ${userGeo[elementKey]}`;
                            ul.appendChild(li);
                        }
                    } else {
                        const li = document.createElement('li');
                        li.innerText = `${toUpFirstLetter(element)}: ${userItem[element]}`
                        ulAddress.appendChild(li);
                    }
                }
            } else {
                const divUser = document.createElement('p')
                divUsers.appendChild(divUser);
                divUser.innerText = `${toUpFirstLetter(key)}: ${user[key]}`;
            }
        }
        const posts = await fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/posts`).then(response => response.json());

        for (const post of posts) {
            const btn = document.createElement('button');
            btn.classList.add('post-btn');
            btn.innerText = `Info about post ${post.id}`.toUpperCase();
            btn.onclick = function (){
                window.location.href = `post-details.html?id=${post.id}`;
            }
            const divTitle = document.createElement('div')
            const h5 = document.createElement('h5');
            divTitle.classList.add('user-title');
            h5.innerText = `${post.id} ${toUpFirstLetter(post.title)}`;
            divTitle.append(h5 , btn);
            titleClick.append(divTitle);
        }

    }catch (error) {
        console.error("Error fetching user info or posts:", error);
    }
}

addUserInfo(userId)
.then(() => {
    console.log("User info successfully added.");
})
    .catch(error => {
        console.error("Error fetching user info or posts:", error);
    });

btnPost.onclick = function () {
    if (titleClick.style.display === 'none'|| titleClick.style.display === '') {
        titleClick.style.display = 'flex';
    } else { titleClick.style.display = 'none';
    }
};



