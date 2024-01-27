import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { LanguageContext } from "./Contexts";

export default function Form() {
  const { language, updateLanguage } = React.useContext(LanguageContext);

  const data = {
    english: {
      signIn: "Sign In",
      email: "Email address",
      password: "Password",
      rememberMe: "Remember Me",
    },
    spanish: {
      signIn: "Iniciar sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      rememberMe: "Recordarme",
    },
    hebrew: {
      signIn: "כניסה",
      email: "דוא״ל",
      password: "סיסמה",
      rememberMe: "זכור אותי",
    },
  };

  return (
    <Box sx={{ width: { xs: "100%", sm: "50%" }, margin: "15px auto" }}>
      <Paper
        sx={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h5" fullWidth>
          {data[language].signIn}
        </Typography>

        <Select
          labelId="language-label"
          id="language"
          value={language}
          label="language"
          onChange={updateLanguage}
        >
          <MenuItem value={"english"}>English</MenuItem>
          <MenuItem value={"hebrew"}>Hebrew</MenuItem>
          <MenuItem value={"spanish"}>Spanish</MenuItem>
        </Select>

        <FormControl>
          <InputLabel htmlFor="email">{data[language].email}</InputLabel>
          <Input id="email" aria-describedby="email" />
          <FormHelperText id="email">
            We'll never share your email.
          </FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="password">{data[language].password}</InputLabel>
          <Input id="password" aria-describedby="password" />
        </FormControl>

        <FormControlLabel
          control={<Checkbox />}
          label={`${data[language].rememberMe}`}
        />

        <Button fullWidth variant="contained">
          {data[language].signIn}
        </Button>
      </Paper>
    </Box>
  );
}
