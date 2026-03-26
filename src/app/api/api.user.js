import axios from 'axios';
import jwt_decode from 'jwt-decode';


const config = {
    withCredentials: true,
};

//Sign up
const SignUpUser = async (userData) => {
    const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        day: userData.day,
        month: userData.month,
        year: userData.year,
        politique: userData.politique,
        abonnement: userData.abonnement,
        detail_address: userData.adressePostale,
        post_code: userData.codePostale,
        ville: userData.villeName,
    };

    try {
        const rawResponse = await axios.post('http://localhost:5500/users/signUp', newUser);
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return error;
    }
};

//Sign In
const SignInUser = async (userData) => {
    const user = {
        email: userData.email,
        password: userData.password,
        connection: userData.connection,
    };

    try {
        const rawResponse = await axios.post('http://localhost:5500/users/signIn/', user, config);
        console.log(rawResponse);

        // // Vérification de Cookie
        // const awaitResponse = await axios.get('http://localhost:5500/users/checkCookie', {
        //     withCredentials: true,
        // });
        // // console.log(awaitResponse);

        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return error;
    }
};

//Sign out
const SignOutUser = async () => {
    try {
        const rawResponse = await axios.get('http://localhost:5500/users/signOut', {
            withCredentials: true,
        });
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }
        return response;
    } catch (error) {
        return error;
    }
};

//Load Profil
const LoadUserProfil = async (accessToken) => {
    try {
        const rawResponse = await axios.post('http://localhost:5500/users/loadProfil', {}, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return error;
    }
};

const ResetPasswordRequest = async (email) => {
    const data = { email };

    try {
        const rawResponse = await axios.post('http://localhost:5500/users/requestPasswordReset', data);
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return error;
    }
};

const ResetPassword = async (data) => {
    try {
        const { email, password, token } = data; // Ajoutez la variable 'token' pour inclure le token de réinitialisation

        const requestData = {
            email: email,
            password: password,
            token: token, // Inclure le token dans la requête
        };

        const rawResponse = await axios.post('http://localhost:5500/users/resetPassword', requestData);
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return error;
    }
};

const UpdateUserProfile = async (userData, accessToken) => {
    try {
        const updatedUser = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            address: userData.address,
        };

        const rawResponse = await axios.put('http://localhost:5500/users/updateProfile', updatedUser, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        let response;
        if (rawResponse.status === 200) {
            response = await rawResponse;
        }
        return response;
    } catch (error) {
        return error;
    }
};


export { SignUpUser, SignInUser, ResetPasswordRequest, ResetPassword, LoadUserProfil, SignOutUser, UpdateUserProfile };
