import { useEffect, useRef, useState } from "react";
import { useContentstore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentstore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const slideRef = useRef(null);

    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
    const formattedcategory =
        category.replaceAll("_", " ")[0].toUpperCase() +
        category.replaceAll("_", " ").slice(1);
    useEffect(() => {
        const getContent = async () => {
            const res = await axios(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        };
        getContent();
    }, [contentType, category]);
    const scrollLeft = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: -slideRef.current.offsetWidth, behavior: 'smooth' })
        }
    }
    const scrollRight = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: slideRef.current.offsetWidth, behavior: 'smooth' })
        }
    }
    return (
        <div className="bg-black text-white relative px-5 md:px-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}>
            <h2 className='mb-4 text-2xl font-bold' >
                {formattedcategory} {formattedContentType}
            </h2>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={slideRef}>
                {content.map((item) => (
                    <Link to={`/watch/${item.id}`} key={item.id} className="min-w-[250px] relative group">
                        <div className="rounded-lg overflow-hidden">
                            <img src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                alt=""
                                className='transition-transform duration-300 ease-in-out group-hover:scale-125' />
                        </div>
                        <p className='mt-2 text-center'>{item.title || item.name}</p>
                    </Link>
                ))}
            </div>
            {showArrows && (
                <>
                    <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center
                     justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />

                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center
                     justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10"
                        onClick={scrollRight}>
                        <ChevronRight size={24} />

                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;