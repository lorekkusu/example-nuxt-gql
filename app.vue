<template>
  <div class="main-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Login
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          Register
        </router-link>
      </p>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="submitForm">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus-outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div class="mt-6">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus-outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div class="mt-6">
            <button type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
      </div>
      <div class="mt-6 break-all">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'admin@example.com',
      password: 'admin',
      message: ''
    }
  },
  methods: {
    submitForm() {
      const query = gql`
        mutation TokenCreate($email: String!, $password: String!) {
          tokenCreate(email: $email, password: $password) {
            token,
            refreshToken,
            csrfToken,
            errors {
              message
            }
          }
        }
      `;

      const variables = {
        email: this.email,
        password: this.password
      };

      const { mutate, onDone, onError } = useMutation(query)
      onDone((resp) => {
        this.message = resp.data?.tokenCreate?.token ?? resp.errors[0].message;
      })
      onError((error) => {
        console.error(error)
      })
      mutate(variables)
    }
  }
}
</script>
