import React from 'react';

const Checkmark = ({ selected }) => (
	<div style={selected ? { left: '4px', top: '4px', position: 'absolute', zIndex: '1' } : { display: 'none' }}>
		<svg style={{ fill: 'white', position: 'absolute' }} width="24px" height="24px">
			<circle cx="12.5" cy="12.2" r="8.292" />
		</svg>
		<svg style={{ fill: '#06befa', position: 'absolute' }} width="24px" height="24px">
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
		</svg>
	</div>
);

const imgStyle = {
	width: '100%',
	height: '100%',
	transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s',
};
const selectedImgStyle = {
    // border: "5px solid green"
	//   transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
	//   transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
	backgroundColor: '#eee',
	cursor: 'pointer',
	overflow: 'hidden',
	position: 'relative',
};
const divStyle = {
    margin: '20px',
    outline: 'none',
    // height: photo.height - 40,
    // width: photo.width - 40,
};
const selectedDivStyle = {
    outline: '#72d4a9 solid 7px',
};
const SelectedImage = ({ index, onClick, photo, margin, direction, top, left }) => {
	//calculate x,y scale
	// const sx = (100 - (30 / photo.width) * 100) / 100;
	// const sy = (100 - (30 / photo.height) * 100) / 100;
    //   selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;
    divStyle.width = photo.width - 40;
    divStyle.height = photo.height - 40;

	if (direction === 'column') {
		cont.position = 'absolute';
		cont.left = left;
		cont.top = top;
	}
	return (
		<div
			style={
                photo.selected ? {...divStyle, ...selectedDivStyle, ...cont} : { ...divStyle , ...cont}
            }
			className={!photo.selected ? 'not-selected' : ''}
		>
			<img
				style={photo.selected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }}
				{...photo}
				onClick={e => onClick(e, { index, photo })}
			/>
			<style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
		</div>
	);
};

export default SelectedImage;
