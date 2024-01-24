import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { ChromePicker } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import chroma from "chroma-js";

const StyledChromePicker = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "15px 0 5px 0",
  "& .chrome-picker": {
    width: "80% !important",
  },
});

const StyledInput = styled("div")({
  "& .MuiInputBase-root": {
    height: "40px",
  },
});

export default function ColorPickerForm({ addColor, palette }) {
  const [colorPicked, setColorPicked] = React.useState({
    color: "#00008b",
    name: "Darkblue",
  });

  const isLightColor = chroma(colorPicked.color).luminance() <= 0.5;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setColorPicked({ ...colorPicked, [name]: value });
  };

  const handleAddColor = (event) => {
    event.preventDefault();
    addColor(colorPicked);
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isNameUnique", (value) => {
      return palette.colors.every(
        (col) => col.name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (_) => {
      return palette.colors.every((col) => col.color !== colorPicked.color);
    });
  });

  return (
    <>
      <StyledChromePicker>
        <ChromePicker
          color={colorPicked.color}
          onChangeComplete={(newPickedColor) => {
            setColorPicked({ color: newPickedColor.hex, name: "" });
          }}
        />
      </StyledChromePicker>
      <ValidatorForm onSubmit={handleAddColor} style={{ height: "100px" }}>
        <StyledInput>
          <TextValidator
            name="name"
            value={colorPicked.name}
            onChange={handleChange}
            validators={["required", "isNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is required",
              "The name should be unique",
              "The color should be unique",
            ]}
            style={{
              padding: "10px",
              marginBottom: "0px",
            }}
          />
        </StyledInput>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: colorPicked.color,
            color: isLightColor ? "white" : "black",
            "&:hover": {
              backgroundColor: colorPicked.color,
            },
          }}
          type="submit"
        >
          Add Color
        </Button>
      </ValidatorForm>
    </>
  );
}
