<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-contronl">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" @blur="clearState"/>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" @blur="clearState"/>
      </div>
        <p v-if="!formIsValid">Please enter a valid email and password!(Must be at least 6 characters) </p>
      <base-button>{{submitButtonCaption}}</base-button>
      <base-button type="button" mode="flat">{{switchModeButtonCaption}}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
    data() {
        return {
        email: '',
        password: '',
        formIsValid: true,
        mode: 'login'
        }},
    computed: {
        submitButtonCaption(){
            return this.mode === "login" ? "Login" : "Signup"
        },
        switchModeButtonCaption(){
            return this.mode === "login" ? "Signup instead" : "Login instead"
        }
    },
    methods: {
        clearState(){
            this.formIsValid = true;
        },
        submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }
            this.switchMode();
            if (this.mode === 'login') {
                // Send a request to login

            } else {
                // Send a request to signup
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password
                })
            }
        },
        switchMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login';
        }
    }
  }
</script>


<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
form p {
  color: red;
}
</style>
