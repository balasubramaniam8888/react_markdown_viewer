const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
    origin: '*' // Specify the origin of your frontend
}));



// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://BALAVI8888:12345@cluster8.icsdgyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster8';
mongoose.connect(uri)
.then(()=>console.log("mongo db atlas is connected"))
.catch((error)=>console.log(error))

// Schema and Model
const markdownSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Markdown = mongoose.model('Markdown', markdownSchema);

// Routes
app.get('/markdowns', async (req, res) => {
    const markdowns = await Markdown.find();
    res.json(markdowns);
});

app.post('/markdowns', async (req, res) => {
    const { title, content } = req.body;
    const newMarkdown = new Markdown({ title, content });
    await newMarkdown.save();
    res.json(newMarkdown);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
