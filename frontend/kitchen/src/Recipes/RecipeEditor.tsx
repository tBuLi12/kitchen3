import { Add } from "@mui/icons-material";
import {
  Grid,
  Switch,
  TextField,
  Typography,
  SxProps,
  Box,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  useMediaQuery,
  Popover,
  TableBody,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { RefObject, useEffect, useRef, useState } from "react";

interface Recipe {
  text: string;
  notes: string;
  tags: string[];
  portions: number;
}

interface Ingredient {
  name: string;
  unit?: string;
  quantity: number;
}

type Binding<T> = [T, (newVal: T | ((oldVal: T) => T)) => void];

const initText = `A young Polish noble, Tadeusz Soplica, comes back from his education in Vilnius to his family estate in Soplicowo. Tadeusz is an orphan raised by his uncle – Judge Soplica, younger brother of Tadeusz's long lost father, Jacek Soplica. Tadeusz is greeted by the Seneschal (Wojski), a family friend, who tells him about the trial between the Judge and Count Horeszko, for the ownership of a castle which once belonged to Pantler Horeszko – the Count's distant relative, a powerful aristocrat who was killed many years before. The trial is currently conducted by the Chamberlain (Podkomorzy), who is a friend and guest of the Judge. Tadeusz also meets Zosia – a young girl, granddaughter of the Pantler, who lives in the Judge's household, and her caretaker Telimena the Judge's cousin. Tadeusz takes an interest in Zosia, but also flirts with Telimena. `;
const initTitle = "Recipe";
const initSubtitle =
  "this is a very nice recipe with some sesame oil as well as a lot of honey";
const initTags = ["dinner", "fast", "cheap"];
const initPortionSize = 4;
const initIngrediens: Ingredient[] = [
  { name: "śmietatdnfdn dnfdfndfndfndfna", quantity: 2, unit: "tbsp" },
  { name: "cukier", quantity: 3, unit: "tsp" },
];
const initNotes = "some notes";
const imgUrl =
  "https://firebasestorage.googleapis.com/v0/b/kitchen3-f2e3d.appspot.com/o/spag.jpg?alt=media&token=73450192-c7e4-4a7b-bb46-384edfedb34f";

initIngrediens.push(
  { name: "śmietdn dnfdfndfndfndfna", quantity: 2, unit: "tbsp" },
  { name: "cukierr", quantity: 3, unit: "tsp" },
  { name: "cukerr", quantity: 3, unit: "tsp" },
  { name: "cukir", quantity: 3, unit: "tsp" },
  { name: "ierr", quantity: 3, unit: "tsp" },
  { name: "cudkierr", quantity: 3, unit: "tsp" },
  { name: "cukasdierr", quantity: 3, unit: "tsp" },
  { name: "cukiertgr", quantity: 3, unit: "tsp" },
  { name: "cukiertgrsdf", quantity: 3, unit: "tsp" },
  { name: "cukiertgrbfd", quantity: 3, unit: "tsp" },
  { name: "cukiertgrjh", quantity: 3, unit: "tsp" },
  { name: "cot", quantity: 3, unit: "tsp" },
  { name: "cukiertgrot", quantity: 3, unit: "tsp" },
  { name: "cut", quantity: 3, unit: "tsp" },
  { name: "tgrot", quantity: 3, unit: "tsp" }
);

const titleProps: SxProps = {
  fontSize: {
    xs: "1.8rem",
    sm: "2.7rem",
    md: "3.5rem",
  },
  fontWeight: 300,
  lineHeight: 1.4375,
  letterSpacing: 0.1,
  textAlign: "center",
};
const subtitleProps: SxProps = {
  fontSize: {
    xs: "1.25rem",
    sm: "1.4rem",
    md: "1.7rem",
  },
  fontWeight: 400,
  lineHeight: 1.15,
  letterSpacing: 0.1,
  textAlign: "center",
};
const textProps: SxProps = {
  fontSize: {
    xs: "1rem",
    sm: "1.1rem",
    md: "1.3rem",
  },
  fontWeight: 400,
  lineHeight: 1.14,
  letterSpacing: 0.1,
};

const sxCenter: SxProps = { justifyContent: "center", display: "flex" };

export default function RecipeEditor() {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(initTitle);
  const [subtitle, setSubtitle] = useState(initSubtitle);
  const [text, setText] = useState(initText);
  const [tags, setTags] = useState(initTags);
  const [portionSize, setPortionSize] = useState(initPortionSize);
  const [ingredients, setIngredients] = useState(initIngrediens);

  const tagsAndIngredients = (
    <>
      <Tags tagsBind={[tags, setTags]} edit={edit} />
      <Ingredients
        ingredientsBind={[ingredients, setIngredients]}
        edit={edit}
        portionBind={[portionSize, setPortionSize]}
      />
    </>
  );

  return (
    <Box
      sx={{
        mt: 4,
        mx: "auto",
        px: { md: 20, sm: 7, xs: 3 },
        maxWidth: { md: 1400, sm: 660, xs: 400 },
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid item xs={12} sx={sxCenter}>
          <Switch value={edit} onChange={(_, c) => setEdit(c)} />
        </Grid>
        <Grid item md={8} sx={sxCenter}>
          <Card>
            <CardContent>
              <ToggledTextField
                edit={edit}
                value={title}
                onChange={setTitle}
                textProps={titleProps}
                small
              />
              <ToggledTextField
                edit={edit}
                value={subtitle}
                onChange={setSubtitle}
                textProps={subtitleProps}
              />
            </CardContent>
            <CardMedia src={imgUrl} component="img" height={600} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: 2,
              height: 0.99,
              overflow: "hidden",
            }}
          >
            {tagsAndIngredients}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <CardContent>
              <Typography textAlign="center" pt={3} sx={subtitleProps}>
                Instructions
              </Typography>
              <ToggledTextField
                edit={edit}
                value={text}
                onChange={setText}
                textProps={textProps}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

interface ToggledTextFieldProps {
  value: string;
  onChange: (newVal: string) => void;
  small?: boolean;
  textProps: SxProps;
  edit: boolean;
}

function ToggledTextField({
  value,
  onChange,
  small,
  textProps,
  edit,
}: ToggledTextFieldProps) {
  return edit ? (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ sx: { ...textProps } }}
      size={small ? "small" : "medium"}
      fullWidth
      multiline
      sx={{ margin: "auto" }}
    />
  ) : (
    <Typography
      component="div"
      sx={{
        ...textProps,
        px: "14px",
        py: small ? "8.5px" : "16.5px",
        overflowWrap: "break-word",
        minWidth: 0,
      }}
    >
      {value}
    </Typography>
  );
}

function Tags({
  tagsBind: [tags, setTags],
  edit,
}: {
  tagsBind: Binding<string[]>;
  edit: boolean;
}) {
  const addRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");

  function addTag(tag: string) {
    if (!tags.includes(tag) && newName) {
      setTags((ts) => [...ts, newName]);
      setNewName("");
      setOpen(false);
    }
  }

  return (
    <>
      <Typography pt={1} pl={4}>
        Tags:
      </Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {tags.length ? (
          tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{ m: 1 }}
              onDelete={
                edit
                  ? () => setTags((ts) => ts.filter((t) => t != tag))
                  : undefined
              }
            />
          ))
        ) : (
          <Typography
            variant="overline"
            color={(theme) => theme.palette.grey[600]}
            sx={{ display: "flex", alignItems: "center", px: 2 }}
          >
            No tags
          </Typography>
        )}
        {edit && (
          <Chip
            ref={addRef}
            icon={<Add />}
            sx={{ m: 1 }}
            onClick={() => setOpen(true)}
            label="Add"
          />
        )}
        <Popover
          anchorEl={addRef.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={() => setOpen(false)}
          onKeyDown={(e) => e.key == "Enter" && addTag(newName)}
          disableRestoreFocus
        >
          <TextField
            value={newName}
            inputRef={(elem) => elem?.focus()}
            onChange={(e) => setNewName(e.target.value)}
            label="tag name"
            sx={{ m: 2 }}
          />
          <Button onClick={() => addTag(newName)} sx={{ m: 2, ml: 0 }}>
            Add
          </Button>
        </Popover>
      </Box>
    </>
  );
}

function Ingredients({
  ingredientsBind: [ingredients, setIngredients],
  portionBind: [portionSize, setPortionSize],
  edit,
}: {
  ingredientsBind: Binding<Ingredient[]>;
  portionBind: Binding<number>;
  edit: boolean;
}) {
  const xsSize = useMediaQuery("(max-width:440px)");
  const portionButtonWidth = xsSize ? 28 : 35;
  const portionSizeElem = (
    <>
      serves:
      <Button
        variant="contained"
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          mr: "-1px",
          ml: 3,
          minWidth: 0,
          width: portionButtonWidth,
          p: 0,
        }}
        onClick={() => setPortionSize((s) => s - 1)}
      >
        -
      </Button>
      <TextField
        sx={{
          "& fieldset": { borderRadius: 0 },
          "& div": { height: 1 },
          minWidth: 38,
        }}
        inputProps={{
          style: {
            textAlign: "center",
            fontSize: xsSize ? "1rem" : "1.3rem",
            width: xsSize ? 10 : 15,
          },
        }}
        value={portionSize}
      />
      <Button
        variant="contained"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          mr: "-1px",
          minWidth: 0,
          width: portionButtonWidth,
          p: 0,
        }}
        onClick={() => setPortionSize((s) => s + 1)}
      >
        +
      </Button>
    </>
  );
  const portionHeight = xsSize ? 30 : 40;
  return (
    <>
      {xsSize && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > *": { height: portionHeight },
            fontWeight: 500,
            fontSize: 15,
            m: 3,
          }}
        >
          {portionSizeElem}
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > *": { height: portionHeight },
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  Ingredients
                </span>
                {xsSize ? "\u00A0" : portionSizeElem}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((ing) => (
            <TableRow key={ing.name}>
              <TableCell>{ing.name}</TableCell>
              <TableCell align="right">
                {ing.quantity} {ing.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
