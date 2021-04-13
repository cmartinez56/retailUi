import React, {useState, useEffect} from "react";
import {siteModel} from "../../models/siteModel";
import {connectArray} from "../../utility/helpers";

const CarouselComponent = ({siteCategories}) => {
    useEffect(()=> {
        const timerRef = setTimeout(()=> {
            const nextIndex = (category && activeIndex < (category.catalogList.length - 1)) ?
                activeIndex + 1 : 0;
            setActiveIndex(nextIndex);
        },4000);

        return () => clearTimeout(timerRef);
    })
    const categoryId = "5f6bf0493fc7d73540be029b";
    const category = siteCategories.find((cate)=> cate._id === categoryId);
    //const classes = useStyle();
    const catalogApi = process.env.CATALOG_API;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{"zIndex": 1}}>
            <div className="carousel-inner">
                {category && category.catalogList.map((catalog, index) => {
                    const mainClass = activeIndex === index ?
                        "base-class view-port Active" : "base-class view-port";
                    const captionClass = activeIndex === index ?
                        "carousel-caption Active" : "carousel-caption";
                    return (
                            <div className={mainClass} key={catalog._id}>

                                <img alt="" src={`https://api.netware.io/catalogApi/api/v1/catalog/file/${catalog.images[0].id}`} />
                                <div className={captionClass}>
                                    <p style={{"fontFamily": "'Raleway', sans-serif", "fontSize": 22}}>
                                        {catalog.shortDesc}
                                    </p>
                                </div>
                            </div>
                    )
                })}
            </div>
        </div>
    );
};

export const Carousel = connectArray(CarouselComponent, [siteModel]);
