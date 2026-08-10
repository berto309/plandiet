import React from 'react';

const Error = ({message}: {message?: string}) => {
    return (
      message &&   <span style={{color: "rgb(248, 113, 113)", "fontSize" : "0.8rem"}}>{message}</span>
    );
};


export default Error;
