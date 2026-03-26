import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from './Button';
import styles from '../assets/styles/components/resetPassword.module.css';
import { ResetPasswordRequest } from '../api/api.user';

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email("L'adresse e-mail n'est pas valide").required('Ce champ est obligatoire.'),
    }),
    onSubmit: async (values) => {
      try {
        let rawResponse = await ResetPasswordRequest(values.email);
        let response = rawResponse.data;
        console.log(response);

        if (response.result === true) {
          toast.success(response.message);
        } else if (response.result === false) {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Une erreur s\'est produite lors de la demande de réinitialisation de mot de passe.');
      }
    },
  });

  return (
    <div className={styles.resetPasswordWrapper}>
      <h2>Réinitialisation du mot de passe</h2>
      <p>Si vous avez oublié votre mot de passe, veuillez saisir votre adresse e-mail ci-dessous. Nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
      <form onSubmit={formik.handleSubmit} className={styles.resetPasswordForm}>
        <div className={styles.inputContainer}>
          <input
            id={styles.email}
            className={styles.resetPasswordInput}
            type="email"
            placeholder="Adresse e-mail"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errorTag}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.submitButtonContainer}>
          <Button type="submit" backgroundColor="var(--secondaryColor)" textColor="white">
            Envoyer
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
