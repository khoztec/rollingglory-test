<script setup lang="ts">
import img from '/images/no-image.png'
const products = useProductStore()
const props = defineProps({
  itemCard: Object
})
function errorImage(e: { target: { src: string; }; }) {
    e.target.src = img
}
const getRibbonSrc = (item: any) => {
  if (props.itemCard.attributes.isNew) {
    return "/images/ribbon-new.svg";
  } else if (props.itemCard.attributes.rating > 3.9 && props.itemCard.attributes.numOfReviews > 24) {
    return "/images/ribbon-best.svg";
  } else if (props.itemCard.attributes.isNew && props.itemCard.attributes.rating > 3.9 && props.itemCard.attributes.numOfReviews > 24) {
    return "/images/ribbon-hot.svg";
  } else {
    return ""; // or provide a default ribbon image or handle accordingly
  };
}
</script>

<template>
    <div class="card h-100 position-relative overflow-hidden rounded-4">
        <img v-if="getRibbonSrc(itemCard)" :src="getRibbonSrc(itemCard)" class="position-absolute top-0 end-0" width="80" alt="ribbon">
        <div class="card-body p-4">
            <h6 class="card-subtitle text-maroon fs-6 p-2 stick-element" v-if="!props.itemCard.attributes.stock">
                Sold Out
            </h6>
            <h6 class="card-subtitle text-maroon fs-6 p-2 stick-element"
                v-else-if="props.itemCard.attributes.stock > 0 && props.itemCard.attributes.stock < 5">
                Stock &lt; 5
            </h6>
            <h6 class="card-subtitle text-success fs-6 p-2 stick-element" v-else>
                In Stock
            </h6>
            <img :src="props.itemCard.attributes.images[0]" class="img-fluid p-2" :alt="props.itemCard.attributes.name" @error="errorImage">
        </div>
        <div class="card-footer border-top-0 bg-white p-4 row">
            <div class="col-12">
                <h5 class="card-title">{{ props.itemCard.attributes.name }}</h5>
            </div>
            <div class="col-8 d-flex flex-column">
                <div class="d-flex flex-row align-items-center">
                    <img src="/images/icon-point.png" alt="Points" height="12">
                    <div class="ms-1 fs-6 text-points">{{ props.itemCard.attributes.points }} poins</div>
                </div>

                <div class="d-flex flex-row align-items-center">
                    <div class="d-block">
                        <NuxtRating :read-only="true" ratingSize="16" :ratingValue="props.itemCard.attributes.rating" />
                    </div>

                    <small class="text-secondary mx-2">{{ props.itemCard.attributes.numOfReviews }}
                        reviews</small>
                </div>
            </div>
            <div class="col-4 d-flex align-items-center">
                <button type="button" @click="products.setWishlist(props.itemCard.attributes.id)"
                    :class="props.itemCard.attributes.isWishlist ? 'btn btn-gift-active w-100 rounded-pill stick-button' : 'btn btn-gift-inactive w-100 rounded-pill stick-button'">
                    <Icon :name="props.itemCard.attributes.isWishlist ? 'mdi:heart' : 'uil:heart-alt'" />
                </button>
            </div>
        </div>
        <div v-if="!props.itemCard.attributes.stock" class='card-no-stock'></div>
        <div v-else class="card-overlay d-flex flex-column align-items-center justify-content-center p-4">
            <h5 class="card-title p-2 text-light">{{ props.itemCard.attributes.name }}</h5>
            <NuxtLink :to="'/products/' + props.itemCard.id">
                <button type="button" class="btn btn-outline-light rounded-pill w-100">
                    <Icon name="uil:eye" class="me-1" />
                    View Detail
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.card-no-stock {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e1e8ee;
    opacity: 0.7;
    border-radius: 0.375rem;
    z-index: 10;
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0.25turn, #74B71B, #649C1A);
    /* Adjust the overlay color and transparency here */
    color: #fff;
    /* Adjust text color */
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
    opacity: 0;
    /* Initially set opacity to 0 */
    transition: opacity 0.3s ease;
    /* Add smooth transition for opacity */
}

.card:hover .card-overlay {
    opacity: 0.9;
    /* Set opacity to 1 on hover */
}

.stick-element {
    position: relative;
    z-index: 2;
    /* Set a higher z-index for the "In Stock" text */
}

.stick-button {
    position: relative;
    z-index: 2;
    /* Set a higher z-index for the "In Stock" text */
}

.card:hover .stick-element {
    border-color: white;
    color: white !important;
    /* Change the color to white on hover */
}
</style>