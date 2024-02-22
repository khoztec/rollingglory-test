<template>
    <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-3 p-2 d-flex flex-row align-items-center justify-content-center">
                    <NuxtLink :to="'/'" class="mx-3 fs-3 text-white"><Icon name="uil:instagram" /></NuxtLink>
                    <NuxtLink :to="'/'" class="mx-3 fs-3 text-white"><Icon name="uil:facebook" /></NuxtLink>
                    <NuxtLink :to="'/'" class="mx-3 fs-3 text-white"><Icon name="uil:twitter" /></NuxtLink>
                </div>
                <div class="col-12 col-sm-9 p-2 text-center">
                    <small>Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</small>
                </div>
            </div>
            
        </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: #232323
}
</style>