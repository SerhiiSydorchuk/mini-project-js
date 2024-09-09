const postId = new URLSearchParams(window.location.search).get('id');
let postsDiv = document.getElementById('post');
const toUpFirstLetter = (msg)=>{
    return typeof msg === 'string' ?
        msg.charAt(0).toUpperCase() + msg.slice(1) :
        msg;
}


//Reusable function to creat paragraph
const creatParagraph = (key, value,div) => {
    const p = document.createElement('p');
    p.innerText = `${toUpFirstLetter(key)}: ${toUpFirstLetter(value)}`
    return p;
};
//Reusable function to creat div with class
const creatDivWithClass = (divName , className) =>{
    divName = document.createElement('div');
    divName.classList.add(className);
    return divName;
}

async function addUserPost (idPost){
    try {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${idPost}`).then(response => response.json());
        for (const post of posts) {
            const divPost = creatDivWithClass('divPost', 'post-wrap');

            for (const postKey in post) {
                const p = creatParagraph(postKey,post[postKey])
                divPost.appendChild(p);
            }
            const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(response => response.json());
            const divComment = creatDivWithClass('divComment', 'comments-wrap');
            for (const comment of comments) {
                const divInfo = creatDivWithClass('divInfo', 'comment-info');
                for (const commentKey in comment) {
                    const p = creatParagraph(commentKey, comment[commentKey])
                    divInfo.appendChild(p);
                }
                divComment.appendChild(divInfo);
            }
            postsDiv.append(divPost, divComment);
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



