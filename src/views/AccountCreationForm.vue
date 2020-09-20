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
            v-model.lazy.trim="accountData.fullName"
            :class="{ hasErrors: !$v.accountData.fullName.required }"
            @blur="$v.accountData.fullName.$touch()"
          />
          <p
            class="error-message"
            v-if="
              !$v.accountData.fullName.required &&
                $v.accountData.fullName.$error
            "
          >* Fullname is required</p>
          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            v-model.lazy.trim="accountData.email"
            :class="{ hasErrors: !$v.accountData.email.required }"
            @blur="$v.accountData.email.$touch()"
          />
          <p
            class="error-message"
            v-if="!$v.accountData.email.required && $v.accountData.email.$error"
          >* Email is required</p>
          <p
            class="error-message"
            v-if="!$v.accountData.email.email && $v.accountData.email.$error"
          >* Must be a valid email</p>
          <label for="username">
            <b>User Name</b>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            v-model.lazy.trim="accountData.username"
            :class="{ hasErrors: !$v.accountData.username.required }"
            @blur="$v.accountData.username.$touch()"
          />
          <p
            class="error-message"
            v-if="
              !$v.accountData.username.required &&
                $v.accountData.username.$error
            "
          >* Username is required</p>
          <p class="error-message" v-if="!$v.accountData.username.minLength">
            Username must have at least
            {{ $v.accountData.username.$params.minLength.min }} letters.
          </p>
          <p class="error-message" v-if="!$v.accountData.username.maxLength">
            Username must have at most
            {{ $v.accountData.username.$params.maxLength.max }} letters.
          </p>

          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.lazy.trim="accountData.password"
            :class="{ hasErrors: !$v.accountData.password.required }"
            @blur="$v.accountData.password.$touch()"
          />
          <p
            class="error-message"
            v-if="
              !$v.accountData.password.required &&
                $v.accountData.password.$error
            "
          >Password is required</p>
          <p class="error-message" v-if="!$v.accountData.password.minLength">
            Password must have at least
            {{ $v.accountData.password.$params.minLength.min }} letters.
          </p>
          <p class="error-message" v-if="!$v.accountData.password.maxLength">
            Password must have at most
            {{ $v.accountData.password.$params.maxLength.max }} letters.
          </p>
        </div>
        <div class="buttons">
          <button type="button" class="registerbtn" @click="showNextForm">Next</button>
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
          v-model.lazy.trim="accountData.characterName"
          :class="{ hasErrors: !$v.accountData.characterName.required }"
          @blur="$v.accountData.characterName.$touch()"
        />
        <p
          class="error-message"
          v-if="
            !$v.accountData.characterName.required &&
              $v.accountData.characterName.$error
          "
        >* Character name is required</p>
        <p class="error-message" v-if="!$v.accountData.characterName.minLength">
          Character name must have at least
          {{ $v.accountData.characterName.$params.minLength.min }} letters.
        </p>
        <p class="error-message" v-if="!$v.accountData.characterName.maxLength">
          Character name must have at most
          {{ $v.accountData.characterName.$params.maxLength.max }} letters
        </p>
        <label for="characterClass">
          <b>Class</b>
        </label>
        <v-select
          class="style-chooser"
          :options="characterClasses"
          label="title"
          v-model="accountData.classType"
          placeholder="Please select..."
          :searchable="false"
          @blur="$v.accountData.classType.$touch()"
        >
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              v-bind="attributes"
              v-on="events"
              @blur="$v.accountData.classType.$touch()"
              :required="!accountData.classType"
            />
          </template>
        </v-select>
        <p
          class="error-message"
          v-if="
            !$v.accountData.classType.required &&
              $v.accountData.classType.$error
          "
        >* Character class is required</p>
        <div class="buttons">
          <button type="submit" class="registerbtn">Create</button>
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
import { REGISTER } from '../store/actions.type';
import AccountMixin from '../shared/mixins/AccountMixin';
import { getCharacterClasses } from '../utils';

export default {
  name: 'AccountCreationForm',
  mixins: [AccountMixin],
  data() {
    return {
      accountData: {
        fullName: '',
        email: '',
        username: '',
        password: '',
        characterName: '',
        classType: undefined
      },
      showNext: false,
      characterClasses: []
    };
  },
  mounted() {
    this.characterClasses = getCharacterClasses();
  },
  validations: {
    accountData: {
      fullName: { required },
      username: { required, minLength: minLength(6), maxLength: maxLength(20) },
      email: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) },
      characterName: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      },
      classType: { required }
    }
  },
  methods: {
    showNextForm() {
      if (!this.isFirstFormInvalid) {
        this.showNext = true;
      }
    },
    submitForm() {
      if (!this.$v.accountData.$invalid) {
        this.$v.$touch();
        const user = {
          fullName: this.accountData.fullName,
          email: this.accountData.email,
          username: this.accountData.username,
          password: this.accountData.password,
          characterName: this.accountData.characterName,
          classType: this.accountData.classType.code
        };
        this.$store
          .dispatch(REGISTER, user)
          .then(this.$router.push('/'))
          .error(response => {
            console.log(response, 'error');
          });
      }
    }
  },
  computed: {
    isFirstFormInvalid() {
      return (
        this.$v.accountData.fullName.$invalid ||
        this.$v.accountData.email.$invalid ||
        this.$v.accountData.username.$invalid ||
        this.$v.accountData.password.$invalid
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
  padding-left: 3rem;
  padding-right: 3rem;
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
  font-family: Rubik, Helvetica, sans-serif;
  letter-spacing: 1px;
}
label {
  margin-bottom: 0;
  color: white;
  font-family: Rubik, Arial, Helvetica, sans-serif;
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
  font-family: Rubik, Arial, Helvetica, sans-serif;
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
  font-family: Rubik, Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
