<template>
  <div class="main">
    <form @submit.prevent="submitForm" class="formContainer">
      <div class="container" v-if="!showNext">
        <h1>Register</h1>
        <!-- TODO: Create custom components for inputs  -->
        <div>
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
        </div>
        <div class="buttons">
          <button type="button" class="registerbtn" @click="showNextForm">
            Next
          </button>
        </div>
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
          class="style-chooser"
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
        <div class="buttons">
          <button type="submit" class="registerbtn">
            Create
          </button>
        </div>
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
import { saveItemFromLocalStorage, getCharacterClasses } from '../utils';

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
        saveItemFromLocalStorage('currentUser', JSON.stringify(user));
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

.main {
  margin: 0px;
  background: rgba(0, 0, 0, 0.1);
  background-image: url('../assets/dragon_slayer_wall2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formContainer {
  background-color: rgb(3 0 0 / 50%);
  width: 50%;
  height: 100%;
  border: 20px solid rgb(3 2 2 / 50%);
  padding: 10px;
}

.buttons {
  position: fixed;
  width: 45%;
  bottom: 20px;
  margin: 0 auto;
}

h1 {
  color: white;
}

p {
  color: white;
  font-weight: 700;
  font-family: Helvetica, sans-serif;
  letter-spacing: 1px;
}
label {
  margin-bottom: 0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 5px;
  margin: 5px 0 15px 0;
  display: inline-block;
  background: #f1f1f1;
  font-weight: 700;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
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
  border-radius: 4px;
  font-size: 1.25rem;
}
.registerbtn:hover {
  opacity: 1;
}
.hasErrors {
  border: 1px solid red;
}
.error-message {
  color: white;
}

.style-chooser .vs__dropdown-toggle {
  background-color: white !important;
}
.vs__dropdown-toggle,
.vs--unsearchable {
  background-color: white !important;
  font-weight: 700;
  margin-bottom: 20px;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-menu {
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
