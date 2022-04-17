import {
  Grid,
  Switch,
  TextField,
  Typography,
  SxProps,
  Box,
} from "@mui/material";
import { useState } from "react";

interface Recipe {
  text: string;
  tags: string[];
  portions: number;
}

const initText = `A young Polish noble, Tadeusz Soplica, comes back from his education in Vilnius to his family estate in Soplicowo. Tadeusz is an orphan raised by his uncle – Judge Soplica, younger brother of Tadeusz's long lost father, Jacek Soplica. Tadeusz is greeted by the Seneschal (Wojski), a family friend, who tells him about the trial between the Judge and Count Horeszko, for the ownership of a castle which once belonged to Pantler Horeszko – the Count's distant relative, a powerful aristocrat who was killed many years before. The trial is currently conducted by the Chamberlain (Podkomorzy), who is a friend and guest of the Judge. Tadeusz also meets Zosia – a young girl, granddaughter of the Pantler, who lives in the Judge's household, and her caretaker Telimena the Judge's cousin. Tadeusz takes an interest in Zosia, but also flirts with Telimena. `;
const initTitle = "Recipe";
const initSubtitle =
  "this is a very nice recipe with some sesame oil as well as a lot of honey";

const titleProps: SxProps = {
  fontSize: {
    xs: "1.8rem",
    sm: "2.7rem",
    md: "3.5rem",
  },
  fontWeight: 300,
  lineHeight: 1.4375,
  letterSpacing: 0.1,
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
  return (
    <Box
      sx={{
        mt: 4,
        mx: "auto",
        px: { md: 20, sm: 7, xs: 3 },
        maxWidth: { md: 1300, sm: 660, xs: 400 },
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid item xs={12} sx={sxCenter}>
          <Switch value={edit} onChange={(_, c) => setEdit(c)} />
        </Grid>
        <Grid item xs={12} sx={sxCenter}>
          <ToggledTextField
            edit={edit}
            value={title}
            onChange={setTitle}
            textProps={titleProps}
            small
          />
        </Grid>
        <Grid item xs={12} sx={sxCenter}>
          <ToggledTextField
            edit={edit}
            value={subtitle}
            onChange={setSubtitle}
            textProps={subtitleProps}
          />
        </Grid>
        <Grid item xs={12} sx={sxCenter}>
          <ToggledTextField
            edit={edit}
            value={text}
            onChange={setText}
            textProps={textProps}
          />
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
      inputProps={{ sx: { ...textProps, textAlign: "center" } }}
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
        textAlign: "center",
        overflowWrap: "break-word",
        minWidth: 0,
      }}
    >
      {value}
    </Typography>
  );
}
