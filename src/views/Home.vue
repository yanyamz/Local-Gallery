<script setup>
import { useRouter } from 'vue-router'
import { ref } from '@vue/runtime-core'
import useAuth from '@/composables/auth.js'

const router = useRouter()

const { isValidPassword } = useAuth()
const password = ref('')

const onSubmit = () => {
	if (isValidPassword(password.value)) router.push('/gallery')
}
</script>

<template>
	<div class="container">
		<section class="hero is-medium is-primary">
			<div class="hero-body">
				<p class="title">
					Mugi
				</p>
				<p class="subtitle">
					A personal file hosting service
				</p>
			</div>
		</section>
		<form class="form" @submit.prevent="onSubmit">
			<div class="field">
				<label class="label">Password</label>
				<div class="block control">
					<input
						ref="$password"
						class="input"
						type="password"
						placeholder="password"
						v-model="password"
					/>
				</div>
				<button type="submit" class="block button is-primary">
					Login
				</button>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.form {
	margin: 50px auto;
	max-width: 500px;
}
</style>
