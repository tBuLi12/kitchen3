import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Online kitchen
      </Typography>
      <br />
      <Typography variant="h5" color="text.secondary">
        Recipes, shopping list, prep day tracking - all in one place
      </Typography>
      <Container maxWidth="xs">
        <Grid container columns={2} spacing={5} sx={{ mt: 5 }}>
          <Grid item xs={2}>
            <Button variant="outlined" fullWidth>
              Browse public recipes
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" fullWidth>
              Log in
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="text" fullWidth>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
