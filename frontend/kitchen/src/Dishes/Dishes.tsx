import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import { User } from "firebase/auth";
import {
  query,
  orderBy,
  collection,
  DocumentData,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { useCallback, useMemo, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../App";
import { Loading } from "../utils";

import DishCard, { ImageUrl } from "./DishCard";
import DishEditor, { EditorHandle } from "./DishEditor";

export const imageUploads: Partial<{
  [key: string]: null | ((url: string | null) => void);
}> = {};

export default function Dishes({ user }: { user: User }) {
  const collRef = useMemo(
    () => collection(db, "users", user.uid, "dishes"),
    [user]
  );
  const [dishCollection, loading, error] = useCollection(
    query(collRef, orderBy("lastMade"))
  );
  const editorRef = useRef<undefined | EditorHandle>();
  if (loading) return <Loading />;
  if (error) return <Typography>{error.message}</Typography>;
  if (!dishCollection) return <Typography>Collection error</Typography>;
  return (
    <Container sx={{ mt: 4, maxWidth: { lg: 950, md: 750, sm: 550, xs: 300 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={() => editorRef.current?.addNew()}
          >
            add dish
          </Button>
        </Grid>
        {dishCollection.docs.map((dishDoc, i) => (
          <DishCard
            key={dishDoc.id}
            doc={dishDoc}
            editorHandleRef={editorRef}
            user={user}
          />
        ))}
      </Grid>
      <DishEditor ref={editorRef} dishCollRef={collRef} />
    </Container>
  ); /*style={{transitionDelay: `${i*50}ms`}}*/
}
