import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { styled } from "@mui/system";

const StyledDialog = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  //   alignItems: "center",
});

export default function CreateFormDialog({ handleSave, allExistingPalettes }) {
  const [open, setOpen] = React.useState(false);
  const [paletteName, setPaletteName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePaletteNameChange = (event) => {
    const { value } = event.target;
    setPaletteName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(paletteName);
    setPaletteName("");
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isRequired", (value) => {
      return value !== "";
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (_) => {
      return allExistingPalettes.every(
        (existingPalette) =>
          existingPalette.paletteName.toLowerCase() !==
          paletteName.toLowerCase()
      );
    });
  });

  return (
    <React.Fragment>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ height: "50%", alignSelf: "center" }}
        onClick={handleClickOpen}
      >
        Save palette
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "div",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle
          sx={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          Choose a palette name!
        </DialogTitle>

        <ValidatorForm onSubmit={handleSubmit} style={{ display: "flex" }}>
          <StyledDialog>
            <DialogContent>
              <DialogContentText>
                Enter a name for your awesome palette. Make sure it is unique!
              </DialogContentText>

              <TextValidator
                name="paletteName"
                value={paletteName}
                onChange={handlePaletteNameChange}
                validators={["isRequired", "isPaletteNameUnique"]}
                errorMessages={[
                  "enter palette name",
                  "this palette name was already used",
                ]}
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  setPaletteName("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ height: "50%", alignSelf: "center" }}
                disabled={paletteName === "" ? true : false}
              >
                Save palette
              </Button>
            </DialogActions>
          </StyledDialog>
        </ValidatorForm>
      </Dialog>
    </React.Fragment>
  );
}
