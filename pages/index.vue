<script setup lang="ts">
const products = useProductStore()
await callOnce(products.fetch)
const selectedSort = ref('Terbaru')
const selectedFilter = ref([])
watch(selectedSort, async () => {
    products.updateSort(selectedSort.value)
})
watch(selectedFilter, async () => {
    products.updateFilter(selectedFilter.value)
})
</script>

<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-12 col-sm-3 pb-3">
                <div class="d-flex flex-row align-center fs-4 fw-bold">
                    Filter
                </div>
                <hr>
                <div class="border border-secondary-subtle rounded p-4">
                    <div class="form-check d-flex flex-row align-items-center justify-content-between ps-0 mb-4">
                        <label class="form-check-label fw-light" for="goodrating">Rating 4 ke atas</label>
                        <input type="checkbox" class="form-check-input" id="goodrating" value="goodrating"
                            v-model="selectedFilter">
                    </div>
                    <div class="form-check d-flex flex-row align-items-center justify-content-between ps-0">
                        <label class="form-check-label fw-light" for="available">Stok Tersedia</label>
                        <input type="checkbox" class="form-check-input" id="available" value="available"
                            v-model="selectedFilter">
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-9 pb-3">
                <div class="d-flex flex-row align-center justify-content-between">
                    <div class="fs-4 fw-bold">
                        Product List
                    </div>
                    <div class="text-secondary d-flex flex-row align-items-center">
                        <div class="me-3">
                            Urutkan
                        </div>
                        <select class="form-select rounded-pill px-5 fw-light text-secondary" v-model="selectedSort">
                            <option value="Terbaru" @click="products.updateSort(selectedSort)">Terbaru</option>
                            <option value="Ulasan" @click="products.updateSort(selectedSort)">Ulasan</option>
                        </select>
                    </div>
                </div>
                <hr>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    <div class="col" v-for="(item, i) in products.sortedData" :key="i">
                        <Card :itemCard="item" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
