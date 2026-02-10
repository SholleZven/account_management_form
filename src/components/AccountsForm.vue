<script setup lang="ts">
import { onMounted } from 'vue';
import { useAccountsStore } from '../stores/accounts.store';
import AccountsRow from './AccountsRow.vue';

const store = useAccountsStore();

onMounted(() => {
    store.load();
});
</script>

<template>
    <el-card>
        <h2>Учетные записи</h2>
        <div class="header">

            <el-button type="primary" circle @click="store.add()">
                +
            </el-button>
        </div>

        <div class="info">
            <el-text type="info">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b>
            </el-text>
        </div>

        <div class="labels">
            <span>Метка</span>
            <span>Тип записи</span>
            <span>Логин</span>
            <span>Пароль</span>
            <span></span>
        </div>

        <AccountsRow v-for="(acc, index) in store.accounts" :key="acc.id" :account="acc" :index="index" />
    </el-card>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 12px;
}

.labels {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 2fr 40px;
    margin-top: 12px;
    font-weight: 600;
    margin-bottom: 6px;
}

.info {
    margin-bottom: 24px;
}
</style>
