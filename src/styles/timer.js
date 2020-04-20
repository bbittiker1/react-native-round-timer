import {makeStyles} from "@material-ui/core/styles";

export const timerStyles =  makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        width: "100%"
    },
    card: {
        border: "1px solid #e9ecee",
        // maxWidth: "748px",
        margin: "0 auto",
        width: "100%",
        // justifyContent: "center"
    },
    container: {
        display: "flex",
        margin: "0 auto",
        height: "500px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
        // justifyContent: "center"
    },
    avatar: {

        // background: theme.palette.primary.main,
        // alignItems: "center",
        // justifyContent: "center"
        // color: "#01CEFC"
    },

    buttonRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "2px",
        spaceBetween: "2px"
    },
    buttonSpacer: {
        marginRight: "5px"
    },
    start: {
        backgroundColor: theme.palette.primary.main,
        color: "white"
    },
    pause: {
        backgroundColor: theme.palette.info.main,
        color: "white",
        marginLeft: "2px"
    },
    stop: {
        backgroundColor: theme.palette.secondary.main,
        color: "white"
    },
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        color: "#232427",
        fontSize: 25,
        fontWeight: 500,
        fontFamily: "'Poppins', sans-serif",
        lineHeight: "1.35417em",
        textAlign: "center"
    },
    subheader: {
        color: "#919eab",
        fontFamily: "'Nunito', sans-serif",
        fontSize: 20,
        fontWeight: 500,
        textAlign: "center"
    },
    roundMeta: {
        color: "#919eab",
        fontFamily: "'Nunito', sans-serif",
        fontSize: 16,
        fontWeight: 500,
        textAlign: "left"
    }

}));