import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "20px 0px",
        width: '345px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 345,
            width: "100%"
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function CollectionCard({
    createdDate,
    imageUrl,
    largeImageUrl,
    bannerImageUrl,
    name,
    payOutAddress,
    description
}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {
                                bannerImageUrl ? <img src={bannerImageUrl} style={{ width: '100%', height: '100%' }}></img> : 'N/A'
                            }
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={createdDate}
                />
                <CardMedia
                    className={classes.media}
                    image={imageUrl ? imageUrl : ''}
                    title={name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {
                            description ? description : 'No description.'
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}