<script>

export default {
  data() {
    return {
        loader: undefined,
    }
  },
  methods: {
    showLoader() {
      this.loader = this.$loading.show({ loader: 'bars', width: 800, height: 200});
    },
    hideLoader() {
      setTimeout(() => this.loader.hide(), 1000);}
    },
};
</script>