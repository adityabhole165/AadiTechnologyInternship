import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillEditor() {
  const [value, setValue] = useState('');
   var toolbarOptions = [ ['bold', 'italic', 'underline', 'strike'],       
   ['blockquote', 'code-block'],
   ['link', 'image', 'video', 'formula'],
   [{ 'header': 1 }, { 'header': 2 }],              
   [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
   [{ 'script': 'sub'}, { 'script': 'super' }],      
   [{ 'indent': '-1'}, { 'indent': '+1' }],         
   [{ 'direction': 'rtl' }],                         
   [{ 'size': ['small', false, 'large', 'huge'] }],  
   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
 
   [{ 'color': [] }, { 'background': [] }],          
   [{ 'font': [] }],
   [{ 'align': [] }],
 
   ['clean']];
   const module ={
    toolbar : toolbarOptions,
   }; 

  return 
  
  <ReactQuill 
  modules={module}
  theme="snow"
   value={value} 
   onChange={setValue} />;
}

export default QuillEditor;