import React, {Fragment} from "react";
import {siteModel} from "../../models/siteModel";
import {connectArray} from "../../utility/helpers";
import {Link, Paper, Typography} from "@material-ui/core";
import {PicRatioView} from "pic-ratio-fill";
import {makeStyles} from "@material-ui/core/styles";

const catalogApi = process.env.CATALOG_API;

const CatalogListComponent = ({siteCategories, categoryId}) => {
    const category = siteCategories.find((cate)=> cate._id === categoryId);
    const classes = useStyle();

    if(category)
    { // noinspection DuplicatedCode
        return (//<div>{catalog.shortDesc}</div>
            <Fragment>
                <Typography
                    variant="h5"
                    color="inherit"
                    className={classes.typography}
                >
                    {category.category}
                </Typography>

            <ul className={classes.container}>
                {category && category.catalogList.map((catalog)=> {
                    const image = catalog.images[0];
                    return (
                    <li className={classes.item} key={catalog._id} >
                        <Paper className={classes.itemContainer}>
                            <div className={classes.itemImageBox}>
                                <PicRatioView
                                    src={`${catalogApi}/catalogApi/api/v1/catalog/file/${image.id}`}
                                    width={"100%"}
                                    height={200}
                                    colorRgb={image.colorRgb}
                                    colorRgbOpposite={image.colorRgbOther}
                                    willFitWidth={false}
                                />

                            </div>
                            <div className={classes.itemText}>
                                <Typography variant="h6" style={{color: "#1a8bdf"}} >
                                    <Link href={`#/catalogItem/${catalog._id}/${categoryId}`}>
                                        {catalog.shortDesc}
                                    </Link>
                                    <span style={{marginLeft: 10}} >${catalog.unitPrice}</span>
                                </Typography>
                                <Typography variant="body1" >
                                    {catalog.extraDesc}<br />
                                    {catalog.description}
                                </Typography>
                            </div>
                        </Paper>
                    </li>

                )
                })}
                </ul>
            </Fragment>
            );
    }
    else
        return (<span/>)
}

export const CatalogList =
    connectArray(CatalogListComponent,[siteModel]);


const useStyle = makeStyles({
    typography: {
        flexGrow: 1,
        align: "center",
        color: "#1a8bdf",
        "text-align": "center",
        marginTop: 20,
        border: "#d2d0d5 solid 3px",
        padding: 15,
        margin: 10,
        borderRadius: 15
    },
    container: {
        display: "flex",
        "list-style": "none",
        "padding-left": 5,
        paddingBottom: 10,
        "flex-flow": "row wrap",
        "justify-content": "space-around"
    },
    item: {
        width: "calc(20% - 10px)",
        height: 355,
        padding:5,
        overflow: "hidden",
        "@media (max-width: 1280px)" : {
            width: "calc(33.33% - 10px)"
        },
        "@media (max-width: 600px)" : {
            width: "calc(100% - 10px)"
        }
    },
    itemContainer: {
        //padding: 15,
        height: "calc(100% - 0px)",
        background: "#f1f3f5",
    },
    itemImageBox: {
        width: "100%",
        height: 200,
        overflow: "hidden",
        display:"inline-block",
        backgroundColor: "#afcdee",
        padding:0
    },
    itemText: {
        height: 150,
        paddingLeft: 7,
        overflow: "auto"
    }
});
