<script setup lang="ts">
const route = useRoute()
const getDetails = await $fetch('https://recruitment.dev.rollingglory.com/api/v2/gifts/' + route.params.id)
const details = getDetails.data
const { notify } = useNotification();
const getRibbonSrc = (item: any) => {
    if (item.attributes.isNew) {
        return "/images/ribbon-new.svg";
    } else if (item.attributes.rating > 4 && item.attributes.numOfReviews > 25) {
        return "/images/ribbon-best.svg";
    } else if (item.attributes.isNew && item.attributes.rating > 4 && item.attributes.numOfReviews > 25) {
        return "/images/ribbon-hot.svg";
    } else {
        return ""; // or provide a default ribbon image or handle accordingly
    };
}
async function setWishlistItem(id) {
    const todo = await $fetch('https://recruitment.dev.rollingglory.com/api/v2/gifts/' + id + '/wishlist', {
        method: 'POST',
    })
    details.attributes.isWishlist = 1
    notify({
      type: 'success',
      title: "Success!",
      text: "Successfully added to Wishlist",
    });
}
const title = `Test RGB | ${details.attributes.name}`
useSeoMeta({
    ogTitle: () => title,
    title: () => title,
    description: () => details.attributes.info,
    ogDescription: () => details.attributes.info,
    ogImage: () => details.attributes.images[0],
    ogImageUrl: () => details.attributes.images[0],
    twitterCard: () => details.attributes.slug,
    twitterTitle: () => title,
    twitterDescription: () => details.attributes.info,
    twitterImage: () => details.attributes.images[0]
})
</script>

<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-12">
                <div><span>
                        <NuxtLink :to="'/'" class="text-decoration-none text-black">List Product</NuxtLink>
                    </span> > {{ details.attributes.name }}</div>
            </div>
            <div class="col-12 col-sm-6 p-5 position-relative">
                <img v-if="getRibbonSrc(details)" :src="getRibbonSrc(details)" class="position-absolute top-0 end-0"
                    alt="ribbon">
                <img :src="details.attributes.images[0]" class="img-fluid p-2" :alt="details.attributes.name">
            </div>
            <div class="col-12 col-sm-6 p-5">
                <h2 class="fw-bold">{{ details.attributes.name }}</h2>
                <div class="d-flex flex-row align-items-center py-2">
                    <div class="d-block">
                        <NuxtRating :read-only="true" :rating-size="'24px'" :ratingValue="details.attributes.rating" />
                    </div>
                    <div class="text-secondary ms-2">{{ details.attributes.numOfReviews }} reviews</div>
                </div>
                <div class="d-flex flex-row align-items-center py-2">
                    <img src="/images/icon-point-detail.svg" alt="Points" height="20">
                    <div class="fs-4 mx-3 text-points fw-bold">{{ details.attributes.points }} poins</div>
                    <div class="card-subtitle text-maroon fs-6 fw-semibold" v-if="!details.attributes.stock">
                        Sold Out
                    </div>
                    <div class="card-subtitle text-maroon fs-6 fw-semibold"
                        v-else-if="details.attributes.stock > 0 && details.attributes.stock < 5">
                        Stock &lt; 5
                    </div>
                    <div class="card-subtitle text-success fs-6 fw-semibold" v-else>
                        In Stock
                    </div>
                </div>
                <div class="py-2" v-html="details.attributes.info" />
                <div class="py-2 row g-4">
                    <div class="col-2">
                        <button type="button" @click="setWishlistItem(details.attributes.id)"
                            :class="details.attributes.isWishlist ? 'btn btn-gift-active btn-lg fw-light w-100 rounded-pill' : 'btn btn-gift-inactive btn-lg fw-light w-100 rounded-pill'">
                            <Icon :name="details.attributes.isWishlist ? 'uil:heart' : 'uil:heart-alt'" />
                        </button>
                    </div>
                    <div class="col-5">
                        <button type="button" class="btn btn-success btn-lg fw-light w-100 rounded-pill">
                            Redeem
                        </button>
                    </div>
                    <div class="col-5">
                        <button type="button" class="btn btn-points-outline btn-lg fw-light w-100 rounded-pill">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 p-5">
                <div class="py-2">
                    <ul class="nav nav-underline">
                        <li class="nav-item">
                            <a class="nav-link text-points active fs-4 px-0" aria-current="page" href="#">Info Produk</a>
                        </li>
                    </ul>
                </div>
                <div class="py-2">
                    <h3 class=" text-success fw-light">
                        Rincian
                    </h3>
                </div>
                <div class="py-2 lh-lg" v-html="details.attributes.description" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>