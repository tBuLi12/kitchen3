import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  IconButton,
  CardMedia,
  Box,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  Grow,
} from "@mui/material";
import { MoreVertRounded, SoupKitchenOutlined } from "@mui/icons-material";
import {
  deleteDoc,
  DocumentData,
  DocumentSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { storage } from "../App";
import { EditorHandle } from "./DishEditor";
import { imageUploads } from "./Dishes";
import { User } from "firebase/auth";

export type ImageUrl = string | null | undefined | FirebaseError;
export interface Dish {
  name: string;
  lastMade: Timestamp;
}

export default function DishCard({
  doc,
  editorHandleRef,
  user,
}: {
  doc: DocumentSnapshot<DocumentData>;
  editorHandleRef: MutableRefObject<EditorHandle | undefined>;
  user: User;
}) {
  const [url, setUrl] = useState<ImageUrl>();
  const imgRef = ref(storage, `dishesImages/${user.uid}/${doc.id}`);
  useEffect(function () {
    if (doc.id in imageUploads) {
      imageUploads[doc.id] = setUrl;
    } else {
      getDownloadURL(imgRef).then(setUrl, (error) =>
        setUrl(error.code === "storage/object-not-found" ? null : error)
      );
    }
  }, []);
  const dish: Dish = doc.data({ serverTimestamps: "estimate" }) as Dish;
  return (
    <Grid item xs={12} sm={6} lg={3} md={4}>
      <Card>
        <DishCardHeader
          dish={dish}
          menuActions={[
            {
              name: "Edit",
              action: () =>
                editorHandleRef.current?.edit(dish, doc.ref, url, setUrl),
            },
            {
              name: "Delete",
              action: () => (deleteDoc(doc.ref), deleteObject(imgRef)),
            },
          ]}
        />
        <DishPicture url={url} />
        <CardActions>
          <Button
            variant="outlined"
            onClick={() => updateDoc(doc.ref, { lastMade: serverTimestamp() })}
          >
            Done
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export function NoImage() {
  return (
    <>
      <SoupKitchenOutlined fontSize="large" color="disabled" />
      <Typography variant="caption" color={(theme) => theme.palette.grey[400]}>
        no image
      </Typography>
    </>
  );
}

function DishCardHeader({
  menuActions,
  dish,
}: {
  menuActions: { name: string; action: () => void }[];
  dish: Dish;
}) {
  const MenuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenu] = useState(false);
  return (
    <>
      <Menu
        anchorEl={MenuButtonRef.current}
        open={menuOpen}
        onClose={() => setMenu(false)}
      >
        {menuActions.map(({ action, name }, i) => (
          <MenuItem key={i} onClick={() => (setMenu(false), action())}>
            {name}
          </MenuItem>
        ))}
      </Menu>
      <CardHeader
        title={dish.name}
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={getDateStr(dish.lastMade)}
        action={
          <IconButton ref={MenuButtonRef} onClick={() => setMenu(true)}>
            <MoreVertRounded />
          </IconButton>
        }
        sx={{ p: 2, pl: 3 }}
      />
    </>
  );
}

const imgHeight = "130px";
function DishPicture({
  url,
}: {
  url: string | null | undefined | FirebaseError;
}) {
  if (typeof url === "string") {
    return <CardMedia src={url} component="img" height={imgHeight} />;
  }
  return (
    <Box
      sx={{
        height: imgHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {url ? (
        <Typography
          variant="caption"
          color={(theme) => theme.palette.grey[400]}
        >
          {url.message}
        </Typography>
      ) : url === undefined ? (
        <CircularProgress />
      ) : (
        <NoImage />
      )}
    </Box>
  );
}

function sameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function getDateStr(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  const cmp = new Date();
  if (sameDay(cmp, date)) {
    return "Today";
  }
  cmp.setDate(cmp.getDate() - 1);
  if (sameDay(cmp, date)) {
    return "Yesterday";
  }
  cmp.setDate(cmp.getDate() - 6);
  if (date > cmp && date < new Date()) {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
    });
  }
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
