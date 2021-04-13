// noinspection JSUnresolvedVariable

import React from "react";
import {siteModel} from "../../models/siteModel";
import {connectArray} from "../../utility/helpers";
import {useParams} from "react-router-dom";
import {CatalogList} from "./CatalogList";
import {SiteHeader} from "./SiteHeader";
import {H1Title,MainArticle} from "./Titles";
import {makeStyles} from "@material-ui/core/styles";
import {PicRatioView} from "pic-ratio-fill";
import {Divider, Typography} from "@material-ui/core";
import {CategoryList} from "./CategoryList";
const catalogApi = process.env.CATALOG_API;

const CatalogItemComponent = ({ catalogs }) => {
    const { catalogId, categoryId } = useParams();
    const classes = useStyle();
    const catalog = catalogs.find((cat) => cat._id === catalogId);
    const image = catalog && catalog.images && catalog.images[0];

    return (
        <div>
            <SiteHeader />
            {catalog &&
            <div>
                <Typography
                    variant="h5"
                    color="inherit"
                    className={classes.typography}
                >
                    <H1Title>{catalog.shortDesc}</H1Title>
                </Typography>
                <div className={classes.itemContainer}>
                    <div className={classes.itemDescriptionContainer}>
                        <H1Title>${catalog.unitPrice}</H1Title>
                        <MainArticle>{catalog.description}</MainArticle>
                        <MainArticle>{catalog.extraDesc}</MainArticle>
                    </div>
                    <div>
                        <PicRatioView
                            src={`${catalogApi}/catalogApi/api/v1/catalog/file/${image.id}`}
                            width={"100%"}
                            height={400}
                            colorRgb={image.colorRgb}
                            colorRgbOpposite={image.colorRgbOther}
                            willFitWidth={false}
                        />
                    </div>
                </div>
            </div>
            }
            <Divider variant="middle" />
            {categoryId && <CatalogList categoryId={categoryId} />}
            <CategoryList />
        </div>
    );
}

export const CatalogItem = connectArray(CatalogItemComponent, [siteModel]);

const useStyle = makeStyles({
    itemContainer : {
        display: "flex",
        justifyContent: "center",
        marginLeft: 5,
        marginBottom: 10,
        "@media (max-width: 1000px)": {
            display: "block"
        }
    },
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
    itemDescriptionContainer: {
        maxWidth: 400,
        paddingRight: 10,
        "@media (max-width: 1000px)": {
            marginBottom: 10
        }
    }
});