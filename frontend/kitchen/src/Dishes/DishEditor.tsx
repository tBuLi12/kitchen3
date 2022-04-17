import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  TextField,
  Box,
  Divider,
  Stack,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  doc,
  DocumentData,
  DocumentReference,
  CollectionReference,
  serverTimestamp,
  setDoc,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { storage } from "../App";

import { Dish, ImageUrl, NoImage } from "./DishCard";
import { imageUploads } from "./Dishes";

interface DishMeta {
  doc: DocumentReference<DocumentData>;
  imgUrl: ImageUrl;
  updateUrl: (url?: string | null) => void;
}

export interface EditorHandle {
  edit(
    dish: Dish,
    dishDoc: DocumentReference<DocumentData>,
    imgUrl: ImageUrl,
    updateUrl: (url?: string | null) => void
  ): void;
  addNew(): void;
}

// export type AddOrEdit  = {dishDocInfo: DishDocInfo, updateDish: () => void} | {addDish: () => void};
// type DishEditorProps = {
//     opened: boolean,
//     close: () => void,
// } & AddOrEdit
const imgsRef = storageRef(storage, "dishesImages");
const imgSize = 140;

export default forwardRef(function DishEditor(
  { dishCollRef }: { dishCollRef: CollectionReference<DocumentData> },
  ref
) {
  const [open, setOpen] = useState(false);
  const [dishMeta, setDishMeta] = useState<DishMeta | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [lastMade, setLastMade] = useState<Date | null>(null);
  const handle: EditorHandle = {
    addNew() {
      setOpen(true);
      setName("");
      setLastMade(null);
      setDishMeta(null);
      setImage(null);
    },
    edit(dish, dishDoc, imgUrl, updateUrl) {
      setOpen(true);
      setName(dish.name);
      setLastMade(dish.lastMade.toDate());
      setDishMeta({ doc: dishDoc, imgUrl, updateUrl });
      setImage(null);
    },
  };
  useImperativeHandle(ref, () => handle, []);
  const saveDish = function () {
    const newDishDoc = dishMeta?.doc ?? doc(dishCollRef);
    setOpen(false);
    const dish: WithFieldValue<Dish> = {
      name,
      lastMade: lastMade ? Timestamp.fromDate(lastMade) : serverTimestamp(),
    };
    setDoc(newDishDoc, dish);
    if (image) {
      dishMeta?.updateUrl();
      imageUploads[newDishDoc.id] = null;
      const imgRef = storageRef(imgsRef, newDishDoc.id);
      uploadBytes(imgRef, image)
        .then(() => getDownloadURL(imgRef))
        .then(
          (url) => {
            dishMeta?.updateUrl(url);
            imageUploads[newDishDoc.id]?.(url);
            delete imageUploads[newDishDoc.id];
          },
          () => {
            dishMeta?.updateUrl(null);
            imageUploads[newDishDoc.id]?.(null);
          }
        );
    }
  };
  const imgUrl = image ? URL.createObjectURL(image) : dishMeta?.imgUrl;
  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), saveDish())}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        {dishMeta ? "Edit dish" : "Add a new dish"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="dish name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="last made"
              onChange={setLastMade}
              value={lastMade}
              renderInput={(props) => (
                <TextField helperText="defaults to Today" {...props} />
              )}
            />
          </LocalizationProvider>
          <Divider />
          <Typography variant="overline" sx={{ textAlign: "center" }}>
            Image
          </Typography>
          <input
            id="file-upload-input"
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                width: imgSize,
                height: imgSize,
                border: 1,
                borderColor: (theme) => theme.palette.grey[300],
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {typeof imgUrl === "string" ? (
                <img
                  width={imgSize}
                  height={imgSize}
                  src={imgUrl}
                  style={{ borderRadius: 5 }}
                />
              ) : (
                <NoImage />
              )}
            </Box>
            <label htmlFor="file-upload-input">
              <Button component="span" variant="outlined">
                {typeof imgUrl === "string" ? "change" : "upload"}
              </Button>
            </label>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => setOpen(false)}>
          cancel
        </Button>
        <Button variant="contained" onClick={saveDish}>
          {dishMeta ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
