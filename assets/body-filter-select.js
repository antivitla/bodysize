export default {
  template: `
    <a class="body-filter-select">
      <span>{{ currentLabel }}</span><span v-if="unit">{{ unit }}</span>
      <select v-model="selectedValue">
        <option v-for="option in options" :value="option.value">{{ option.label }}</option>
      </select>
    </a>
  `,
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number, null],
      required: true
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedValue: null
    };
  },
  watch: {
    value () {
      this.sync();
    },
    selectedValue (value) {
      if (value !== this.value)
      this.$emit('select', value);
    }
  },
  computed: {
    currentLabel () {
      return this.options.find(option => {
        return String(option.value) === String(this.selectedValue);
      })?.label || '';
    }
  },
  created () {
    this.sync();
  },
  methods: {
    sync () {
      this.selectedValue = this.value !== null ? this.value : (this.options[0]?.value || null);
    }
  }
}