import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useState } from "react";
import { Stack } from "@mui/system";
import { pink } from "@mui/material/colors";

export default function Dropdown({
  handleOrderProcessingForm,
  index,
  type,
  Name,
  data,
  width,
  id,
  error,
  helperText,
}) {
  const handleDropDown = (value, type) => {
    if (type === "select_state") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }

    if (type === "select_city") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_aboutUs") {
      console.log(value);
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_gender") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_grade") {
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_gradeCategory") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_sales") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }
    if (type === "select_slotTime") {
      console.log(value, type);
      handleOrderProcessingForm(value, type);
    }
  };
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => {
      switch (Name) {
        case "select_state":
          return option.state;
          break;
        case "select_grade":
          return option.grade.toString();
          break;
        case "select_city":
          return option.city;
          break;
        case "select_aboutUs":
          return option;
          break;
        case "select_gender":
          return option;
          break;
        case "select_gradeCategory":
          return option.name;
          break;
        case "select_grade":
          return option.name;
          break;
        case "select_sales":
          if (!option.middle_name) {
            return option.first_name + " " + option.last_name;
          } else {
            return (
              option.first_name +
              " " +
              option.middle_name +
              " " +
              option.last_name
            );
          }

          break;
        case "select_slotTime":
          return option;
      }
    },
  };

  return (
    <Stack spacing={1}>
      <Autocomplete
        {...defaultProps}
        id="disable-clearable"
        disableClearable
        onChange={(event, value, index) => handleDropDown(value, Name)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            sx={{ width: "10rem" }}
            size="small"
            // size={id === "time" ? "small" : "medium"}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </Stack>
  );
}
