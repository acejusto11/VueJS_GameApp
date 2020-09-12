<template>
  <div class="main">
    <form @submit.prevent="submitForm" class="formContainer">
      <div class="container">
        <div>
          <label for="Username">
            <b>Username</b>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            v-model.lazy.trim="username"
            :class="{ hasErrors: !$v.username.required }"
            @blur="$v.username.$touch()"
          />
          <p
            class="error-message"
            v-if="!$v.username.required && $v.username.$error"
          >
            Username is required
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
        </div>
        <div>
          {{ errorMessage }}
        </div>
        <button type="submit" class="button" @click="submitForm">
          Login
        </button>
        <button type="buttton" class="button" @click="goToAccountCreation">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import AccountMixin from '../../shared/mixins/AccountMixin';

export default {
  name: 'LoginForm',
  mixins: [AccountMixin],
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
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
        this.login(loginData)
          .then(loginResponse => {
            this.$emit('set-authentication', loginResponse.body.accountId);
          })
          .catch(loginError => {
            const { body } = loginError;
            if (body.code === 404) {
              this.errorMessage =
                'Your username or password might be incorrect';
            } else {
              this.errorMessage =
                'An error has occured. Please contact the system administrator.';
            }
            console.log(loginError, 'loginError');
          });
      }
    },
    goToAccountCreation() {
      this.$router.push('createaccount');
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
  background-image: url('../../assets/dragon_slayer_wall2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formContainer {
  background-color: rgb(3 0 0 / 70%);
  width: 50%;
  height: 60%;
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
