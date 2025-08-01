import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const PhotoUploader = ({ onFilesUpload, onFilesChange, imageList = [] }) => {
  const customRequest = ({ file, onSuccess }) => {
    // Просто передаём файл вверх, без реального аплоада
    onFilesUpload([file]);
    if (onFilesChange) {
      onFilesChange([...imageList, file]);
    }
    setTimeout(() => onSuccess("ok"), 0);
  };

  const props = {
    name: "file",
    multiple: true,
    customRequest,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error(`${file.name} не является изображением`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
  };

  return (
    <>
      <Dragger {...props} style={{ padding: "20px" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Перетащите файлы сюда или нажмите для выбора
        </p>
        <p className="ant-upload-hint">Можно загрузить несколько изображений</p>
      </Dragger>

      {/* Превью загруженных файлов */}
      <div
        style={{ display: "flex", flexWrap: "wrap", marginTop: 16, gap: 12 }}
      >
        {imageList.map((file, index) => {
          const src =
            file instanceof File
              ? URL.createObjectURL(file)
              : file.bytes
                ? `data:image/png;base64,${file.bytes}`
                : "";

          return (
            <div key={index} style={{ width: 100, position: "relative" }}>
              <img
                src={src}
                alt={`preview-${index}`}
                style={{ width: "100%", borderRadius: 4, objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PhotoUploader;
