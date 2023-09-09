import { defineStore } from 'pinia';

export const useRecordStore = defineStore('record', () => {
    let record = ref({
        class_name: '',
        cols: 0,
        rows: 0,
        seats: [],
    });
    const setRecord = (data) => {
        record.value = data;
    };
    return { record, setRecord };
});
