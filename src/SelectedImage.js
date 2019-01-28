import React from "react";

const Checkmark = ({ selected }) => (
  <div
    style={
      selected
        ? { left: "4px", top: "4px", position: "absolute", right: "0", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#06befa", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M0,0 L1,1 M0,1 L1,0" />
    </svg>
  </div>
);

const imgStyle = {
  // transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const selectedImgStyle = {
  // transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  // transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

const SelectedImage = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left
}) => {
  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  // selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }
  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!photo.selected ? "not-selected" : ""}
    >
      <div
        style = {
          {
            width: "24px",
            height: "24px",
            position: "absolute",
            right: "0",
            background: "#d8d8d8",
            borderRadius: "15px",
            textAlign: "center",
            fontSize: "19px"
          }
        }
        onClick={e => onClick(e, { index, photo })}
      >
        <span id="x">&times;</span>
      </div>
      <img
        style={
          photo.selected
            ? { ...imgStyle, ...selectedImgStyle }
            : { ...imgStyle }
        }
        {...photo}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

export default SelectedImage;
