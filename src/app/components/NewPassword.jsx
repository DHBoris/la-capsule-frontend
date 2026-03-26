import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from './Button';
import styles from '../assets/styles/components/resetPassword.module.css';
import { ResetPassword } from '../api/api.user';
import { useLocation } from 'react-router-dom';
import SignIn from './SignIn';

const NewPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const retrievedToken = searchParams.get('resetToken');
    setToken(retrievedToken);
  }, [location]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Ce champ est obligatoire.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('Ce champ est obligatoire.'),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          token: token,
          password: values.password,
        };

        let rawResponse = await ResetPassword(data);
        if (rawResponse && rawResponse.data) {
          const response = rawResponse.data;
          console.log(response);

          if (response.result === true) {
            toast.success(response.message);
            setPasswordResetSuccess(true); 
          } else if (response.result === false) {
            toast.error(response.message);
            if (response.message.includes('jeton de réinitialisation est invalide ou a expiré')) {
              setPasswordResetSuccess(true);
            }
          }
        } else {
          toast.error("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
      }
    },
  });

  return (
    <div className={styles.resetPasswordWrapper}>
      {passwordResetSuccess ? (
          <SignIn />
      ) : (
        <div>
          <h2>Réinitialisation du mot de passe</h2>
          <form onSubmit={formik.handleSubmit} className={styles.resetPasswordForm}>
            <div className={styles.inputContainer}>
              <input
                id={styles.password}
                className={styles.resetPasswordInput}
                type="password"
                placeholder="Nouveau mot de passe"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className={styles.errorTag}>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className={styles.inputContainer}>
              <input
                id={styles.confirmPassword}
                className={styles.resetPasswordInput}
                type="password"
                placeholder="Confirmer le mot de passe"
                {...formik.getFieldProps('confirmPassword')}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className={styles.errorTag}>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className={styles.submitButtonContainer}>
              <Button type="submit" backgroundColor="var(--secondaryColor)" textColor="white">
                Envoyer
              </Button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewPassword;
