import { Button } from "@mui/material";
import "./NotFound.styles.css";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>Not Found</h1>
      <br />
      <Button variant="contained" color="primary" href="/">
        Go back to Home
      </Button>
    </div>
  );
}
