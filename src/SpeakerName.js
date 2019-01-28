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
        <h3 
            style = { speaker.visible ? { ...shown } : { ...hidden } }
        >
            {speaker.name}
        </h3>
    );
};

export default SpeakerName;
