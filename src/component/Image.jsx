import React from "react";

const Image = ({ key, image }) => {
  if (image !== null && image !== undefined && image.previewImage) {
    return (
      <div style={{ width: "260px", height: "286px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          id={key}
          src={"data:image/png;base64," + image.bytes}
          alt={image.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }
};

export default Image;
