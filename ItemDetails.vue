<template>
    <section class="item-details" @click="bgClick($event)">

        <div class="item-content">

            <div class="item-info">
                <h1>{{ name }}</h1>

                <p>{{ description }}</p>

                <div v-if="brewers_tips">
                    <h2>Brewers tips</h2>
                    <p>{{ brewers_tips }}</p>
                </div>

                <div v-if="food_pairing">
                    <h2>Food pairing</h2>
                    <ul>
                        <li v-for="food in food_pairing" :key="food">
                            {{ food }}
                        </li>
                    </ul>
                </div>

                <button @click="closeDetails">Close</button>
            </div>

            <div class="item-img">
                <img :src="image_url" :alt="name" />
            </div>

        </div>

    </section>
</template>

<script>
import {eventBus} from '../main.js';

export default {
    name: 'ItemDetails',
    props: [
        'name',
        'image_url',
        'description',
        'brewers_tips',
        'food_pairing'
    ],
    methods: {
        closeDetails() {
            eventBus.$emit('closeDetails');
        },
        bgClick(e) {
            //console.log(e.target);
            // Close details if the bg is clicked 
            if (e.target.classList.contains('item-details'))
            {
                eventBus.$emit('closeDetails');
            }
        }
    }
}
</script>

<style scoped>
.item-details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .75);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    transition: opacity .5s;
    cursor: pointer;
}

.item-details.show {
    visibility: visible;
    opacity: 1;
}

.item-content {
    width: 100%;
    max-width: 768px;
    background-color: #fff;
    display: flex;
    padding: 1rem;
    transform: translateY(-100%);
    transition: transform .5s;
    cursor: default;
}

.item-details.show .item-content {
    transform: none;
}

.item-info {
    width: 75%;
}

.item-img {
    width: 25%;
    text-align: right;
}

.item-img img {
    max-height: 400px;
}

</style>