import { Button, Card, CardActions, CardHeader, Grid, IconButton, CardMedia, Box, Typography, CircularProgress, Menu, MenuItem, Grow } from '@mui/material';
import { MoreVertRounded, SoupKitchenOutlined } from "@mui/icons-material";
import { deleteDoc, DocumentData, DocumentSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage'
import { FirebaseError } from 'firebase/app';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { storage } from '../App';
import { imageUploads } from './Dishes';
import { ImageUrl, NoImage } from '../Dishes/DishCard';
import { User } from 'firebase/auth';

export interface RecipeHeader {
    name: string,
    decription: string,
    tags: string[]
}

export default function RecipeCard({ doc, user }: { doc: DocumentSnapshot<DocumentData>, user: User }) {
    const [url, setUrl] = useState<ImageUrl>();
    const imgRef = ref(storage, `dishesImages/${user.uid}/${doc.id}`);
    useEffect(function() {
        if(doc.id in imageUploads) {
            imageUploads[doc.id] = setUrl;
        } else {
            getDownloadURL(imgRef).then(
                setUrl,
                error => setUrl(error.code === 'storage/object-not-found' ? null : error)
            )
        }
    }, []);
    const recipeHeader: RecipeHeader = doc.data() as RecipeHeader;
    return (
        <Grid item xs={12} sm={6} lg={3} md={4}>
            <Card>
                <RecipeCardHeader dish={dish} menuActions={[]}/>
                <RecipePicture url={url}/>
                <CardActions>
                    <Button variant="outlined" onClick={() => updateDoc(doc.ref, {lastMade: serverTimestamp()})}>Done</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

function RecipeCardHeader({ menuActions, recipeHeader }: {menuActions: {name: string, action: () => void}[], recipeHeader: RecipeHeader}) {
    const MenuButtonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenu] = useState(false);
    return (
        <>
            <Menu anchorEl={MenuButtonRef.current} open={menuOpen} onClose={() => setMenu(false)}>
                {menuActions.map(({action, name}, i) => <MenuItem key={i} onClick={() => (setMenu(false), action())}>{name}</MenuItem>)}
            </Menu>
            <CardHeader title={recipeHeader.name} titleTypographyProps={{variant: 'subtitle1'}} subheader={'getDateStr(dish.lastMade)'} action={
                <IconButton ref={MenuButtonRef} onClick={() => setMenu(true)}>
                    <MoreVertRounded/>
                </IconButton>
            } sx={{p: 2, pl: 3}}/>
        </>
    )
}

const imgHeight = '130px';
function RecipePicture({ url }: {url: string | null | undefined | FirebaseError}) {
    if (typeof url === 'string') {
        return <CardMedia src={url} component='img' height={imgHeight}/>;
    }
    return (
        <Box sx={{height: imgHeight, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            {url ? <Typography variant="caption" color={theme => theme.palette.grey[400]}>{url.message}</Typography> :
                url === undefined ? <CircularProgress/> : <NoImage/>
            }
        </Box>
    )
}