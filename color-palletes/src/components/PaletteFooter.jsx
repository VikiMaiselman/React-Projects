import React from "react";

export default function PaletteFooter({ palette }) {
  return (
    <footer className="Palette-footer">
      <span className="footer-emoji">{palette.emoji}</span>
      {palette.paletteName} Palette
      <span className="footer-emoji">{palette.emoji}</span>
    </footer>
  );
}
