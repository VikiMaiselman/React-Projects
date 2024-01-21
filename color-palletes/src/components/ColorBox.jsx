import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
// automatic copying to clipboard library

import "../styles/ColorBox.css";

export default function ColorBox({
  color,
  colorFormat,
  colorId,
  paletteId,
  showLink = true,
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopying = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const classes = isCopied ? "copied" : "";

  return (
    <div className="ColorBox" style={{ background: `${color[colorFormat]}` }}>
      <CopyToClipboard text={color[colorFormat]} onCopy={handleCopying}>
        <div className="copy-container">
          <span className="color-name-span">{color.name}</span>
          <button className="copy-btn">Copy</button>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={(event) => event.stopPropagation()}
            >
              <span className="see-more-span">See more</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
      {/* should be a separate div as we don't want the spans & btn to grow 
      (as would happen if we were scaling up the "copy-container" itself */}
      <div
        style={{ background: `${color[colorFormat]}` }}
        className={`copy-overlay ${classes}`}
      />

      <div className={`copy-msg ${classes}`}>
        <h1>Copied!</h1>
        <p>{color[colorFormat]}</p>
      </div>
    </div>
  );
}
