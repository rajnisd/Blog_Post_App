

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL,{
        method:"GET"
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
// console.log(blogPosts);
let blogPostContent="";
for(blogpost of blogPosts){
    const postDate=  new Date(parseInt(blogpost["added_date"])).toDateString();
    const postImage=`${API_BASE_URL+blogpost.post_image}`;
    const postLink= `/post.html?id=${blogpost.id}`;
    blogPostContent +=`
    <a href="${postLink}" class="post-link">
        <div class="post">
                    <div class="post-image" style="background-image:url(${postImage})"></div>
                    <div class="post-content">
                        <div class="post-date">${postDate}</div>
                        <div class="post-title">${blogpost["title"]}</div>
                        <div class="post-text"><p>${blogpost["content"]}</p> </div>
                    </div>
                </div>
    </a>
    `;
    // document.getElementsByClassName("main-container")[0].innerHTML=blogPostContent;
    document.querySelector(".blog-posts").innerHTML=blogPostContent;
}
}