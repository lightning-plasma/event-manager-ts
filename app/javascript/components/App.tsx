import React from "react";

interface Hello {
  name: string;
}

const HelloMessage = ({ name }: Hello) => {

  return (
    <div>{name}</div>
  );
}

export default HelloMessage;
