import express, { urlencoded } from "express";

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

let myPostsArray = []

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: myPostsArray })
})

app.get("/add", (req, res) => {
    res.render("add.ejs")
})

app.post("/add", (req, res) => {
    const { title, content } = req.body
    const newPosts = {
        id: Date.now().toString(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    }
    myPostsArray.push(newPosts)
    res.redirect("/")
})

app.get("/edit/:id", (req, res)=>{
    const postId=req.params.id;
    const selectedPost=myPostsArray.find((post)=>post.id===postId)
    if(selectedPost){
      res.render("edit.ejs", {post:selectedPost})
    }
})

app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const { title, content, date } = req.body
    const selectedPost = myPostsArray.find((post) => post.id === postId)
    if (selectedPost) {
        selectedPost.title = title
        selectedPost.content = content
        selectedPost.date = date
    }
    res.redirect("/")
})

app.post("/delete/:id", (req, res) => {
    const postId = req.params.id
    myPostsArray = myPostsArray.filter((post) => post.id !== postId)
    res.redirect("/")
})
app.listen(3000, () => {
    console.log('Server works in 3000 port');
})