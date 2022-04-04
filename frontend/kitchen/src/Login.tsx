import { LockOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Container, Grid, Icon, TextField, Typography, Link, Box, CircularProgress } from "@mui/material";

import { signInWithRedirect, GoogleAuthProvider, User } from 'firebase/auth'
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./App";
import { Loading } from "./utils";

const authProvider = new GoogleAuthProvider();

export default function LoginForm() {
    return (
        // <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10}}>
            <Container maxWidth="xs">
                <Card  sx={{mt: 10, p: 2}}>
                    <CardHeader title="Log in to your account" subheader={<>or <Link onClick={() => signInWithRedirect(auth, authProvider)}>log in with google</Link></>} sx={{textAlign: 'center'}}/>
                    <CardContent>
                        <Grid container columns={4} spacing={3}>
                            <Grid item xs={4}><TextField type="text" fullWidth label="login"/></Grid>
                            <Grid item xs={4}><TextField type="password" fullWidth label="password"/></Grid>
                            <Grid item xs={4}><Link>forgot password?</Link></Grid>
                            <Grid item xs={2}><Button variant="contained">Log in</Button></Grid>
                            <Grid item xs={2} textAlign="right"><Button variant="text">Sign up</Button></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        // {/* </Box> */}
    )
}

// export function useRequireLogin(): [User | null, JSX.Element | null] {
//     const redirected = useRef(false);
//     const [user, loading] = useAuthState(auth);
//     const navigate = useNavigate();
//     if (loading) {
//         return [null, <div>Loading</div>];
//     }
//     if (user == null) {
//         if (!redirected.current) {
//             redirected.current = true;
//             navigate('/login');
//         }
//         return [null, <></>];
//     }
//     return [user, null];
// }

export function WithUser({ children }: {children: (user: User) => JSX.Element}) {
    const redirected = useRef(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    if (loading) return <Loading/>;
    if (user == null) {
        if (!redirected.current) {
            redirected.current = true;
            navigate('/login');
        }
        return <></>;
    }
    return children(user);
}