// import fs from fs;

const fs= require("fs");
const PATH='./data.json';

class Post{
    getPostlist(){
        //to get list of all posts
        return this.readData();
    }

    getIndividualPost(postID){
        //to get all detials for a post
        const currentPosts= this.readData();
        let foundPost = currentPosts.find((posts)=> posts.id==postID);
        return foundPost;
        // let flag=0;
        // for(let i = 0; i < currentPosts.length; i++) {
        //     var currentID = currentPosts[i]["id"];
        //     if (currentID==postID){
        //         const reqPost= currentPosts[i];
        //         flag=1;
        //         return reqPost;
        //     }
        // }
        // if (flag !==1){
        //     return "Id is not Present";
        // }
        
    }

    addNewPost(newPost){
        // to add new Post 
        const currentPost = this.readData();
        currentPost.unshift(newPost);
        return  this.storeData(currentPost);

    }
    readData(){
        const rawdata=fs.readFileSync(PATH);
        const posts=JSON.parse(rawdata);
        return posts;
        // // const allPost= 
        // fs.readFile('././data.json' ,(err,jsonString)=>{
        //    const jsondata= JSON.parse(jsonString);
        //     console.log(jsondata);
        // //     //this.getPostlist( jsondata);
        // //     return jsondata;
        // });
        // // console.log(allPost);
        // // const filedata= require('././data.json');
        // // console.log(filedata);
    }

    storeData(rawData){
        const post= JSON.stringify(rawData)
        fs.writeFileSync(PATH,post);
        
    }
}

module.exports = Post;