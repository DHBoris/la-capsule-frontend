import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reducer/configureStore';
import Header from './components/Header';
import Home from '../app/views/Home';
import ConceptPage from './views/ConceptPage';
import YourConceptionsPage from './views/YourConceptionsPage';
import SignInPage from './views/SignInPage';
import CreateComptePage from './views/CreateComptePage';
import CafePerso from './components/CafePerso';
import ContactPage from './views/ContactPage';
import NotFound from './views/NotFound';
import CreateCoffePage from './views/CreateCoffePage';
import CartPage from './views/CartPage';
import HistoryPage from './views/HistoryPage';
import CommandePage from './components/Commande';
import ProfilPage from './views/ProfilPage';
import ResetPasswordPage from './views/resetPassword';
import NewPasswordPage from './views/NewPassword';
import CheckoutSuccessPage from './views/CheckoutSuccessPage';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Elements stripe={stripePromise} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/yourCoffee" element={<CreateCoffePage />} />
            <Route exact path="/concept" element={<ConceptPage />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/history" element={<HistoryPage />} />
            <Route exact path="/profil" element={<ProfilPage />} />
            <Route
              exact
              path="/yourCompositions"
              element={<YourConceptionsPage />}
            />
            <Route exact path="/cafeperso" element={<CafePerso />} />
            <Route exact path="/signIn" element={<SignInPage />} />
            <Route exact path="/createAccount" element={<CreateComptePage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/commande" element={<CommandePage />} />
            <Route exact path="/reset-password" element={<ResetPasswordPage />} />
            <Route exact path="/new-password" element={<NewPasswordPage />} />
            <Route exact path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
