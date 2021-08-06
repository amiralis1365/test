import React from 'react';

type PropsType = { onFileSelect: (file: File) => void; className?: string; children?: React.ReactNode };

const FileInput = ({ onFileSelect, className, children }: PropsType) => {
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileInput} ref={fileInput} hidden accept="image/png, image/gif, image/jpeg" />
      <div onClick={() => fileInput.current && fileInput.current.click()} className={className}>
        {children}
      </div>
    </>
  );
};

export default FileInput;
