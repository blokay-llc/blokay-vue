<script>
export default {
  props: {
    options: { type: Array, default: null, required: false },
    icon: { type: String, required: false },
    id: { type: String, required: false },
    label: { type: String, required: false },
    items: { type: Array, required: false },
    type: { type: String, required: false, default: 'text' },
    placeholder: { type: String, required: false },
    modelValue: { required: false },
    extraClass: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    name: { type: String, required: false, default: null },
    limitFiles: { type: Number, required: false, default: 1 },
    variant: { type: String, required: false, default: 'l' },
    mb: { type: String, required: false, default: 'mb-2 md:mb-4' },
    size: { type: String, required: false, default: 'md' },
    error: { type: String, required: false, default: null },
  },
  data() {
    return {
      activeInput: false,
      declaredEvents: false,
    };
  },
  mounted() {
    this.declareEvents(this.id);
  },
  methods: {
    handleChange(e) {
      let value = e.target.value;
      this.$emit('onChange', value);
    },
    declareEvents(id) {
      if (!id) return;
      if (this.declaredEvents) return;

      let el = document.getElementById(id);

      if (!el) {
        return;
      }
      this.declaredEvents = true;
      el.addEventListener('blur', () => {
        this.activeInput = false;
        this.$emit('outside');
      });
      el.addEventListener('focus', () => {
        this.activeInput = true;
      });
    },
    clickInput() {
      let el = document.getElementById(this.id);

      el && el.focus();
    },
    focus() {
      let el = document.getElementById(this.id);
      el && el.focus();
    },
    change(e) {
      let value = e.target.value;
      this.$emit('changeInput', value);
    },
  },
  watch: {
    id(a) {
      this.declareEvents(a);
    },
  },
};
</script>
