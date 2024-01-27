import React from "react";
import Navbar from "./Navbar";
import Form from "./Form";
import PageContents from "./PageContents";

// 2. Import all the contexts, wrap them around the components that need access to them
import { ThemeContext, LanguageContext } from "./Contexts";

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const [language, setLanguage] = React.useState("english");
  const updateLanguage = (event) => {
    const { value } = event.target;
    setLanguage(value);
  };
  return (
    <ThemeContext.Provider
      value={{ isDarkTheme: isDarkTheme, toggleTheme: toggleTheme }}
    >
      <LanguageContext.Provider value={{ language, updateLanguage }}>
        <PageContents>
          <Navbar />
          <Form />
        </PageContents>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
