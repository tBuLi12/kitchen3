import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Collapse,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavList from "./Nav";
import theme from "./theme";

import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { useAuthState } from "react-firebase-hooks/auth";

initializeApp({
  apiKey: "AIzaSyC5_gE3yXN12n_R-VNY9XkSWqYTuV2EFAI",
  authDomain: "kitchen3-f2e3d.firebaseapp.com",
  projectId: "kitchen3-f2e3d",
  storageBucket: "kitchen3-f2e3d.appspot.com",
  messagingSenderId: "497385755131",
  appId: "1:497385755131:web:f86e4379f494baad5abb5e",
  measurementId: "G-V257HBNFVZ",
});
export const auth = getAuth();
getRedirectResult(auth);
export const db = getFirestore();
export const storage = getStorage();

function App() {
  const [open, setOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              color="inherit"
              sx={{ mr: 4 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Kitchen
            </Typography>
            {/* <CountertopsOutlined fontSize="large" sx={{mr: 2, flexGrow: 1}}/> */}
            {loading ? (
              "loading"
            ) : user ? (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => signOut(auth)}
              >
                Sign out
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Box sx={{ borderRight: 1, borderColor: "divider" }}>
            <Collapse in={open} orientation="horizontal" collapsedSize={55}>
              <NavList loggedIn={user as any} />
            </Collapse>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: (theme) => theme.palette.grey[100],
              minWidth: 0,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
