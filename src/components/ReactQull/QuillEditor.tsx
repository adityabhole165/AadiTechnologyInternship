import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'src/assets/style/teacher.css';
const QuillEditor = ({ formik }) => {
  const quillRef = useRef(null);

  // Toolbar options with all buttons and configuration
  const toolbarOptions = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: ['arial', 'times-new-roman', 'courier', 'georgia', 'verdana', 'tahoma', 'impact', 'calibri', 'comic-sans', 'monospace'] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['clean'],
      ],
    },
  };

  // Tooltip mapping for toolbar options
  const tooltips = {
    '.ql-bold': 'Bold',
    '.ql-italic': 'Italic',
    '.ql-underline': 'Underline',
    '.ql-strike': 'Strikethrough',
    '.ql-blockquote': 'Blockquote',
    '.ql-code-block': 'Code Block',
    '.ql-link': 'Insert Link',
    '.ql-image': 'Insert Image',
    '.ql-video': 'Insert Video',
    '.ql-formula': 'Insert Formula',
    '.ql-header[value="1"]': 'Header 1',
    '.ql-header[value="2"]': 'Header 2',
    '.ql-list.ql-ordered': 'Ordered Number List',
    '.ql-list.ql-bullet': 'Bullet List',
    '.ql-list.ql-check': 'Checklist',
    '.ql-script.ql-sub': 'Subscript',
    '.ql-script.ql-super': 'Superscript',
    '.ql-indent[value="-1"]': 'Decrease Indent',
    '.ql-indent[value="+1"]': 'Increase Indent',
    '.ql-direction[value="rtl"]': 'Right-to-Left',
    '.ql-size': 'Font Size',
    '.ql-align[value=""]': 'Align Left',
    '.ql-align[value="center"]': 'Align Center',
    '.ql-align[value="right"]': 'Align Right',
    '.ql-align[value="justify"]': 'Justify',
    '.ql-color': 'Text Color',
    '.ql-background': 'Background Color',
    '.ql-font': 'Font Family',
    '.ql-clean': 'Clear Formatting',
    '.ql-font[value="arial"]': 'Arial',
    '.ql-font[value="times-new-roman"]': 'Times New Roman',
    '.ql-font[value="courier"]': 'Courier',
    '.ql-font[value="georgia"]': 'Georgia',
    '.ql-font[value="verdana"]': 'Verdana',
    '.ql-font[value="tahoma"]': 'Tahoma',
    '.ql-font[value="impact"]': 'Impact',
    '.ql-font[value="calibri"]': 'Calibri',
    '.ql-font[value="comic-sans"]': 'Comic Sans',
    '.ql-font[value="monospace"]': 'Monospace',


  };

  // Apply tooltips after the toolbar renders
  useEffect(() => {
    const applyTooltips = () => {
      setTimeout(() => {
        Object.keys(tooltips).forEach((selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => {
            element.setAttribute('title', tooltips[selector]);
          });
        });
      }, 100); // Delay to ensure toolbar elements are rendered
    };

    applyTooltips();
  }, [tooltips]); // Apply tooltips whenever `tooltips` object changes

  return (
    <ReactQuill
      ref={quillRef}
      value={formik.values.Content}
      modules={toolbarOptions}
      onChange={formik.handleChange}
      theme="snow"
      style={{ height: '15vh', resize: 'vertical' }}
    />
  );
};

export default QuillEditor;