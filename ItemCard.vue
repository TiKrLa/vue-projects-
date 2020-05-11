<template>
    <div class="item">
        <img :src="image" class="item-img" :alt="name" />
        <h2>{{ name }}</h2>
        <p>{{ tagline }}</p>
        <button @click="showDetails" class="item-button">Show details</button>
    </div>
</template>

<script>
import {eventBus} from '../main.js';


export default {
    name: 'ItemCard',
    props: [
        'id',
        'image',
        'name',
        'tagline'
    ],
    methods: {
        showDetails() {
            //console.log('Pitäis näyttää detailit kaljalle' + this.id);
            eventBus.$emit('showDetails', this.id);
        }
    }
}
</script>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    width: 32%;
    background-color: #fff;
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
}
.item-img {
    max-height: 240px;
    width: auto;
    align-self: center;
}
.item-button {
    margin: auto auto 0 auto;
}
</style>