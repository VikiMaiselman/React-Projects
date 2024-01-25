import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const StyledDialog = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export default function CreateFormDialog({ handleSave, allExistingPalettes }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const [paletteData, setPaletteData] = React.useState({
    paletteName: "",
    paletteEmoji: "",
  });

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenEmojiPicker(true);
  };

  const handleEmojiClose = () => {
    setOpenEmojiPicker(false);
    setOpenDialog(false);
  };

  const handlePaletteNameChange = (event) => {
    const { name, value } = event.target;
    setPaletteData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(paletteData);
    setPaletteData({
      paletteName: "",
      paletteEmoji: "",
    });
  };

  const updateEmoji = (event) => {
    setPaletteData((prevState) => ({
      ...prevState,
      paletteEmoji: event.native,
    }));
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isRequired", (value) => {
      return value !== "";
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (_) => {
      return allExistingPalettes.every(
        (existingPalette) =>
          existingPalette.paletteName.toLowerCase() !==
          paletteData.paletteName.toLowerCase()
      );
    });
  });

  return (
    <React.Fragment>
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
          open={openDialog}
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

          <ValidatorForm
            onSubmit={() => {
              handleClose();
            }}
            style={{ display: "flex" }}
          >
            <StyledDialog>
              <DialogContent>
                <DialogContentText>
                  Enter a name for your awesome palette. Make sure it is unique!
                </DialogContentText>

                <TextValidator
                  name="paletteName"
                  value={paletteData.paletteName}
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
                    setPaletteData({
                      paletteName: "",
                      paletteEmoji: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ height: "50%", alignSelf: "center" }}
                  disabled={paletteData.paletteName === "" ? true : false}
                >
                  Next
                </Button>
              </DialogActions>
            </StyledDialog>
          </ValidatorForm>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog open={openEmojiPicker} onClose={handleEmojiClose}>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "center", margin: "10px" }}
          >
            Choose a palette emoji!
          </DialogTitle>
          <DialogContent>
            <Picker data={data} onEmojiSelect={updateEmoji} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleEmojiClose();
                setPaletteData({
                  paletteName: "",
                  paletteEmoji: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ height: "50%", alignSelf: "center" }}
              disabled={paletteData.paletteName === "" ? true : false}
            >
              Save palette
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
}
