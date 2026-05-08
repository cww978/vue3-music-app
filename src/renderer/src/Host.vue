<template>
  <div class="flex items-center justify-center min-h-screen bg-red-500">
    <div class="bg-blue-500 p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center text-white">Setup</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="baseUrl" class="block text-sm font-medium text-yellow-300 mb-2">
            API Base URL
          </label>
          <input
            id="baseUrl"
            v-model="baseUrl"
            type="url"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-green-200"
            placeholder="https://api.example.com"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save and Continue
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHostStore } from '@/stores/host'

const hostStore = useHostStore()
const baseUrl = ref('')

const handleSubmit = () => {
  if (baseUrl.value.trim()) {
    hostStore.setHost(baseUrl.value.trim())
  }
}
</script>

<style scoped>
/* Custom styles can be added here */
</style>