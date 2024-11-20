import express from "express";
import bodyParser from 'body-parser'



const app = express();
const port = 3000;

let currentId = 1
var blogPosts = [];

// Middleware to parse request bodies
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({extended: true})); 

// Route to render the blog creation form
app.get('/', (req, res) => {
    try {
        res.render('index.ejs', { blogPosts });
    } catch (error) {
        res.status(500).send('Error rendering homepage');
    }
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.post('/delete', (req, res) => {
    const postId = parseInt(req.body.id); // Correctly accessing req.body.id
    blogPosts = blogPosts.filter(post => post.id !== postId); // Filtering out the post with the matching id
    res.redirect("/"); // Redirecting to the home page
});


// Route to handle form submission and create a new blog post
app.post('/create', (req, res) => {
    console.log(req.body);
    const {category, title, description} = req.body;

    // Create a new blog post object
    const newPost = {
        id: currentId ++,
        category,
        title,
        description
    };

    // Add the new post to the list
    blogPosts.push(newPost)
    console.log(blogPosts)
    res.redirect('/');
});
        
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });