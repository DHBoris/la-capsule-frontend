import React from 'react';
import { Menu } from '@headlessui/react';
import styles from '../assets/styles/components/dropdown.module.css';

function Dropdown() {
  return (
    <div className={styles.menuContainer}>
      <Menu>
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Suivi de commande
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Retour
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Historique des commandes
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Modifications de mot de passe
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Modifications de compte
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Suppression du compte
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default Dropdown;