import { defineStore } from 'pinia'
export const useProductStore = defineStore('productStore', {
    state: () => ({
        meta: '',
        data: [],
        modifiedData: [],
        sortBy: 'Terbaru',
        filterBy: []
    }),
    getters: {
        sortedData: (state) => {
            let composedData = [...state.modifiedData]
            return composedData.sort((a, b) => {
                if (state.sortBy === 'Terbaru') {
                    return b.attributes.id - a.attributes.id
                } else {
                    return b.attributes.rating - a.attributes.rating
                }
            });
        },
    },
    actions: {
        async fetch() {
            const productLists = await $fetch('https://recruitment.dev.rollingglory.com/api/v2/gifts?page[number]=1&page[size]=20')
            this.meta = productLists.meta
            this.data = productLists.data
            this.modifiedData = productLists.data
        },
        updateSort(item) {
            this.sortBy = item
        },
        updateFilter(item) {
            this.filterBy = item
            this.modifiedData = this.applyFilters()
        },
        applyFilters() {
            let filteredData = [...this.data];
            if (this.filterBy.includes('goodrating')) {
                filteredData = filteredData.filter(
                    (item) => item.attributes.rating > 4
                );
            }
            if (this.filterBy.includes('available')) {
                filteredData = filteredData.filter(
                    (item) => item.attributes.stock > 0
                );
            }
            return filteredData;
        },
        async setWishlist(id) {
            try {
                const wishlist = await $fetch('https://recruitment.dev.rollingglory.com/api/v2/gifts/' + id + '/wishlist', {
                    method: 'POST',
                })
                for (let i = 0; i < this.modifiedData.length; i++) {
                    if (this.modifiedData[i].attributes.id === id) {
                        this.modifiedData[i].attributes.isWishlist = 1
                        const { notify } = useNotification();
                        notify({
                            type: 'success',
                            title: "Success!",
                            text: "Successfully added " + this.modifiedData[i].attributes.name + " to Wishlist",
                          });
                        break;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})