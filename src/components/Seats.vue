<template>
    <div class="bg-zinc-50 rounded-lg basis-2/3 p-5">
        <div class="bg-zinc-200/60 p-2 rounded-md mb-4">
            <h1 class="text-gray-900 font-semibold text-center">讲台</h1>
        </div>
        <div class="grid gap-2" :class="[matrix_config.cols_class[record.cols], matrix_config.rols_class[record.rows]]">
            <div
                v-for="seat in record.seats.sort((a, b) => a.id - b.id)"
                :key="seat.id"
                class="text-center p-2 rounded-lg"
                :class="get_seat_class(seat)"
                @mousedown="dragStart(seat)"
                @mousedown.prevent
                @mouseup="drop(seat)"
            >
                <span class="cursor-move">{{ seat.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRecordStore } from '~/store/record';
import { storeToRefs } from 'pinia';

const recordStore = useRecordStore();
const { record } = storeToRefs(recordStore);

const matrix_config = {
    // cols
    cols_class: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
    },
    // rows
    rols_class: {
        1: 'grid-rows-1',
        2: 'grid-rows-2',
        3: 'grid-rows-3',
        4: 'grid-rows-4',
        5: 'grid-rows-5',
        6: 'grid-rows-6',
        7: 'grid-rows-7',
        8: 'grid-rows-8',
        9: 'grid-rows-9',
        10: 'grid-rows-10',
    },
};

const get_seat_class = (seat) => {
    const text_style = seat.name == '空' ? 'bg-slate-200 text-transparent' : 'bg-sky-500 text-white';
    if (draggedSeat.value) {
        return seat.id == draggedSeat.value.id
            ? `${text_style} !bg-amber-400 shadow-lg`
            : `${text_style} hover:bg-purple-400 transition-all duration-300 ease-in-out`;
    }
    return text_style;
};

const draggedSeat = ref(null);

const dragStart = (seat) => {
    if (draggedSeat.value) {
        return;
    }
    draggedSeat.value = seat;
};

const drop = (seat) => {
    if (draggedSeat.value && seat !== draggedSeat.value) {
        const tmp_id = seat.id;
        seat.id = draggedSeat.value.id;
        draggedSeat.value.id = tmp_id;
        draggedSeat.value = null;
    }
};
</script>
