import React from 'react';

// export default (props) => {
export default ({ input, label  }) => {
  // console.log(input);
  return (
    <div>
      <label>{label}</label>
      {/* <input  onBlur={input.onBlur} onChange={input.onChange} etc... /> */}
      <input {...input} />
    </div>
  )
}