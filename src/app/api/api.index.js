import axios from 'axios';

//Message
const MessageUser = async (messageData) => {
    const newMessage = {
        firstName: messageData.firstName,
        lastName: messageData.lastName,
        email: messageData.email,
        callNumber: messageData.callNumber,
        message: messageData.message,
        politique: messageData.politique
    };

    try {
        const rawResponse = await axios.post('http://localhost:5500/message', newMessage);
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return error;
    }
};

//upload Image
const uploadPhoto = async (imgFile, filters) => {
    const formData = new FormData();
    formData.append('image', imgFile);

    //   let keys = formData.keys();
    //   for (const pair of keys) {
    //     console.log(pair);
    //   }

    //   let values = formData.values();
    //   for (const pair of values) {
    //     console.log(pair);
    //   }

    try {
        const response = await axios.post('http://localhost:5500/uploadPhoto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { filters: JSON.stringify(filters) }
        });
        console.log('upload successful', response.data);
        return response;
    } catch (error) {
        console.error('upload failed', error);
    }
};

//charger Image
const loadPhoto = async () => {
    try {
        const response = await axios.get('http://localhost:5500/loadPhoto');
        console.log('load successful', response.data);
        return response;
    } catch (error) {
        console.error('load failed', error);
    }
};

//Add products to cart
const CartAdd = async (accessToken, coffeeItem) => {
    try {
        const rawResponse = await axios.post('http://localhost:5500/cartAdd', coffeeItem, {
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
        return console.log('Error occured', error);
    }
};

//Load products to cart
const CartLoad = async (accessToken) => {
    // console.log(accessToken)
    try {
        const rawResponse = await axios.post(
            'http://localhost:5500/cartLoad', {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return console.log('Error occured', error);
    }
};

//Delete products to cart
const CartDelete = async (accessToken, coffeeItem) => {
    console.log(coffeeItem);
    try {
        const rawResponse = await axios.post(
            'http://localhost:5500/cartDelete',
            { id: coffeeItem },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        let response;

        if (rawResponse.status === 200) {
            response = await rawResponse;
        }

        return response;
    } catch (error) {
        return console.log('Error occured', error);
    }
};

const SaveOrder = async (accessToken, { items, total, stripeRef }) => {
    try {
        const rawResponse = await axios.post(
            'http://localhost:5500/orders/save',
            { items, total, stripeRef },
            { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return rawResponse;
    } catch (error) {
        console.error('Erreur sauvegarde commande:', error);
    }
};

const GetOrders = async (accessToken) => {
    try {
        const rawResponse = await axios.get(
            'http://localhost:5500/orders',
            { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return rawResponse;
    } catch (error) {
        console.error('Erreur récupération commandes:', error);
    }
};

const CartClear = async (accessToken) => {
    try {
        const rawResponse = await axios.post(
            'http://localhost:5500/cartClear', {}, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        );
        return rawResponse;
    } catch (error) {
        console.error('Erreur vidage panier:', error);
    }
};

const OrderConfirmation = async ({ email, firstName, items, total, orderId }) => {
    try {
        const response = await axios.post('http://localhost:5500/order-confirmation', {
            email, firstName, items, total, orderId
        });
        return response;
    } catch (error) {
        console.error('Erreur confirmation commande:', error);
    }
};

export { MessageUser, uploadPhoto, CartAdd, CartLoad, CartDelete, CartClear, SaveOrder, GetOrders, loadPhoto, OrderConfirmation };
