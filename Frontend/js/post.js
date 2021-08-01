/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPostIdParam=()=>{
    //to get the id of the post to use in the request later
    const queryString= window.location.search;
    //const id = queryString.split("?")[1];
    const urlParams= new URLSearchParams(queryString);
    const post_id=urlParams.get("id");
    console.log(post_id);
    return post_id;
}
const getPost = () => {
    // CODE GOES HERE
    const post_id= getPostIdParam();
    const url= `${API_URL}${post_id}`;

    fetch(url)
    .then((response)=>{
        return response.json();
    }).then((data)=>{
       buildPost(data);
    })
    //  fetch(url
    //  //,(req,res)=>{
    // //     console.log("fetch URL");
    // //     return res;
    // ).then((response)=>{
    //     //console.log("get response");
    //     return JSON.stringify(response) //JSON.stringify(response); /*do not use stringify;*/
    // }).then((data)=>{
    //     //console.log("get data");
    //     buildPost(data);
    // })

}


const buildPost = (data) => {
    // HINT: Convert the date number to a Date string 
    //console.log("build Post called");
    //console.log(data);
    const postDate= new Date(parseInt(`${data.added_date}`)).toDateString();
    const postImage =`url(${API_BASE_URL}${data.post_image})`;
    const postdata=`    
    <div id='individual-post-title'><h2>${data.title}</h2></div>
    <div id='individual-post-date'>Published on ${postDate}</div>
    <div id='individual-post-content'>
        <p>${data.content}</p>
    </div>
    `;
    document.getElementsByTagName("header")[0].style.backgroundImage=postImage;
    document.getElementsByClassName("post-container")[0].innerHTML=postdata;

}

