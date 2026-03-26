import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCoffee } from '../reducer/coffee.reducer';
import { ToastContainer, toast } from 'react-toastify';
import { Select, Option } from './Select';
import { formatNumber } from '../utils/functions';
import InputNumber from './InputNumber';
import Button from './Button';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/styles/components/cafePerso.module.css';
import Logo from '../assets/images/logos/logo_likesViolet.svg';
import PersonalImg from '../assets/images/cafePersonnalise@2x.webp';

const CafePerso = () => {
    const dispatch = useDispatch();
    const [price, setPrice] = useState(9.95);

    const selectWidth = '238px';
    const [coffeeNumber, setCoffeeNumber] = useState(1);
    const [topping, setTopping] = useState('');
    // const [toppingSuffixPrice, setToppingSuffixPrice] = useState(0);
    const [milk, setMilk] = useState('');
    // const [milkSuffixPrice, setMilkSuffixPrice] = useState(0);
    const [caffeine, setCaffeine] = useState('');
    // const [caffeineSuffixPrice, setCaffeineSuffixPrice] = useState(0);
    const [coffeeType, setCoffeeType] = useState('');
    // const [coffeeTypeSuffixPrice, setCoffeeTypeSuffixPrice] = useState(0);
    const [coffeeSize, setCoffeeSize] = useState('');
    // const [coffeeSizeSuffixPrice, setcoffeeSizeSuffixPrice] = useState(0);
    const [deco, setDeco] = useState('');
    // const [decoSuffixPrice, setDecoSuffixPrice] = useState(0);

    const toppingSuffixHandler = (price) => {
        console.log(price);
        setToppingSuffixPrice(Number(price))
    }


    // useEffect(() => {
    //     const newPrice = price * coffeeNumber;
    //     setPrice(newPrice);
    // }, [coffeeNumber]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    // try {
    //     const formData = {
    //         coffeeNumber,
    //         topping,
    //         milk,
    //         caffeine,
    //         coffeeType,
    //         coffeeSize,
    //         deco,
    //     };
    //     await axios.post('http://127.0.0.1:5500/specialCoffees', formData);
    // handleAdd();
    // } catch (error) {
    //     console.error(error);
    // }
    // };

    const notify = (value) => {
        if (value === 'success') {
            toast.success(`Votre choix a été ajouté avec succès à votre panier`, {
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
            toast.warn(`une erreur est survenue`, {
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

    function handleAdd(event) {
        event.preventDefault();
        const coffeeItem = {
            id: Date.now(),
            name: 'Personal',
            image: PersonalImg,
            type: 'special',
            size: 350,
            price: price * coffeeNumber,
            quantity: coffeeNumber
        };
        if (coffeeItem) {
            notify('success');
        }
        console.log(coffeeItem);
        dispatch(addCoffee(coffeeItem));
    }

    return (
        <div className={styles.cafePerso}>
            <form onSubmit={handleAdd}>
                <div className={styles.contentCafePerso}>
                    <div className={styles.wrapperSelection}>
                        <Select width={selectWidth} value={milk} setValue={setMilk} placeholder="Type de lait">
                            <Option value={'vache'}>Lait de vache</Option>
                            <Option value={'soja'} suffix="+ 0.30€">
                                Lait de soja
                            </Option>
                            <Option value={'chevre'} suffix="+ 0.75€">
                                Lait de chevre
                            </Option>
                        </Select>

                        <Select
                            width={selectWidth}
                            value={topping}
                            setValue={setTopping}
                            placeholder="Choix du Topping"
                        >
                            <Option value={'vanille'}>Vanille</Option>
                            <Option
                                value={'cannelle'}
                                suffix="+ 0.30€"
                                onSelect={() => {
                                    toppingSuffixHandler(0.3);
                                }}
                            >
                                Cannelle
                            </Option>
                        </Select>
                    </div>
                    <div className={styles.wrapperSelection}>
                        <Select
                            width={selectWidth}
                            value={caffeine}
                            setValue={setCaffeine}
                            placeholder="Choix de Cafeine"
                        >
                            <Option value={'caffeine'}>Caféine</Option>
                            <Option value={'decaifeine'}>Décafeiné</Option>
                        </Select>

                        <Select
                            width={selectWidth}
                            value={coffeeType}
                            setValue={setCoffeeType}
                            placeholder="Type de café"
                        >
                            <Option value={'moka'}>Moka</Option>
                            <Option value={'degustation'} suffix="+ 0.80€">
                                Dégustation
                            </Option>
                            <Option value={'original'}>L'Original</Option>
                        </Select>
                    </div>
                    <div className={styles.wrapperSelection}>
                        <Select
                            width={selectWidth}
                            value={coffeeSize}
                            setValue={setCoffeeSize}
                            placeholder="Taille de votre café"
                        >
                            <Option value={'S'}>Petit</Option>
                            <Option value={'M'} suffix="+ 0.50€">
                                Moyen
                            </Option>
                            <Option value={'L'} suffix="+ 1.00€">
                                Grand
                            </Option>
                        </Select>

                        <Select width={selectWidth} value={deco} setValue={setDeco} placeholder="Latte Art">
                            <Option value={'Oui'} suffix="+ 0.10€">
                                Oui
                            </Option>
                            <Option value={'Non'}>Non</Option>
                        </Select>
                    </div>
                </div>
                <div className={styles.textPerso}>
                    <div>
                        <h3>Personnaliser son café</h3>
                        <p className={styles.paragraphePerso}>
                            Grâce à un algorithme simple et rapide, répondez à 4 questions pour nous permettre de
                            découvrir qui vous êtes et les moments que vous associez à votre café préféré. Nous créerons
                            alors un café rien que pour vous et qui correspondra à vos goûts !
                        </p>
                        <h4>350 ML</h4>
                        <div className={styles.pricePerso}>
                            <InputNumber value={coffeeNumber} setValue={setCoffeeNumber} min={1} precision={0} />
                            <Button type="submit">Ajouter au panier</Button>
                        </div>
                        <div className={styles.pricePerso}>
                            <h3>{formatNumber((price) * coffeeNumber, 2)}€ TTC</h3>
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CafePerso;
