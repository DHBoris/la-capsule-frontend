import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/styles/components/createcompte.module.css';
import { SignUpUser } from '../api/api.user';
import Button from './Button';
import Modal from './Modal';
import { PopupContentCreate, PopupContentSupConfirm, PopupContentSupression, PopupContentRetour } from './PopupContent';

const CreateCompte = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const notify = (value) => {
        if (value === 'success') {
            toast.success(`Votre compte a été créé avec succès`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        } else if (value === 'failure') {
            toast.warn(`L'utilisateur existe déjà !`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        }
    };

    const handleOpenModal = (type) => {
        setIsModalOpen(true);
        setPopupType(type);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPopupType('');
    };

    const handleOutsideClick = () => {
        if (isModalOpen) {
            setIsModalOpen(false);
            setPopupType('');
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordConfirm: '',
            adressePostale: '',
            codePostale: '',
            villeName: '',
            day: '',
            month: '',
            year: '',
            politique: false,
            abonnement: false
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Ce champ est obligatoire.'),
            lastName: Yup.string().required('Ce champ est obligatoire.'),
            phoneNumber: Yup.string()
                .max(10, 'Le numéro de téléphone est incorrect.')
                .min(10, 'Le numéro de téléphone est incorrect.')
                .required('Ce champ est obligatoire.'),
            email: Yup.string().email(`Address mail n'est pas correte`).required('Ce champ est obligatoire.'),
            password: Yup.string()
                .max(18, 'Le mot de passe doit contenir 18 caractères ou moins.')
                .min(6, 'Le mot de passe doit contenir 6 caractères ou plus')
                .required('Ce champ est obligatoire.'),
            passwordConfirm: Yup.string()
                .required('Ce champ est obligatoire.')
                .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre'),
            adressePostale: Yup.string().required('Ce champ est obligatoire.'),
            codePostale: Yup.string().required('Ce champ est obligatoire.'),
            villeName: Yup.string().required('Ce champ est obligatoire.')
        }),

        onSubmit: async (values) => {
            try {
                let rawResponse = await SignUpUser(values);
                let response = rawResponse.data;
                setButtonDisabled(true);
                console.log(response);

                if (response.result === true) {
                    handleOpenModal('Create');
                    notify('success');
                } else if (response.result === false) {
                    notify('failure');
                }
                setButtonDisabled(false);
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    });

    const day = new Date(0).getDate();
    const days = Array.from(new Array(31), (val, index) => index + day);
    const month = new Date(0).getMonth() + 1;
    const months = Array.from(new Array(12), (val, index) => index + month);
    const year = new Date(1910).getFullYear(100);
    const years = Array.from(new Array(150), (val, index) => index - 60 + year);

    return (
        <div className={styles.creationCompteWrapper}>
            {/* partie image */}
            <div className={styles.imgWrapper}>
                <div className={styles.imgContainer}></div>
                <div className={styles.imgOverlay}></div>
                <div className={styles.imgText}>CREER UN COMPTE</div>
            </div>

            {/* partie formulaire */}
            <div className={styles.formWrapper}>
                <div className={styles.formOverlay}></div>
                <div className={styles.formContainer}>
                    <form onSubmit={formik.handleSubmit}>
                        {/* name input */}
                        <div className={styles.groupeWrapper}>
                            <input
                                id={styles.firstName}
                                className={styles.createAccountInput}
                                type="text"
                                placeholder="Nom *"
                                {...formik.getFieldProps('firstName')}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className={styles.errorTag}>{formik.errors.firstName}</div>
                            ) : null}

                            <input
                                id={styles.lastName}
                                className={styles.createAccountInput}
                                type="text"
                                placeholder="Prénom *"
                                {...formik.getFieldProps('lastName')}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className={styles.errorTag}>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        {/* mail, pass input */}
                        <div className={styles.groupeWrapper}>
                            <input
                                id={styles.email}
                                className={styles.createAccountInput}
                                type="email"
                                placeholder="Adresse mail *"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={styles.errorTag}>{formik.errors.email}</div>
                            ) : null}

                            <input
                                id={styles.phoneNumber}
                                className={styles.createAccountInput}
                                type="phoneNumber"
                                placeholder="Numéro de téléphone *"
                                {...formik.getFieldProps('phoneNumber')}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className={styles.errorTag}>{formik.errors.phoneNumber}</div>
                            ) : null}

                            <input
                                id={styles.password}
                                className={styles.createAccountInput}
                                type="password"
                                placeholder="Mot de passe *"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className={styles.errorTag}>{formik.errors.password}</div>
                            ) : null}

                            <input
                                id={styles.passwordConfirm}
                                className={styles.createAccountInput}
                                type="password"
                                placeholder="Confirmation du mot de passe *"
                                {...formik.getFieldProps('passwordConfirm')}
                            />
                            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                                <div className={styles.errorTag}>{formik.errors.passwordConfirm}</div>
                            ) : null}
                        </div>
                        {/* postale input */}
                        <div className={styles.groupeWrapper}>
                            <input
                                id={styles.adresse}
                                className={styles.createAccountInput}
                                type="text"
                                placeholder="Adresse postale *"
                                {...formik.getFieldProps('adressePostale')}
                            />
                            {formik.touched.adressePostale && formik.errors.adressePostale ? (
                                <div className={styles.errorTag}>{formik.errors.adressePostale}</div>
                            ) : null}

                            <div className={styles.postaleWrapper}>
                                <input
                                    id={styles.postale}
                                    className={styles.createAccountInput}
                                    type="text"
                                    placeholder="Code postale *"
                                    {...formik.getFieldProps('codePostale')}
                                />
                                {formik.touched.codePostale && formik.errors.codePostale ? (
                                    <div className={styles.errorTag}>{formik.errors.codePostale}</div>
                                ) : null}
                                <input
                                    id={styles.ville}
                                    className={styles.createAccountInput}
                                    type="text"
                                    placeholder="Ville *"
                                    {...formik.getFieldProps('villeName')}
                                />
                                {formik.touched.villeName && formik.errors.villeName ? (
                                    <div className={styles.errorTag}>{formik.errors.villeName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.textDate}>Date de naissance</div>
                        {/* Date input */}
                        <div className={styles.dateContainer}>
                            <select
                                id={styles.selectJour}
                                className={styles.dateInput}
                                type="select"
                                placeholder="Jour"
                                {...formik.getFieldProps('day')}
                            >
                                <option value="" disabled defaultValue>
                                    Jour
                                </option>
                                {days.map((day, index) => {
                                    return (
                                        <option key={`day${index}`} value={day}>
                                            {day}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                id={styles.selectMonth}
                                className={styles.dateInput}
                                type="select"
                                placeholder="month"
                                {...formik.getFieldProps('month')}
                            >
                                <option value="" disabled defaultValue>
                                    Mois
                                </option>
                                {months.map((month, index) => {
                                    return (
                                        <option key={`month${index}`} value={month}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                id={styles.selectYear}
                                className={styles.dateInput}
                                type="select"
                                placeholder="Year"
                                {...formik.getFieldProps('year')}
                            >
                                <option value="" disabled defaultValue>
                                    Année
                                </option>
                                {years.map((year, index) => {
                                    return (
                                        <option key={`year${index}`} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {/* policy input */}
                        <div className={styles.policyContainer}>
                            <div className={styles.checkBoxGroupeWrapper}>
                                <div className={styles.restTextContainer}>
                                    <input
                                        className={styles.createCheckBox}
                                        type="checkbox"
                                        {...formik.getFieldProps('politique')}
                                    />

                                    <div className={styles.textPolicy}>Accepter la politique de confidentialité</div>
                                </div>

                                <div className={styles.restTextContainer}>
                                    <input
                                        className={styles.createCheckBox}
                                        type="checkbox"
                                        {...formik.getFieldProps('abonnement')}
                                    />
                                    <div className={styles.textPolicy}>S’abonner</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.submitButtonContainer}>
                            <Button
                                type="submit"
                                backgroundColor="var(--secondaryColor)"
                                textColor="white"
                                width="100%"
                                height="50px"
                                fontSize="2rem"
                                disabled={buttonDisabled}
                            >
                                Créer un compte
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div onClick={handleOutsideClick}>
                {isModalOpen && (
                    <Modal onClose={handleCloseModal} isAutoClose={true}>
                        {popupType === 'Create' && <PopupContentCreate onClose={handleCloseModal} />}
                    </Modal>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateCompte;
