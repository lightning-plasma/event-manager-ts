import React from "react";

interface Hello {
  name: string;
}

const HelloMessage = ({ name }: Hello) => <div>Hello, {name}</div>;

export default HelloMessage;
