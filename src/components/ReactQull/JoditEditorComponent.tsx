import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/build/jodit.min.css'; // Import Jodit's CSS

// Component now accepts props for config and content
const JoditEditorComponent = ({ config, content, setContent }) => {
  const editor = useRef(null);

  return (
    <div>
      <h3>Jodit Editor with Tooltips in React</h3>
      <JoditEditor
        ref={editor}
        value={content}
        config={config} // Receive config from parent
        // tabIndex={1} // Tab index of the textarea
        onBlur={(newContent) => setContent(newContent)} // Update content when blurred
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default JoditEditorComponent;