import React from "react";
import { ThemeContext } from "./Contexts";

export default function PageContents({ children }) {
  const result = React.useContext(ThemeContext);

  const styles = {
    width: "100vw",
    height: "100vh",
    backgroundColor: result.isDarkTheme ? "darkblue" : "white",
  };
  return <div style={styles}> {children}</div>;
}
