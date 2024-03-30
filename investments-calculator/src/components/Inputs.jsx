import React from "react";

import SingleInput from "./SingleInput";

export default function Inputs({ updateInput }) {
  return (
    <main className="input-group">
      <SingleInput label="Initial Investment" handleUpdateInput={updateInput} />
      <SingleInput label="Annual Investment" handleUpdateInput={updateInput} />
      <SingleInput label="Expected Return" handleUpdateInput={updateInput} />
      <SingleInput label="Duration" handleUpdateInput={updateInput} />
    </main>
  );
}
