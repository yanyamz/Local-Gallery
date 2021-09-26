<script setup>
import { onMounted, ref } from '@vue/runtime-core'

const images = ref([])
const serverUrl = 'http://localhost:5000/images'

onMounted(() => {
	getImages()
})

const getImages = async () => {
	const imagesFromServer = await fetchImages()
	images.value = imagesFromServer
}

// Fetch images from the server
const fetchImages = async () => {
	const res = await fetch(serverUrl)
	const data = await res.json()
	return data
}

// Add images to server
const uploadImages = async (imageUrl) => {
	const res = await fetch(serverUrl, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ url: imageUrl }),
	})
	const data = await res.json()
	images.value.unshift(data)
}
</script>

<template>
	<div class="container">
		<h1>Gallery</h1>
		<!-- <form @submit.prevent="addImage(imageUrl)">
			<input v-model="imageUrl" type="text" placeholder="Add image by URL" />
			<input type="submit" />
		</form> -->
		<form
			action="/"
			@submit.prevent="uploadImages(e)"
			enctype="multipart/form-data"
			method="post"
		>
			<input type="file" name="multi-files" accept="image/*" multiple />
			<input type="submit" value="Upload" />
		</form>
		<div class="gallery">
			<div
				v-for="image in images"
				:key="image.id"
				class="gallery__img-container"
				:style="{
					background: `url(${image.url})`,
					'background-size': 'contain',
					'background-position': 'center',
					'background-repeat': 'no-repeat',
				}"
			></div>
		</div>
	</div>
</template>

<style lang="scss">
.container {
	max-width: 1440px;
	margin: 0 auto;
	padding: 3rem;
}
.gallery {
	padding-top: 2rem;
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	grid-template-rows: masonry;

	&__img-container {
		display: block;
		max-width: 100%;
		height: 30rem;
	}
}
</style>
