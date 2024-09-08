let usersDiv = document.getElementById('users-wrap');
fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res => res.json())
    .then(users => {
        for (const user of users) {
            const userDiv = document.createElement('div');
            const h2 = document.createElement('h2')
            const btn = document.createElement('button');
            btn.onclick = function () {
                location.href = `../second-page/user-details.html?id=${user.id}`
            };
            userDiv.append(h2 , btn);
            btn.classList.add('btn-user-info');
            btn.innerText = `Information about user ${user.id}`;
            usersDiv.appendChild(userDiv);
            userDiv.classList.add('user');
            h2.innerText = `${user.id} ${user.name}`
        }
    });