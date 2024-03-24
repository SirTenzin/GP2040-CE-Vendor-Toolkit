import React from 'react';

const Card = ({ title, content, buttonText, bgColor = "primary", textColor = "black", onClick }: any) => {
  return (
    <div className={`card w-96 bg-${bgColor} text-${textColor}`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary text-black" onClick={onClick}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
