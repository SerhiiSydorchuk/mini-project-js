const postId = new URLSearchParams(window.location.search).get('id');
let postsDiv = document.getElementById('post');
const toUpFirstLetter = (msg)=>{
    return typeof msg === 'string' ?
        msg.charAt(0).toUpperCase() + msg.slice(1) :
        msg;
}

const deleteSlash = msg => msg.replaceAll(/\n/g, ' ');
//Reusable function to creat paragraph
const creatParagraph = (key, value,div) => {
    const p = document.createElement('p');
    p.innerText = `${toUpFirstLetter(key)}: ${toUpFirstLetter(deleteSlash(value))})`
    return p;
};
//Reusable function to creat div with class
const creatDivWithClass = (divName , className) =>{
    divName = document.createElement('div');
    divName.classList.add(className);
    return divName;
}
console.log();




async function addUserPost (idPost){
    try {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${idPost}`).then(response => response.json());
        for (const post of posts) {

            const divPost = creatDivWithClass('divPost', 'post-wrap')
            const divComment = creatDivWithClass('divComment', 'comments-wrap')
            for (const postKey in post) {
                if (postKey ==='body'){
                  let p =  creatParagraph(postKey, post[postKey],divPost);
                   divPost.appendChild(p);}else {
                const p = document.createElement('p')
                p.innerText = `${toUpFirstLetter(postKey)}: ${toUpFirstLetter(post[postKey])}`
                divPost.appendChild(p)}
            }
            postsDiv.append(divPost, divComment);
        const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(response => response.json());
        for (const comment of comments) {
            const divInfo = creatDivWithClass('divInfo', 'comment-info');
            divComment.appendChild(divInfo);
            for (const commentKey in comment) {
                if (commentKey ==='body'){
                    const p = creatParagraph(commentKey, comment[commentKey]);
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



