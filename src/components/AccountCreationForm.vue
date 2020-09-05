<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="container" v-if="!showNext">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <!-- TODO: Create custom components for inputs  -->
        <label for="fullName">
          <b>Fullname</b>
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          v-model.lazy.trim="fullName"
          :class="{ hasErrors: !$v.fullName.required }"
          @blur="$v.fullName.$touch()"
        />
        <p
          class="error-message"
          v-if="!$v.fullName.required && $v.fullName.$error"
        >
          Fullname is required
        </p>
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          name="email"
          id="email"
          v-model.lazy.trim="email"
          :class="{ hasErrors: !$v.email.required }"
          @blur="$v.email.$touch()"
        />
        <p class="error-message" v-if="!$v.email.required && $v.email.$error">
          Email is required
        </p>
        <p class="error-message" v-if="!$v.email.email && $v.email.$error">
          Must be a valid email
        </p>
        <label for="userName">
          <b>User Name</b>
        </label>
        <input
          type="text"
          name="userName"
          id="userName"
          v-model.lazy.trim="userName"
          :class="{ hasErrors: !$v.userName.required }"
          @blur="$v.userName.$touch()"
        />
        <p
          class="error-message"
          v-if="!$v.userName.required && $v.userName.$error"
        >
          Username is required
        </p>
        <p class="error-message" v-if="!$v.userName.minLength">
          Username must have at least
          {{ $v.userName.$params.minLength.min }} letters.
        </p>
        <p class="error-message" v-if="!$v.userName.maxLength">
          Username must have at most
          {{ $v.userName.$params.maxLength.max }} letters.
        </p>

        <label for="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model.lazy.trim="password"
          :class="{ hasErrors: !$v.password.required }"
          @blur="$v.password.$touch()"
        />
        <p
          class="error-message"
          v-if="!$v.password.required && $v.password.$error"
        >
          Password is required
        </p>
        <p class="error-message" v-if="!$v.password.minLength">
          Password must have at least
          {{ $v.userName.$params.minLength.min }} letters.
        </p>
        <p class="error-message" v-if="!$v.password.maxLength">
          Password must have at most
          {{ $v.password.$params.maxLength.max }} letters.
        </p>
        <button type="button" class="registerbtn" @click="showNextForm">
          Next
        </button>
      </div>
      <div class="container" v-else>
        <label for="characterName">
          <b>Character name</b>
        </label>
        <input
          type="text"
          name="characterName"
          id="characterName"
          v-model.lazy.trim="characterName"
          :class="{ hasErrors: !$v.characterName.required }"
          @blur="$v.characterName.$touch()"
        />
        <p
          class="error-message"
          v-if="!$v.characterName.required && $v.characterName.$error"
        >
          Character name is required
        </p>
        <p class="error-message" v-if="!$v.characterName.minLength">
          Character name must have at least
          {{ $v.characterName.$params.minLength.min }} letters.
        </p>
        <p class="error-message" v-if="!$v.characterName.maxLength">
          Character name must have at most
          {{ $v.characterName.$params.maxLength.max }} letters
        </p>
        <label for="characterClass">
          <b>Class</b>
        </label>
        <v-select
          :options="characterClasses"
          label="title"
          v-model="characterClass"
          placeholder="Please select..."
          :searchable="false"
          @blur="$v.characterClass.$touch()"
        >
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              v-bind="attributes"
              v-on="events"
              @blur="$v.characterClass.$touch()"
              :required="!characterClass"
            />
          </template>
        </v-select>
        <p
          class="error-message"
          v-if="!$v.characterClass.required && $v.characterClass.$error"
        >
          Character class is required
        </p>
        <button type="submit" class="registerbtn">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
import { saveItem, getCharacterClasses } from '../utils';

export default {
  data() {
    return {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      characterName: '',
      characterClass: '',
      showNext: false,
      options: ['1', '2'],
      characterClasses: []
    };
  },
  mounted() {
    this.characterClasses = getCharacterClasses();
  },
  validations: {
    fullName: { required },
    userName: { required, minLength: minLength(6), maxLength: maxLength(20) },
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    characterName: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20)
    },
    characterClass: { required }
  },
  methods: {
    showNextForm() {
      if (!this.isFirstFormInvalid) {
        this.showNext = true;
      }
    },
    submitForm() {
      if (!this.$v.$invalid) {
        this.$v.$touch();
        const user = {
          userName: this.userName,
          characterName: this.characterName,
          characterClass: this.characterClass
        };
        saveItem('currentUser', JSON.stringify(user));
        this.$emit('account-created', true);
      }
    }
  },
  computed: {
    isFirstFormInvalid() {
      return (
        this.$v.fullName.$invalid ||
        this.$v.email.$invalid ||
        this.$v.userName.$invalid ||
        this.$v.password.$invalid
      );
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  padding: 16px;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  background: #f1f1f1;
  border: 1px solid lightgray;
}

input[type='text']:focus,
input[type='password']:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
.registerbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
.registerbtn:hover {
  opacity: 1;
}
.hasErrors {
  border: 1px solid red;
}
.error-message {
  color: red;
}
</style>
