import React from "react";

export default function SingleInput({ label, handleUpdateInput }) {
  const [val, setVal] = React.useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    if (+value < 0) {
      return;
    }
    setVal(() => value);
    handleUpdateInput(label, +value);
  };

  return (
    <div id="user-input">
      <label>{label}</label>
      <input type="number" value={val} placeholder={val} name={label} onChange={handleChange}></input>
    </div>
  );
}
