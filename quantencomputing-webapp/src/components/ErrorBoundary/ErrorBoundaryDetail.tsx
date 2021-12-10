import React, { ErrorInfo } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";

interface ErrorBoundaryDetailProps {
  raw?: Error;
  info?: ErrorInfo;
  reload: () => void;
}

export default function ErrorBoundaryDetail({
  raw,
  info,
  reload,
}: ErrorBoundaryDetailProps) {
  return (
    <>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 64,
        }}
      >
        <Typography variant="h4">Something went wrong</Typography>
        <Typography style={{ marginTop: 16 }}>
          An error has occurred. A report has been created and sent to our team.
        </Typography>
        <Button
          data-testid="reload-app-button"
          style={{ marginTop: 32, marginBottom: 64 }}
          startIcon={<Refresh />}
          onClick={reload}
        >
          Reload Webapp
        </Button>
      </Container>
    </>
  );
}
