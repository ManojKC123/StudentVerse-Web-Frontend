import React from "react";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp(notify) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
    console.log("var", variant);
  };

  return (
    <React.Fragment>
      <div onClick={handleClickVariant("success")}></div>
    </React.Fragment>
  );
}

export default function Notification(props) {
  const snackText = props.notify;
  console.log("comment", snackText);

  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
