import { defineStore } from 'pinia';
import type { Account } from '../types/account';

const STORAGE_KEY = 'accounts-storage';

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as Account[],
    }),

    actions: {
        load() {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                this.accounts = JSON.parse(raw);
            }
        },

        persist() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts));
        },

        add() {
            this.accounts.push({
                id: crypto.randomUUID(),
                label: [],
                type: '',
                login: '',
                password: null,
                errors: {},
            });

            this.persist();
        },

        update(index: number, account: Account) {
            this.accounts[index] = account;
            this.persist();
        },

        remove(index: number) {
            this.accounts.splice(index, 1);
            this.persist();
        },
    },
});
