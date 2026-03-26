import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { uploadPhoto } from '../api/api.index';
import Checkbox from './Checkbox';
import Button from './Button';
import uploadImg from '../assets/images/upload.svg';
import styles from '../assets/styles/components/upload.module.css';
import 'react-toastify/dist/ReactToastify.css';

// initialize filter
const filtersList = ['Avec topping', 'Avec mousse de lait', 'Arabica', 'Robusta', 'Assemblage', 'Animal', 'Végan'];

// initialize filter states
const initialState = () => {
    let state = {};
    for (const filter of filtersList) {
        state[filter] = false;
    }
    return state;
};

const Upload = ({ name, value, initialPreview, onChange }) => {
    const [filters, setFilters] = useState(initialState);
    const [preview, setPreview] = useState(initialPreview);
    const [imgFile, setImgFile] = useState('')
    const [valueVerify, setValueVerify] = useState(false);
    const inputRef = useRef();

    // filter toggle management
    const toggleFilter = (filter) =>
        setFilters((previous) => {
            let newState = { ...previous };
            newState[filter] = !newState[filter];
            return newState;
        });

    // toast message controller
    const notify = () => {
        toast.warn(`Choisissez vos mots et photo`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    // change value when button is clicked
    const handleChange = (e) => {
        const nextValue = e.target.files[0];
        setImgFile(nextValue);
        onChange(name, nextValue);
    };

    // cancle upload file
    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputRef) return;

        if (!value) {
            setPreview(initialPreview);
        } else {
            inputNode.value = '';
            setPreview(null);
            setFilters(initialState);
        }

        onChange(name, null);
    };

    // change preview image after choice
    useEffect(() => {
        if (!value) return;
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);
        // initialize preview after set image
        return () => {
            URL.revokeObjectURL(nextPreview);
        };
    }, [value]);

    // verify filter states
    useEffect(() => {
        const values = Object.values(filters);
        setValueVerify(values.includes(true));
    }, [filters]);

    // Upload image
    const onSubmit = async () => {
        try {
            const rawResponse = await uploadPhoto(imgFile, filters);

        } catch (error) {
            console.log(error);
        }
    };

    // component line
    return (
        <section className={styles.yourCompositions}>
            <h2 className={styles.compositionH2}>Partager votre café</h2>
            <div id={styles.searchTitle}>
                <h4 className={styles.searchText}>Ajouter vos cafés & vos mots clés</h4>
            </div>
            <div className={styles.filters}>
                <div className={styles.labels}>
                    {filtersList.map((filter, index) => (
                        <Checkbox
                            key={index}
                            value={filter}
                            checked={filters[filter]}
                            onchange={(e) => toggleFilter(e.target.value)}
                        >
                            {filter}
                        </Checkbox>
                    ))}
                </div>
            </div>

            <div id={styles.fileInputWrapper}>
                <img src={preview || uploadImg} className={`${preview ? styles.selected : ''}`} alt="upload preview" />
                <input
                    className={styles.fileInputHiddenOverlay}
                    type="file"
                    accept="image/png, image/jpeg, image/svg, image.webp"
                    onChange={handleChange}
                    ref={inputRef}
                />
            </div>

            <div className={styles.buttonWrapper}>
                {valueVerify && preview ? (
                    <Button onClick={onSubmit}>Télécharger</Button>
                ) : (
                    <Button backgroundColor="gray" onClick={notify}>
                        Télécharger
                    </Button>
                )}

                {value ? (
                    <Button backgroundColor="var(--primaryColor)" margin="0 0 0 4rem" onClick={handleClearClick}>
                        Annuler
                    </Button>
                ) : (
                    <Button backgroundColor="gray" margin="0 0 0 4rem">
                        Annuler
                    </Button>
                )}
            </div>
            <ToastContainer />
        </section>
    );
};

export default Upload;
