import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuth = ref(localStorage.getItem('isAuth') ?? false)

const useAuth = () => {
	const password = 'bacon'
	const router = useRouter()

	const signOut = () => {
		isAuth.value = false
		localStorage.setItem('isAuth', false)
		router.push('/')
	}

	const isValidPassword = (guess) => {
		if (guess === password) {
			isAuth.value = true
			localStorage.setItem('isAuth', true)
			return true
		}

		return false
	}

	return { password, isAuth, isValidPassword, signOut }
}

export default useAuth
