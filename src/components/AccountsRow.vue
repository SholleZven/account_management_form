<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Account } from '../types/account';
import { useAccountsStore } from '../stores/accounts.store';


const props = defineProps<{
    account: Account;
    index: number;
}>();

const store = useAccountsStore();
const model = ref<Account>({ ...props.account });

watch(
    () => props.account,
    v => (model.value = { ...v }),
);

function parseLabels(value: string) {
    return value
        .split(';')
        .map(v => v.trim())
        .filter(Boolean)
        .map(v => ({ text: v }));
}

function validate() {
    const errors: any = {};

    if (!model.value.type) errors.type = true;
    if (!model.value.login) errors.login = true;

    if (model.value.type === 'LOCAL' && !model.value.password) {
        errors.password = true;
    }

    model.value.errors = errors;

    return Object.keys(errors).length === 0;
}

function save() {
    if (validate()) {
        store.update(props.index, model.value);
    }
}

function onTypeChange() {
    if (model.value.type === 'LDAP') {
        model.value.password = null;
    }
    save();
}

function onLabelBlur(value: string) {
    model.value.label = parseLabels(value);
    save();
}
</script>

<template>
    <div class="row">
        <el-input placeholder="Метка" @blur="onLabelBlur($event.target.value)" />

        <el-select v-model="model.type" placeholder="Тип" @change="onTypeChange" :class="{ error: model.errors?.type }">
            <el-option label="LDAP" value="LDAP" />
            <el-option label="Локальная" value="LOCAL" />
        </el-select>

        <el-input v-model="model.login" placeholder="Логин" @blur="save" :class="{ error: model.errors?.login }" />

        <el-input v-if="model.type === 'LOCAL'" v-model="model.password" type="password" placeholder="Пароль"
            @blur="save" :class="{ error: model.errors?.password }" />

        <el-button type="danger" circle @click="store.remove(index)" class="last-item">
            ✕
        </el-button>
    </div>
</template>

<style scoped>
.row {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 2fr 40px;
    gap: 8px;
    margin-bottom: 8px;
}

.last-item {
    grid-column: 5;
}

.error :deep(.el-input__wrapper),
.error :deep(.el-select__wrapper) {
    border: 1px solid red;
}
</style>
