import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js"; // automatic copying to clipboard library

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
  const isLightColor = chroma(color[colorFormat]).luminance() <= 0.5;

  return (
    <div className="ColorBox" style={{ background: `${color[colorFormat]}` }}>
      <CopyToClipboard text={color[colorFormat]} onCopy={handleCopying}>
        <div className="copy-container">
          <span className={`color-name-span ${isLightColor && "light-text"}`}>
            {color.name}
          </span>
          <button className="copy-btn">Copy</button>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={(event) => event.stopPropagation()}
              // when we click on "see-more" btn the event is handled & then propagates up
              // (up we have a handler that copies the color to the clipboard with animation, & we don't want the user to see this
              // + perform the copy as it's irrelevant in this case)
            >
              <span className={`see-more-span ${isLightColor && "light-text"}`}>
                See more
              </span>
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
        <h1 className={`${isLightColor && "light-text"}`}>Copied!</h1>
        <p className={`${isLightColor && "light-text"}`}>
          {color[colorFormat]}
        </p>
      </div>
    </div>
  );
}
