<template>
    <div class="lg:flex lg:h-full lg:flex-col">
        <header
            class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
            <h1
                class="flex items-center justify-center gap-2 text-base font-semibold leading-6 text-gray-900">
                <img src="/dice.svg" class="w-8" />
                <span>班级座位随机器</span>
                <n-divider vertical />
                <span class="text-gray-800/60">
                    by

                    <a
                        href="https://github.com/EZIOPQR"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="transition-all hover:text-gray-700">
                        EZIOPQR
                    </a>
                    &
                    <a
                        href="https://arthals.ink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="transition-all hover:text-gray-700">
                        Arthals
                    </a>
                </span>
            </h1>
            <!-- github link -->
            <div
                class="flex items-center gap-2 rounded-md p-1 text-gray-500 transition-colors duration-200 hover:bg-zinc-200/60 hover:text-gray-700">
                <a
                    href="https://github.com/zhuozhiyongde/Class-Randomizer"
                    target="_blank">
                    <IMdiGithub class="h-6 w-6" />
                </a>
            </div>
        </header>
        <div class="mx-auto my-10 w-full max-w-7xl sm:px-6 lg:px-8">
            <div class="w-full overflow-hidden rounded-lg bg-white shadow">
                <div class="flex justify-between gap-2 px-4 py-5 sm:p-6">
                    <Operation></Operation>
                    <Seats></Seats>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Operation from '~/components/Operation.vue';
import Seats from '~/components/Seats.vue';
</script>
