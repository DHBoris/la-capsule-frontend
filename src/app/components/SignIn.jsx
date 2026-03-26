import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/signin.module.css';
import { SignInUser } from '../api/api.user';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../reducer/authAction.reducer.jsx';
import { Link } from 'react-router-dom';


const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailVerified = searchParams.get('emailVerified');
  const confirmedMail = searchParams.get('confirmedMail');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createButton = () => {
    navigate('/createAccount');
  };

  useEffect(() => {
    if (errorMessage) {
      notify('failure');
      setErrorMessage('');
    }
    if (emailVerified === 'true') {
      notify('successMail');
      navigate('/signIn', { replace: true });
    }
    if (confirmedMail === 'true') {
      notify('confirmedMail');
      navigate('/signIn', { replace: true });
    }
  }, [errorMessage, emailVerified]);

  const notify = (value) => {
    if (value === 'success') {
      toast.success(`Vous avez été connecté avec succès.`, {
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
      toast.warn(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (value === 'successMail') {
      toast.success(
        `Votre mail a bien été confirmé vous pouvez vous connecter.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      );
    } else if (value === 'confirmedMail') {
      toast.success(
        `Votre mail a déjà été confirmé vous pouvez vous connecter.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      connection: false,
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .max(18, 'Le mot de passe doit contenir 20 caractères ou moins.')
        .required('Ce champ est obligatoire.'),
      email: Yup.string()
        .email(`Address mail n'est pas correte`)
        .required('Ce champ est obligatoire.'),
    }),

    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        let rawResponse = await SignInUser(values);
        let response = rawResponse.data;

        if (response.result === true) {
          notify('success');
          dispatch(userLoggedIn(response.userToken));
          navigate('/');
        } else if (response.result === false) {
          setErrorMessage(response.message);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  });

  return (
    <div className={styles.identificationWrapper}>
      <div className={styles.imgWrapper}>
        <div className={styles.imgContainer}></div>
        <div className={styles.imgOverlay}></div>
        <div className={styles.imgText}>
          CONNECTEZ VOUS <br /> OU <br /> CREER UN COMPTE
        </div>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formOverlay}></div>
        <div className={styles.formContainer}>
          <div className={styles.textIdentifie}>S'IDENTIFIER</div>
          <form className={styles.identifieform} onSubmit={formik.handleSubmit}>
            <div className={styles.inputContainer}>
              <input
                id={styles.email}
                className={styles.signInInput}
                type="email"
                placeholder="Adresse mail"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.errorTag}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className={styles.inputContainer}>
              <input
                id={styles.password}
                className={styles.signInInput}
                type="password"
                placeholder="Mot de passe"
                {...formik.getFieldProps('password')}
              />

                            {formik.touched.password && formik.errors.password ? (
                                <div className={styles.errorTag}>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className={styles.resteContainer}>
                            <input id={styles.signIncheckbox} type="checkbox" {...formik.getFieldProps('connection')} />
                            <div className={styles.restTextContainer}>
                                <div className={styles.textReste}> Rester connecter </div>
                                <Link to="/reset-password">Mot de passe oublié</Link>
                            </div>
                        </div>
                        <div className={styles.submitButtonContainer}>
                            <Button type="submit" backgroundColor="var(--secondaryColor)" textColor="white">
                                ENVOYER
                            </Button>
                        </div>
                    </form>
                    <div className={styles.creerButton}>
                        <Button
                            type="button"
                            outline={true}
                            textColor="var(--secondaryColor)"
                            fontSize="24px"
                            width="100%"
                            onClick={createButton}
                        >
                            Créer un compte
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;
