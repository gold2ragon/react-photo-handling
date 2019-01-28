import React from 'react';

const shown = {
    textAlign: "left",
    display: "block"
};

const hidden = {
    display: "none"
}

const SpeakerName = ({ speaker }) => {
	return (
        <h1 
            style = { speaker.visible ? { ...shown } : { ...hidden } }
        >
            {speaker.name}
        </h1>
    );
};

export default SpeakerName;
