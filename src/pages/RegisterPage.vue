<script setup>
import GuestLayout from "../layouts/GuestLayout.vue";
import {reactive, ref} from "vue";
import InputLabel from "../components/InputLabel.vue";
import TextInput from "../components/TextInput.vue";
import InputError from "../components/InputError.vue";
import PrimaryButton from "../components/PrimaryButton.vue";

const form = reactive({
  username: '',
  name: '',
  rate: '',
  password: '',
});

const errors = reactive({
  username: '',
  name: '',
  rate: '',
  password: '',
})

const processing = ref(false);

const submit = async () => {
  processing.value = true;



};
</script>

<template>
  <GuestLayout>
    <form @submit.prevent="submit">

      <div class="mt-4">
        <InputLabel for="username" value="Username" />

        <TextInput
            id="username"
            type="text"
            class="mt-1 block w-full"
            v-model="form.username"
            required
            autofocus
            autocomplete="username"
        />

        <InputError class="mt-2" :message="errors.username" />
      </div>

      <div class="mt-4">
        <InputLabel for="name" value="Name" />

        <TextInput
            id="name"
            type="text"
            class="mt-1 block w-full"
            v-model="form.name"
            required
            autocomplete="name"
        />

        <InputError class="mt-2" :message="errors.name" />
      </div>

      <div class="mt-4">
        <InputLabel for="rate" value="Rate" />

        <TextInput
            id="rate"
            type="number"
            class="mt-1 block w-full"
            v-model="form.rate"
            required
            autocomplete="rate"
        />

        <InputError class="mt-2" :message="errors.rate" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput
            id="password"
            type="password"
            class="mt-1 block w-full"
            v-model="form.password"
            required
            autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors.password" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <router-link
            to="/"
            class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Already registered?
        </router-link>

        <PrimaryButton class="ms-4" :class="{ 'opacity-25': processing }" :disabled="processing">
          Register
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
