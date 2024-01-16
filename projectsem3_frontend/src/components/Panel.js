// Panel.js
import React from 'react';

const Panel = ({ side, buttonText, content, imageSrc, headerText, idText }) => {
  return (
    <div className={`panel ${side}-panel`}>
      <div className="content">
        <h3>{headerText}</h3>
        <p>{content}</p>
        <button className="btn transparent" id={idText}>{buttonText}</button>
      </div>
      <img src={imageSrc} className="image" alt="" />
    </div>
  );
};

export default Panel;
