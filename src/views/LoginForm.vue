<template>
  <div class="main flex">
    <form @submit.prevent="submitForm" class="formContainer" autocomplete="off">
      <h1>Login</h1>
      <div class="container">
        <div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            v-model.lazy.trim="username"
            :class="{ hasErrors: !$v.username.required }"
            @blur="$v.username.$touch()"
            autocomplete="off"
          />
          <p
            class="error-message"
            v-if="!$v.username.required && $v.username.$error"
          >* Username is required</p>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autocomplete="off"
            v-model.lazy.trim="password"
            :class="{ hasErrors: !$v.password.required }"
            @blur="$v.password.$touch()"
          />
          <p
            class="error-message"
            v-if="!$v.password.required && $v.password.$error"
          >* Password is required</p>
        </div>
        <span>{{ error }}</span>
        <button type="submit" class="button" @click="submitForm">Login</button>
        <span>OR</span>
        <button type="buttton" class="button" @click="goToAccountCreation">Register New Account</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { LOGIN } from '../store/actions.type';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  mounted() {},
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.$v.$touch();
        const loginData = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch(LOGIN, loginData).then(response => {
          this.$session.start();
          this.$session.set('accountId', response.accountId);
          this.$http.headers.common['Authorization'] =
            'Bearer ' + response.accountId;
          this.$router.push({ name: 'character' }, () => {});
        });
      }
    },
    goToAccountCreation() {
      this.$router.push('register');
    }
  },
  computed: {
    error() {
      return (
        this.$store.state.authentication.errors &&
        this.$store.state.authentication.errors.error
      );
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.flex {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  margin-bottom: 2rem;
  color: white;
}

span {
  color: white;
  font-family: Rubik, Arial, Helvetica, sans-serif;
}

.formContainer {
  display: flex;
  flex-direction: column;
  background-color: rgb(3 0 0 / 70%);
  width: 50%;
  border: 20px solid rgb(3 2 2 / 50%);
  padding: 2rem 6rem 6rem 6rem;
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
.button {
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
