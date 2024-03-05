import React from "react";

const MessageSVG = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 512.093 512.093"
      xmlSpace="preserve"
      height="25px"
      {...props}
    >
      <path
        fill="currentColor"
        d="M336.047 0h-160c-97.202 0-176 78.798-176 176v64c0 97.202 78.798 176 176 176h16v80c-.051 8.836 7.07 16.041 15.907 16.093a15.999 15.999 0 0011.453-4.733l91.2-91.36h25.44c97.202 0 176-78.798 176-176v-64c0-97.202-78.798-176-176-176zm144 240c0 79.529-64.471 144-144 144h-32a15.999 15.999 0 00-11.36 4.64l-68.64 68.8V400c0-8.837-7.163-16-16-16h-32c-79.529 0-144-64.471-144-144v-64c0-79.529 64.471-144 144-144h160c79.529 0 144 64.471 144 144v64z"
      ></path>
      <path fill="currentColor" d="M128.047 192H384.047V224H128.047z"></path>
      <path fill="currentColor" d="M128.047 112H384.047V144H128.047z"></path>
      <path fill="currentColor" d="M128.047 272H256.047V304H128.047z"></path>
    </svg>
  );
};

export default MessageSVG;
