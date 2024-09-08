const postId = new URLSearchParams(window.location.search).get('id');
console.log(postId);
let postsDiv = document.getElementById('post');
const toUpFirstLetter = (msg)=>{
    if (typeof msg === 'string'){
    return   msg.charAt(0).toUpperCase() + msg.slice(1)}
    else {
        return msg
    }

}

const deleteSlash = msg => {
    if (typeof msg === 'string') {
         const newMsg=msg.charAt(0).toUpperCase() + msg.slice(1)
        return newMsg.replaceAll(/\n/g, ' ')
    }else {
        return msg;
    }

}

async function addUserPost (idPost){
    try {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${idPost}`).then(response => response.json());
        for (const post of posts) {
            const divPost = document.createElement('div')
            divPost.classList.add('post-wrap');
            const divComment = document.createElement('div')
            divComment.classList.add('comments-wrap');
            for (const postKey in post) {
                if (postKey ==='body'){
                    const p = document.createElement('p')
                    p.innerText = `${toUpFirstLetter(postKey)}: ${deleteSlash(post[postKey])}`;
                    divPost.appendChild(p);}else {
                const p = document.createElement('p')
                p.innerText = `${toUpFirstLetter(postKey)}: ${toUpFirstLetter(post[postKey])}`
                divPost.appendChild(p)}
            }
            postsDiv.append(divPost, divComment);
        const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(response => response.json());
        for (const comment of comments) {
            const divInfo = document.createElement('div');
            divInfo.classList.add('comment-info');
            divComment.appendChild(divInfo);
            for (const commentKey in comment) {
                if (commentKey ==='body'){
                    const p = document.createElement('p')
                    p.innerText = `${toUpFirstLetter(commentKey)}: ${deleteSlash(comment[commentKey])}`;
                    divInfo.appendChild(p);}
                else {
                    const p = document.createElement('p')
                    p.innerText = `${toUpFirstLetter(commentKey)}: ${toUpFirstLetter(comment[commentKey])}`
                    divInfo.appendChild(p);
                }
            }
        }
        }
    } catch (error) {
        console.error("Error fetching user info or posts:", error);
}
}


addUserPost(postId)
    .then(() => {
        console.log("User info successfully added.");
    })
    .catch(error => {
        console.error("Error fetching user info or posts:", error);
    });



