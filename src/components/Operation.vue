<template>
    <div class="basis-1/3 pr-4">
        <div class="form-control h-full w-full justify-between">
            <div>
                <p
                    class="mb-2 text-sm font-semibold leading-6 text-sky-500 dark:text-sky-400">
                    班级名称
                </p>
                <input
                    class="inline-block text-2xl font-extrabold tracking-tight text-slate-900 outline-none sm:text-3xl"
                    placeholder="请输入班级名称"
                    v-model="record.class_name" />
                <div class="mt-4 flex flex-col gap-1 px-2">
                    <div class="flex items-center justify-between">
                        <div
                            class="flex items-center gap-2 text-sm text-gray-500">
                            <MaterialSymbolsTableRowsRounded></MaterialSymbolsTableRowsRounded>
                            行数
                        </div>
                        <n-input-number
                            v-model:value="rows"
                            clearable
                            name="row" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div
                            class="flex items-center gap-2 text-sm text-gray-500">
                            <MaterialSymbolsTableRowsRounded
                                class="rotate-90"></MaterialSymbolsTableRowsRounded>
                            列数
                        </div>
                        <n-input-number
                            v-model:value="cols"
                            clearable
                            name="col" />
                    </div>
                </div>
            </div>

            <div class="my-4 flex w-full flex-col">
                <label class="label">
                    <span class="label-text">名单</span>
                    <span class="label-text-alt text-gray-400">
                        *以换行分割
                    </span>
                </label>
                <textarea
                    class="textarea textarea-bordered h-24"
                    placeholder="请输入名单"
                    v-model="name_list"></textarea>
                <label class="label">
                    <span class="label-text text-gray-500">
                        已录入人数：{{ name_length }}
                    </span>
                </label>
            </div>

            <div
                class="grid w-full grid-cols-2 grid-rows-2 place-items-center gap-2">
                <div
                    class="w-full cursor-default rounded-md p-2 transition-all hover:bg-slate-100/80"
                    @click="handleUploadClick"
                    @mousedown.prevent>
                    <div
                        class="mx-auto flex w-[140px] items-center gap-2 text-base font-bold transition-all">
                        <IHeroiconsDocumentPlusSolid
                            class="h-8 w-8 rounded-md bg-purple-400 p-2 text-white"></IHeroiconsDocumentPlusSolid>
                        <p>上传记录</p>
                    </div>
                    <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        @change="handleUpload" />
                </div>
                <div
                    class="w-full cursor-default rounded-md p-2 transition-all hover:bg-slate-100/80"
                    @click="handleSetConfig"
                    @mousedown.prevent>
                    <div
                        class="mx-auto flex w-[140px] items-center gap-2 text-base font-bold transition-all">
                        <IHeroiconsCog6Tooth
                            class="h-8 w-8 rounded-md bg-rose-400 p-2 text-white"></IHeroiconsCog6Tooth>
                        <p>设置参数</p>
                    </div>
                </div>
                <div
                    class="w-full cursor-default rounded-md p-2 transition-all hover:bg-slate-100/80"
                    @click="handleForward"
                    @mousedown.prevent>
                    <div
                        class="mx-auto flex w-[140px] items-center gap-2 text-base font-bold transition-all">
                        <IHeroiconsArrowSmallUp
                            class="h-8 w-8 rounded-md bg-teal-400 p-2 text-white"></IHeroiconsArrowSmallUp>
                        <p>向前挪一行</p>
                    </div>
                </div>
                <div
                    class="w-full cursor-default rounded-md p-2 transition-all hover:bg-slate-100/80"
                    @click="handleRandom"
                    @mousedown.prevent>
                    <div
                        class="mx-auto flex w-[140px] items-center gap-2 text-base font-bold transition-all">
                        <IFadRandom1dice
                            class="h-8 w-8 rounded-md bg-orange-400 p-1 text-white"></IFadRandom1dice>
                        <p>全班随机换</p>
                    </div>
                </div>
            </div>
            <button
                class="btn btn-success btn-outline btn-md mt-4 hover:!text-white"
                @click="handleSave">
                <IHeroiconsArrowDownOnSquare
                    class="h-5 w-5"></IHeroiconsArrowDownOnSquare>
                保存记录
            </button>
        </div>
    </div>
</template>
<script setup>
import { useNotification } from 'naive-ui';

import { useRecordStore } from '~/store/record';
import { storeToRefs } from 'pinia';

const recordStore = useRecordStore();
const { record } = storeToRefs(recordStore);

const notification = useNotification();

const name_list = ref(null);
const name_length = computed(() => {
    return name_list.value ? name_list.value.split('\n').length : 0;
});

const rows = ref(0);
const cols = ref(0);

const fileInput = ref(null);

const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        let data = JSON.parse(event.target.result);
        // 兼容旧版本记录，如果data是list则调用
        if (Array.isArray(data)) {
            let seats = data.map((seat) => {
                return {
                    name: seat.name,
                    id: seat.id,
                };
            });
            data = {
                class_name: '未命名',
                cols: Math.max(...data.map((item) => item.x)) + 1,
                rows: Math.max(...data.map((item) => item.y)) + 1,
                seats: seats,
            };
        }
        console.log(data);
        recordStore.setRecord(data);
        name_list.value = data.seats
            .filter((item) => item.name != '空')
            .map((item) => item.name)
            .join('\n');
        rows.value = data.rows;
        cols.value = data.cols;
    };

    reader.readAsText(file);
};

const handleUploadClick = () => {
    fileInput.value.click();
};

const handleSetConfig = () => {
    const name_config = name_list.value.split('\n');
    // 检查容量是否合法
    if (name_config.length > cols.value * rows.value) {
        notification.error({
            title: '错误',
            content: '名单人数超过座位容量',
            duration: 2000,
        });
        return;
    }
    // 遍历存储seat
    const seats = [];
    for (let i = 0; i < cols.value * rows.value; i++) {
        seats.push({
            id: i,
            name: i < name_config.length ? name_config[i] : '空',
        });
    }
    recordStore.setRecord({
        class_name: record.value.class_name,
        cols: cols.value,
        rows: rows.value,
        seats,
    });
    console.log(record.value);
    notification.success({
        title: '成功',
        content: '设置参数成功',
        duration: 2000,
    });
};

const handleForward = () => {
    // 空座位位置不变，非空座位向前挪一行，第一行移动到最后一行，移动完成后，每行内各自随机排序，空座位位置不变
    const seats = record.value.seats;
    const cols = record.value.cols;
    const rows = record.value.rows;
    let new_seats = [];

    new_seats = seats.map((seat) => {
        // 空座位不变
        if (seat.name == '空') {
            return seat;
        }
        // 非空座位向前挪一行，第一行移动到最后一行，若其要去的地方为空座位，则跳过空座位继续向前挪，直至找到非空座位
        // 首先获得该列的所有座位
        let col_seats = seats.filter(
            (item) => item.id % cols == seat.id % cols
        );
        console.log(col_seats);

        let to_seat_id =
            seat.id - cols < 0 ? seat.id + cols * rows - cols : seat.id - cols;

        // 如果该列的目标座位为空座位，则继续向前挪
        while (
            col_seats.find((item) => item.id == to_seat_id) &&
            col_seats.find((item) => item.id == to_seat_id).name == '空'
        ) {
            to_seat_id =
                to_seat_id - cols < 0
                    ? to_seat_id + cols * rows - cols
                    : to_seat_id - cols;
        }
        seat.id = to_seat_id;
        return seat;
    });
    // 行内随机排序
    for (let i = 0; i < rows; i++) {
        let row_seats = new_seats.filter(
            (seat) => seat.id >= i * cols && seat.id < (i + 1) * cols
        );
        console.log(row_seats);
        row_seats.sort(() => Math.random() - 0.5);
        // 重置id
        for (let j = 0; j < row_seats.length; j++) {
            row_seats[j].id = i * cols + j;
        }
        // 重置new_seats
        new_seats = new_seats.map((seat) => {
            let tmp_seat = row_seats.find((item) => item.id == seat.id);
            if (tmp_seat) {
                return tmp_seat;
            }
            return seat;
        });
    }

    recordStore.setRecord({
        ...record.value,
        seats: new_seats,
    });
};

const handleRandom = () => {
    // 全班打乱id
    const seats = record.value.seats;
    // 打乱seat
    seats.sort(() => Math.random() - 0.5);
    // 重置id
    for (let i = 0; i < seats.length; i++) {
        seats[i].id = i;
    }
};

const handleSave = () => {
    // 下载 record
    const data = JSON.stringify(record.value);

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    // 记录日期、班级名
    const date = new Date();
    link.download = `${
        record.value.class_name
    }座位存储-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.json`;
    link.click();

    URL.revokeObjectURL(url);
};
</script>
