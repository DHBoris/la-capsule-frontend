import React, { useState, useEffect } from 'react';
import Button from './Button';
import styles from '../assets/styles/components/profil.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../reducer/authAction.reducer';
import { SignOutUser, LoadUserProfil } from '../api/api.user';
import { UpdateUserProfile } from '../api/api.user';

const Profil = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = useSelector((state) => state.auth.userToken);
    // console.log(accessToken);

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '0712341234',
        email: 'johndoe@example.com',
        adress: '123 rue republique paradis',
    });

    useEffect(() => {
        const handleLoadProfil = async () => {
            try {
                const rawResponse = await LoadUserProfil(accessToken);
                console.log(rawResponse);
                const response = rawResponse.data;
                const userData = response.user
                setUserData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phoneNumber: userData.phoneNumber,
                    email: userData.email,
                    adress:
                        userData.userAddress[0].detail_address +
                        ', ' +
                        userData.userAddress[0].ville +
                        ' ' +
                        userData.userAddress[0].post_code
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        handleLoadProfil();
    }, []);

    const handleLogout = async () => {
        dispatch(userLoggedOut());
        const rawResponse = await SignOutUser();
        const response = rawResponse.data;
        console.log(response);
        navigate('/signIn');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            // Empêcher la modification de l'adresse e-mail
            return;
        }
        setUserData({ ...userData, [name]: value });
    };
    const handleSave = async () => {
        setIsEditing(false);
        try {
            console.log("UserData before update: ", userData); 
    
            const response = await UpdateUserProfile(userData, accessToken);
            console.log("API Response: ", response); 
    
            if (response && response.data) {
                console.log("Updated user data: ", response.data); 
            } else {
                console.log("Response data not available");
            }
        } catch (error) {
            console.error("Error updating user profile: ", error);
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
    };


    return (
        <div className={styles.profilWrapper}>
            <div className={styles.buttonContainer}>
                <div>
                    <Button onClick={handleEdit} backgroundColor="var(--secondaryColor)" textColor="white">
                        Modifier le profil
                    </Button>
                </div>
                <div>
                    <Button onClick={handleLogout} backgroundColor="var(--primaryColor)" textColor="white">
                        Se déconnecter
                    </Button>
                </div>
                <div>
                    <Button onClick={handleSave} backgroundColor="var(--secondaryColor)" textColor="white">
                         Enregistrer
                    </Button>
                </div>
            </div>
            {isEditing ? (
                <div className={styles.formContainer}>
                    <label className={styles.label}>Nom :</label>
                    <input
                        className={styles.profilInput}
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Prénom :</label>
                    <input
                        className={styles.profilInput}
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Télephone :</label>
                    <input
                        className={styles.profilInput}
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />        
                    <label className={styles.label}>Adresse :</label>
                    <input
                        className={styles.profilInput}
                        type="text"
                        name="adress"
                        value={userData.adress}
                        onChange={handleInputChange}
                    />
                </div>
            ) : (
                <div className={styles.formContainer}>
                    <label className={styles.label}>Nom : {userData.firstName}</label>
                    <label className={styles.label}>Prénom : {userData.lastName}</label>
                    <label className={styles.label}>Télephone : {userData.phoneNumber}</label>
                    <label className={styles.label}>Adresse mail : {userData.email}</label>
                    <label className={styles.label}>Adresse : {userData.adress}</label>
                </div>
            )}
        </div>
    );
};

export default Profil;