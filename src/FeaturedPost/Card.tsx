import React  from "react";
import {Badge, Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";




const useStyles = makeStyles((theme) => ({
        MuiCardContent: {
            textDecoration: "none",
            color: "black",
            width: 160,
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: 160
        },
        card: {
            display: 'flex',

        },
        cardDetails: {
            flex: 1,
        },
        cardMedia: {
            width: 160,
            marginLeft: "auto",
            order: 2,
            height: 200

        },
        mainFeaturedPost: {
            position: 'relative',
            backgroundColor: theme.palette.grey[800],
            color: theme.palette.common.white,

            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
    hearthWhite: {
        color: "white",
        marginTop: 15
    },
    hearthDark:{
        color: "black",
        marginTop: 15
    }

    }))
;

let CastomCard:React.FC<any> = ( props) => {
    const classes = useStyles()

  return  <Grid style={{
        margin: 5,
        width: "90%"
    }}  item md={5}>
        <Link to={"/news/" + props.id} className={classes.MuiCardContent}>
            <CardActionArea component="div">
                <Card className={classes.card}>
                    <CardContent className={classes.MuiCardContent}>

                        <Typography component="h2" variant="h5">{props.title}</Typography>

                        <Typography variant="subtitle1" className={classes.MuiCardContent}
                                    color="textSecondary">
                            {props.prevue}
                        </Typography>
                    </CardContent>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia}
                                   image={props.imageSrc} title={props.title} >
                            {props.user ? (props.likes.find((i: string) => i == props.user.id) ?
                                <Badge className={props.imageSrc ? classes.hearthWhite: classes.hearthDark}  badgeContent={props.likes.length} color="primary">
                                    <FavoriteIcon/>
                                </Badge> : <Badge
                                    className={props.imageSrc ? classes.hearthWhite: classes.hearthDark}
                                    badgeContent={props.likes.length}
                                                  color="primary"><FavoriteBorderIcon/> </Badge>):""}
                           </CardMedia>
                    </Hidden>
                </Card>
            </CardActionArea>
        </Link>
    </Grid>
}

export default CastomCard