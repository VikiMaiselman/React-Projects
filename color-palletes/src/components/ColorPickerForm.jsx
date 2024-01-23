import { Button } from "@mui/material";
import React from "react";
import { ChromePicker } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

export default function ColorPickerForm({ addColor, palette }) {
  const [colorPicked, setColorPicked] = React.useState({
    color: "#00008b",
    name: "Darkblue",
  });

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
      <div>
        <ChromePicker
          color={colorPicked.color}
          onChangeComplete={(newPickedColor) => {
            setColorPicked({ color: newPickedColor.hex, name: "" });
          }}
        />
      </div>
      <ValidatorForm onSubmit={handleAddColor} style={{ height: "100px" }}>
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
          style={{ padding: "10px", marginBottom: "0px" }}
        />
        <Button
          variant="outlined"
          sx={{ color: colorPicked.color, borderColor: colorPicked.color }}
          type="submit"
        >
          Add Color
        </Button>
      </ValidatorForm>
    </>
  );
}
