import { Grid, Switch, TextField, Typography } from "@mui/material";
import { useState, CSSProperties } from "react";

interface Recipe {
  text: string;
  tags: string[];
  portions: number;
}

const initText = `A young Polish noble, Tadeusz Soplica, comes back from his education in Vilnius to his family estate in Soplicowo. Tadeusz is an orphan raised by his uncle – Judge Soplica, younger brother of Tadeusz's long lost father, Jacek Soplica. Tadeusz is greeted by the Seneschal (Wojski), a family friend, who tells him about the trial between the Judge and Count Horeszko, for the ownership of a castle which once belonged to Pantler Horeszko – the Count's distant relative, a powerful aristocrat who was killed many years before. The trial is currently conducted by the Chamberlain (Podkomorzy), who is a friend and guest of the Judge. Tadeusz also meets Zosia – a young girl, granddaughter of the Pantler, who lives in the Judge's household, and her caretaker Telimena the Judge's cousin. Tadeusz takes an interest in Zosia, but also flirts with Telimena. `;
const initTitle = "Recipe";
const subtitle =
  "this is a very nice recipe with some sesame oil as well as a lot of honey";

const titleProps: CSSProperties = { fontSize: "3.5rem", fontWeight: 300 };

export default function RecipeEditor() {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(initTitle);
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState(initText);
  return (
    <Grid container>
      <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
        <Switch value={edit} onChange={(_, c) => setEdit(c)} />
      </Grid>
      <Grid item xs={12}>
        <ToggledTextField
          edit={edit}
          value={title}
          onChange={setTitle}
          textProps={titleProps}
          small
        />
      </Grid>
    </Grid>
  );
}

interface ToggledTextFieldProps {
  value: string;
  onChange: (newVal: string) => void;
  small?: boolean;
  textProps: CSSProperties;
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
      inputProps={{ style: { ...textProps, textAlign: "center" } }}
      size={small ? "small" : "medium"}
      fullWidth
      sx={{ margin: "auto", maxWidth: 0.6 }}
    />
  ) : (
    <Typography
      component="div"
      sx={{
        ...titleProps,
        mx: "14px",
        my: small ? "8.5px" : "16.5px",
        textAlign: "center",
      }}
    >
      {value}
    </Typography>
  );
}
