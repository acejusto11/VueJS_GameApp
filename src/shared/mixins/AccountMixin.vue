<script>
const apiUrl = 'https://monster-slayer-api-staging.herokuapp.com';

export default {
  methods: {
    createAccount(data) {
      return this.$http.post(`${apiUrl}/accounts`, data);
    },
    login(data) {
      return this.$http.post(`${apiUrl}/accounts/login`, data);
    },
    getAccountCharacter(accountId) {
      return this.$http.get(`${apiUrl}/accounts/${accountId}/character`);
    }
  }
};
</script>
