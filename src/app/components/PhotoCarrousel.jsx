import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from '../assets/styles/components/photoCarrousel.module.css';
import { loadPhoto } from '../api/api.index';
import noImg from '../assets/images/notFound.png';

const PhotoCarousel = () => {
    const [photoList, setPhotoList] = useState([]);

    useEffect(() => {
        let photoloader = async () => {
            try {
                let rawResponse = await loadPhoto();
                let response = rawResponse.data;

                setPhotoList(response.photos);
            } catch (error) {
                console.log(error);
                return error;
            }
        };
        photoloader();
    }, []);
    return (
        <div className={styles.carrouselContainer}>
            <Carousel>
                {photoList && photoList.length > 0 ? (
                    photoList.map((photo, index) => (
                        <div key={index}>
                            <img src={photo.url} alt={`Image ${index}`} />
                            <p className="legend" style={{ fontSize: '20px' }}>
                                {Object.keys(photo.filters)
                                    .filter((key) => photo.filters[key] === true)
                                    .join(', ')}
                            </p>
                        </div>
                    ))
                ) : (
                    <div>
                        <img src={noImg} alt="Aucune photo" />
                        <p className="legend">Aucune photo disponible</p>
                    </div>
                )}
            </Carousel>
        </div>
    );
};

export default PhotoCarousel;
