require("dotenv").config();


const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString)


const User = require("./models/user_model");

const NotesApp = require("./models/note_nodel");
const express = require("express");
const cors = require("cors");
const app= express();


const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");


app.use(express.json());

app.use(
    cors({
       origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // If your frontend requires credentials
    })
);

app.get("/", (req, res) =>{
    res.json({data: "hello"});

});

//Backend Ready 
//create Account 
app.post("http://localhost:8000/create-account", async (req, res)=>{
    const {fullName, email, password} = req.body;

    if(!fullName){
        return res.status(400).json({error: true, message:"Full Name is required"});
    }

    if(!email){
        return res.status(400).json({error:true, message:"Email is required"});
    }

    if(!password){
        return res.status(400).json({error:true, message:"Password is required"});
    }

    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({error: true, message:"User already exist"});
    }

    const user = new User({
        fullName,
        email, password,

    });

    await user.save();

    const accessToken = jwt.sign ({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m"});


    return res.json({
        error: false,
        user,
        accessToken,
        message:"Registration Successful",
    })

});


app.post("/login", async(req, res)=>{
    const { email , password } = req.body;
   
    
    if(!email){
        return res.status(400).json({error:true, message:"Email is required"});
    }

    if(!password){
        return res.status(400).json({error:true, message:"Password is required"});
    }

    const userInfo = await User.findOne({ email: email});

    if(!userInfo){
        return res.status(400).json({ message: "User not found"});
    }

    if( userInfo.email == email && userInfo.password == password){
        const user ={ user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        })

        return res.json({
            error: false,
            message: "Login Successful",
            email, 
            accessToken,
        })
    }
    else{
        return res.status(400).json({
            error:true,
            message: "Invalid Credentials",
        })
    }
})


// Get User
app.get("/get-user", authenticateToken, async(req,res)=>{
    const {user} =req.user;

    const isUser = await User.findOne({_id: user._id});

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn },
        message: "",


    })
})

app.post("/add-note", authenticateToken, async(req, res)=>{

    const {title, content, tags, color, titleFont, contentFont, tagFont,fontColor,fontColorContent } = req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({error: true, message: "Title is required"})
    }

    if(!content){
        return res.status(400).json({error: true, message: "Content is required"})
    }


    try{
        const note = new NotesApp({
            title,
            content,
            tags: tags || [],
            color: color || "#ffffff",
            fontColor: fontColor || '#000000',
            fontColorContent: fontColorContent || '#000000',
            tagColorContent: tagColorContent || '#000000',
            userId: user._id,
            titleFont: titleFont || "Arial",  // Include title font
            contentFont: contentFont || "Arial",  // Include content font
            tagFont: tagFont || "Arial",  // Include tag font
        })
        await note.save();

        return res.json({
            error: false,
            note,
            message:" Note added successfully",
        });
    }catch(error){
        
        return res.status(500).json({
            error: false,
            message:"Internal Server Error",
        });
    }
});

//EDIT NOTE

app.put("/edit-note/:noteId", authenticateToken, async(req, res)=>{
    // console.log("Request user:", req.user);
    const noteId =req.params.noteId;
    const { title, content, tags, isPinned, color, titleFont, contentFont,tagFont, fontColor, fontColorContent, tagColorContent} = req.body;

    const { user } =req.user;

    if(!title && !content && !tags) {
        return res.status(400).json({error: true, message:"No changes provider"});
    }

    try{
        const note = await NotesApp.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({error: true, message:"Note not found"});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;
        if (color) note.color = color;
        if(titleFont) note.titleFont = titleFont;
        if(contentFont) note.contentFont = contentFont;
        if(tagFont) note.tagFont = tagFont; 
        if(fontColor) note.fontColor = fontColor;       
        if(fontColorContent) note.fontColorContent = fontColorContent;
        if(tagColorContent) note.tagColorContent = tagColorContent;

        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note updated successfully",
        })
    }catch(error){

        return res.status(500).json({
            error: false,
            message:"Internal Server Error",
        });
    }
})


//Get all Notes
app.get("/get-all-notes/", authenticateToken, async(req, res)=>{
    const {user} = req.user;

    try{
        const notes = await NotesApp.find({userId: user._id}).sort({
            isPinned: -1
        });
        return res.json({
            error: false,
            notes,
            message:"All notes retrieved successfully",
        })
    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        })
    }
})


//Delete Notes
app.delete("/delete-note/:noteId", authenticateToken, async(req, res)=>{

    const noteId = req.params.noteId;
    const {user} = req.user;

    try{
        const note = await NotesApp.findOne({_id: noteId, userId: user._id
           
        });

        if(!note){
            return res.status(404).json({error: true , message:"Note not found"});
        }

        await NotesApp.deleteOne({_id: noteId, userId: user._id})

        return res.json({
            error: false,
            message:"Note deleted successfully",
        })
    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        })
    }
})

//Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async(req, res)=>{


    const noteId =req.params.noteId;
    const {isPinned} = req.body;

    const { user } =req.user;
    console.log(noteId);  // Add this before the axios call to see if it matches the correct note ID

    try{
        const note = await NotesApp.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({error: true, message:"Note not found"});
        }

    
     note.isPinned  = isPinned;
        

        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note updated successfully",
        })
    }catch(error){

        return res.status(500).json({
            error: false,
            message:"Internal Server Error",
        });
    }
});

//Search Notes
app.get("/search-notes/", authenticateToken, async(req, res)=>{
       const { user } = req.user;
       const { query } = req.query;

       if(!query){
        return res.status(400).json({error: true, message: "Search query is required"});
       }

       try{

        const matchingNotes =  await NotesApp.find({
            userId: user._id,
            $or: [
            { title: { $regex: new RegExp(query, "i")}},
            { content: { $regex: new RegExp(query, "i")}},
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });

       }catch(error){
        return res.status(500).json({
            error: true,
            message:"Internal Server error",
        })
       }
    
});


app.listen(8000);

module.exports = app;
