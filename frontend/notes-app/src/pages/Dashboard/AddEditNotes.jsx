import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({noteData ={}, getAllNotes,
    type, onClose, showToastMessage}) => {

    const [title, setTitle] =useState(noteData?.title || "");
    const [content, setContent] =useState(noteData?.content || "");
    const [tags, setTags] =useState(noteData?.tags || []);
    const [error, setError] =useState(null);

 const [color, setColor] = useState(noteData?.color || '#ffffff');
 const [fontColor, setFontColor] = useState(noteData?.fontColor || '#000000');
 const [fontColorContent, setFontColorContent] = useState(noteData?.fontColorContent || '#000000');
 const [tagColorContent, setTagColorContent] = useState(noteData?.tagColorContent || '#000000');
  const [titleFont, setTitleFont] = useState(noteData?.titleFont || 'Arial');
  const [contentFont, setContentFont] = useState(noteData?.contentFont || 'Arial');
  const [tagFont, setTagFont] = useState(noteData?.tagFont || 'Arial');
    //Add Note
    const addNewNote = async()=> {

        try{
            const response = await axiosInstance.post("/add-note",{
                title,
                content,
                tags,
                color,
                fontColor,
                fontColorContent,
                tagColorContent,
                titleFont,    // Send font data for title, content, and tags
                contentFont,
                tagFont,
            });

            if(response.data && response.data.note){
                showToastMessage("Note Added Successfully");
                    getAllNotes();
                    onClose();
            }
        }catch(error){
                if(
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ){
                    setError(error.response.data.message);
                }
        }
    };

    // Edit Note
    const editNote = async()=>{
        const noteId =noteData._id

        try{
            const response = await axiosInstance.put("/edit-note/" + noteId,{
                title,
                content,
                tags,
                color,
                fontColor,
                fontColorContent,
                tagColorContent,
                titleFont,    // Send font data for title, content, and tags
                contentFont,
                tagFont,
            });

            if(response.data && response.data.note){
                console.log(color, titleFont, contentFont, tagFont) 
                showToastMessage("Note Updated Successfully");
                    getAllNotes();
                    onClose();
            }
        }catch(error){
                if(
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ){
                    setError(error.response.data.message);
                }
        }
    };
    
    const handleAddNote =()=>{
        if(!title){
            setError("Please enter the title");
            return;
        }

        if(!content){
            setError("Please enter the content");
            return;
        }
        setError("");

        if(type === 'edit'){
            editNote()
        }else{
            addNewNote()
        }
    }
    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' 
            onClick={onClose}>
                <MdClose className='text-xl text-slate-400'/>
            </button>
            {/* Main container for note content */}
            <div >
            <div className='flex flex-col gap-2 p-4' >
                {/* <label className='input-label'>TITLE</label> */}
                <input type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Title'
                    value={title}
                    onChange={({target})=> setTitle(target.value)}  
                    style={{ fontFamily: titleFont }}
                />
                {/* Font Selector for Title */}
                <label>Title Font:</label>
                <select value={titleFont} onChange={(e) => setTitleFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                </select>
                   {/* Font Color Picker */}
      <label>Choose Font Color: </label>
      <input 
        type="color" 
        value={fontColor} 
        onChange={(e) => setFontColor(e.target.value)} 
      />
            </div>
    
            {/* Content area remains unchanged */}
            <div className='flex flex-col gap-2 mt-4'>
                {/* <label className='input-label'>CONTENT</label> */}
                <textarea 
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='content'
                    rows={2}
                    value={content}
                    onChange={({target})=>setContent(target.value)}  
                    style={{ fontFamily: contentFont }}  
                />
                {/* Font Selector for Content */}
                <label>Content Font:</label>
                <select value={contentFont} onChange={(e) => setContentFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                </select>

                <label>Choose FontContent Color: </label>
                 <input 
                type="color" 
                value={fontColorContent} 
                onChange={(e) => setFontColorContent(e.target.value) }
                
            />
            </div>
    
            {/* Tags area remains unchanged */}
            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} style={{ fontFamily: tagFont }} />
                {/* Font Selector for Tags */}
                <label>Tag Font:</label>
                <select value={tagFont} onChange={(e) => setTagFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Courier New">Courier New</option>
                </select>

                <label>Choose FontTag Color: </label>
                 <input 
                type="color" 
                value={tagColorContent} 
                onChange={(e) => setTagColorContent(e.target.value) }
                
            />
            </div>
    
            {/* Color Picker remains unchanged */}
            <label>Background Color:</label>
            <input
                type="color"
                value={color}
                onChange={(e) =>{ setColor(e.target.value)
                    console.log("Selected color: ", e.target.value); 
                }
                }
            />
    
            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
            <button 
                className='btn-primary font-medium mt-5 p-3' 
                onClick={handleAddNote}>
                {type === 'edit' ? 'UPDATE' :'ADD'}
            </button>
            </div>
        </div>
    );
    
}

export default AddEditNotes