import React, { ReactNode } from 'react';

type FormCardProps = {
  title: string,
  content: ReactNode,
  bgColor?: string,
  textColor?: string,
}

const FormCard = ({ title, content, bgColor = "primary", textColor = "black" }: FormCardProps) => {
  return (
    <div style={{ width: 1100, height: 650 }} className={`card bg-base-200 text-${textColor} top-10`}>
      <div className="card-body">
        <h2 className={`card-title text-${textColor}`}>{title}</h2>
          <div className="flex justify-start">{content}</div>
      </div>
    </div>
  );
};

export default FormCard;
