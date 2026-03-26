import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/styles/components/contact.module.css';
import { MessageUser } from '../api/api.index';
import Button from './Button';
import Modal from './Modal';
import {
  PopupContentCreate,
  PopupContentSupConfirm,
  PopupContentSupression,
  PopupContentRetour,
} from './PopupContent';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const notify = (value) => {
    if (value === 'success') {
      toast.success(`Votre message a été bien envoyé!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (value === 'failure') {
      toast.error(`Votre message n'a pas été envoyé!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
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
      callNumber: '',
      message: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Ce champ est obligatoire.'),
      lastName: Yup.string().required('Ce champ est obligatoire.'),
      email: Yup.string()
        .email(`Address mail n'est pas correte`)
        .required('Ce champ est obligatoire.'),
      callNumber: Yup.string().required('Ce champ est obligatoire.'),
      message: Yup.string().required('Ce champ est obligatoire.'),
    }),

    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        let rawResponse = await MessageUser(values);
        let response = rawResponse.data;
        setButtonDisabled(true);
        console.log(response);

        if (response.result === true) {
          handleOpenModal('Retour');
          notify('success');
        } else if (response.result === false) {
          notify('failure');
        }
        setButtonDisabled(false);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });

  return (
    <div className={styles.contactWrapper}>
      {/* partie image */}
      <div className={styles.imgWrapper}>
        <div className={styles.imgContainer}></div>
        <div className={styles.imgOverlay}></div>
        <div className={styles.imgText}>Contacter la Capsule</div>
      </div>

      {/* partie formulaire */}
      <div className={styles.formWrapper}>
        <div className={styles.formOverlay}></div>
        <div className={styles.formContainer}>
          <div className={styles.textContact}>
            Un retour concernant votre experience ?
          </div>
          <form onSubmit={formik.handleSubmit} id="contactForm">
            {/* name input */}
            <div className={styles.nameGroupeWrapper}>
              <input
                id={styles.firstName}
                className={styles.contactInput}
                type="text"
                placeholder="Nom *"
                {...formik.getFieldProps('firstName')}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={styles.errorTag}>{formik.errors.firstName}</div>
              ) : null}

              <input
                id={styles.lastName}
                className={styles.contactInput}
                type="text"
                placeholder="Prénom *"
                {...formik.getFieldProps('lastName')}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className={styles.errorTag}>{formik.errors.lastName}</div>
              ) : null}
            </div>

            <input
              id={styles.email}
              className={styles.contactInput}
              type="email"
              placeholder="Adresse mail *"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errorTag}>{formik.errors.email}</div>
            ) : null}

            <input
              id={styles.callNumber}
              className={styles.contactInput}
              type="tel"
              placeholder="Numéro de téléphone *"
              {...formik.getFieldProps('callNumber')}
            />
            {formik.touched.callNumber && formik.errors.callNumber ? (
              <div className={styles.errorTag}>{formik.errors.callNumber}</div>
            ) : null}

            <textarea
              id={styles.message}
              className={styles.contactInput}
              type="text"
              placeholder="Message *"
              {...formik.getFieldProps('message')}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className={styles.errorTag}>{formik.errors.message}</div>
            ) : null}

            {/* policy input */}
            <div className={styles.policyContainer}>
              <input
                className={styles.contactCheckBox}
                type="checkbox"
                {...formik.getFieldProps('politique')}
              />

              <div className={styles.textPolicy}>
                Accepter la politique de confidentialité
              </div>
            </div>
            <div className={styles.submitButtonContainer}>
              <Button
                type="submit"
                backgroundColor="var(--secondaryColor)"
                textColor="white"
                width="100%"
                fontSize="1.4rem"
                disabled={buttonDisabled}
              >
                ENVOYER
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div onClick={handleOutsideClick}>
        {isModalOpen && (
          <Modal onClose={handleCloseModal} isAutoClose={true}>
            {popupType === 'Retour' && (
              <PopupContentRetour onClose={handleCloseModal} />
            )}
          </Modal>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
