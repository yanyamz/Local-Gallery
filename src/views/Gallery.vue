<script setup>
import { onMounted, ref } from '@vue/runtime-core'

const images = ref([])
const jsonServer = 'http://localhost:5000/images'
const server = 'http://localhost:3000'

onMounted(() => {
	getImages()
})

const getImages = async () => {
	const imagesFromServer = await fetchImages()
	images.value = imagesFromServer
}

// Fetch images from the server
const fetchImages = async () => {
	const res = await fetch(jsonServer)
	const data = await res.json()
	return data
}

// Add images to server
const fileUploader = ref(null)

const isValidExtension = (extension) => {
	switch (extension) {
		case 'jpg':
		case 'png':
		case 'jpeg':
			return true
	}
	return false
}

const uploadImages = async () => {
	const files = fileUploader.value.files
	let fileNames = []
	for (const key in files) {
		fileNames.push(files[key]?.name)
	}
	fileNames = fileNames.slice(0, fileNames.length - 2)

	fileNames.forEach((fileName) => {
		const [, , extension] = fileName.match(/(\.)(\w+)/)
		if (!isValidExtension(extension)) {
			return
		}
	})

	// For each filename, input them into the DB
	for (let i = 0; i < fileNames.length; i++) {
		try {
			const res = await fetch(jsonServer, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ name: fileNames[i] }),
			})
			const data = await res.json()
			images.value.unshift(data)
		} catch (e) {
			console.log(e)
		}
	}

	// Upload them onto server
	for (let i = 0; i < fileNames.length; i++) {
		await new Promise((resolve) => setTimeout(resolve, 300))
		try {
			const data = new FormData()
			console.log(fileUploader.value.files[i])
			data.append('multi-files', fileUploader.value.files[i])
			await fetch(server, {
				method: 'POST',
				body: data,
			})
		} catch (e) {
			console.log(e)
		}
	}
	window.location.reload()
}
</script>

<template>
	<div class="container">
		<router-view></router-view>
		<h1>Gallery</h1>
		<form
			@submit.prevent="uploadImages"
			action="/"
			enctype="multipart/form-data"
			method="post"
		>
			<input
				type="file"
				name="multi-files"
				accept="image/*"
				ref="fileUploader"
				multiple
			/>
			<input type="submit" value="Upload" />
		</form>
		<div class="gallery">
			<div
				v-for="image in images"
				:key="image.id"
				class="gallery__img-container"
			>
				<img :src="`../../uploads/${image.name}`" alt="image" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.container {
	max-width: 1440px;
	margin: 0 auto;
	padding: 30px;
}
.gallery {
	padding-top: 20px;
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

	&__img-container {
		display: block;
		width: 100%;
		height: 200px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
		}
	}
}
</style>
