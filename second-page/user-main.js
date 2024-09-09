
const userId = new URLSearchParams(window.location.search).get('id');
const btnPost = document.getElementById('btn');
const divUsers = document.getElementById('user-info');
const titleClick = document.getElementById('titleClick')
const btnReturn = document.getElementById('btn-return');

function toUpFirstLetter(msg) {
    return typeof msg === 'string' ?
        msg.charAt(0).toUpperCase() + msg.slice(1) :
        msg;
}
//Reusable function to creat tag
const createTag = (key,value,tag)=>{
    const tagName = document.createElement(tag);
    tagName.innerText = `${toUpFirstLetter(key)}: ${toUpFirstLetter(value)}`;
    return tagName;
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
                            const li = createTag(elementKey, userGeo[elementKey], 'li');
                           ul.appendChild(li);
                        }
                    } else {
                        const li = createTag(element, userItem[element], 'li');
                        ulAddress.appendChild(li);
                    }
                }
            } else {
                const p = createTag(key, user[key], 'p');
                divUsers.appendChild(p);
            }
        }
        const posts = await fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/posts`).then(response => response.json());
        posts.forEach((post) => {
            const btn = document.createElement('button');
            btn.classList.add('post-btn');
            btn.innerText = `Info about post ${post.id}`.toUpperCase();
            btn.onclick = function (){
               location.href = `../third-page/post-details.html?id=${post.id}`;
            }
            const divTitle = document.createElement('div')
            const h5 = document.createElement('h5');
            h5.innerText = `${post.id} ${toUpFirstLetter(post.title)}`;
            divTitle.append(h5 , btn);
            divTitle.classList.add('user-title');
            titleClick.append(divTitle);
        })
    }catch (error) {
        console.error("Error fetching user info or posts:", error);
    }
}
addUserInfo(userId)
.then(() => {
    console.log("User info and posts successfully added.");
})
    .catch(error => {
        console.error("Error fetching user info or posts:", error);
    });
btnPost.onclick = function () {
    titleClick.style.display = titleClick.style.display==='none'|| titleClick.style.display === '' ?'flex':'none';
};
btnReturn.onclick = function () {
    location.href = '../first-page/index.html';
};


