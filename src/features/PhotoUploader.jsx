import { useDropzone } from 'react-dropzone';

const PhotoUploader = ({ onFilesUpload, onFilesChange }) => {
  const onDrop = (acceptedFiles) => {
    onFilesUpload(acceptedFiles);
    if (onFilesChange && typeof onFilesChange === 'function') {
      onFilesChange(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>Перетащите сюда файлы или кликните, чтобы выбрать.</p>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default PhotoUploader;