import {Alert} from "@mui/joy";
import {Warning} from "@mui/icons-material";

export default function ErrorAlert({text}) {
  return (
    <Alert
      startDecorator={<Warning />}
      variant="outlined"
      color="danger"
    >
      {text}
    </Alert>
  );
}