<template>
  <div class="styler" v-if="$builder.isEditing" :class="{ 'is-visible': isVisible }" ref="styler" id="styler"
       @click.stop="">
    <ul class="styler-list">
      <li v-if="type === 'button'">
        <button class="styler-button" @click="updateOption('link')">
          <icons name="link"/>
        </button>
      </li>
      <template v-if="type === 'text'">
        <li>
          <button class="styler-button" @click="updateOption('textColor')">
            <icons name="palettes"/>
          </button>
        </li>
        <li>
          <button class="styler-button" @click="updateOption('align')">
            <icons name="align"/>
          </button>
        </li>
        <li>
          <button class="styler-button" @click="updateOption('textStyle')">
            <icons name="textStyle"/>
          </button>
        </li>
      </template>
    </ul>
    <ul class="styler-list">
      <li v-if="currentOption === 'textColor'">
        <ul class="colorer styler-list">
          <li v-for="(color, index) in colors" :key="index">
            <input type="radio" :id="`color${color.charAt(0).toUpperCase() + color.slice(1)}`" name="colorer"
                   :value="textColors[index]" v-model="textColor">
          </li>
        </ul>
      </li>
      <li v-if="currentOption === 'link'">
        <div class="igroup is-rounded has-itemAfter is-primary">
          <input type="text" class="input" placeholder="لینک مورد نظر را وارد کنید" v-model="url">
          <button class="button" @click="addLink">
            <icons name="link"/>
          </button>
        </div>
      </li>
      <li v-if="currentOption === 'align'">
        <ul class="styler-list align">
          <li>
            <button class="styler-button" @click="execute('justifyright')">
              <icons name="right"/>
            </button>
          </li>
          <li>
            <button class="styler-button" @click="execute('justifycenter')">
              <icons name="center"/>
            </button>
          </li>
          <li>
            <button class="styler-button" @click="execute('justifyleft')">
              <icons name="left"/>
            </button>
          </li>
        </ul>
      </li>
      <li v-if="currentOption === 'textStyle'">
        <ul class="styler-list align">
          <li>
            <button class="styler-button" @click="execute('bold')">
              <icons name="bold"/>
            </button>
          </li>
          <li>
            <button class="styler-button" @click="execute('italic')">
              <icons name="italic"/>
            </button>
          </li>
          <li>
            <button class="styler-button" @click="execute('underline')">
              <icons name="underline"/>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {createPopper} from "@popperjs/core";
import Icons from './Icons';
import {isParentTo} from '../util';

export default {
  components: {Icons},
  props: {
    el: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    section: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      colors: ['blue', 'green', 'red', 'black', 'white'],
      textColors: ['#4da1ff', '#38E4B7', '#EA4F52', '#000000', '#FFFFFF'],
      textColor: '',
      isVisible: false,
      currentOption: '',
      url: ''
    }
  },
  watch: {
    textColor() {
      this.execute('forecolor', this.textColor)
      console.log(this.textColor);
    }
  },
  created() {
    if (this.type === 'button') {
      this.url = this.section.get(`${this.name}.href`);
      this.el.contentEditable = 'true';
    }
    if (this.type === 'text') {
      this.el.contentEditable = 'true';
    }
  },
  mounted() {
    if (!this.$builder.isEditing) return;
    this.el.addEventListener('click', this.showStyler);
  },
  methods: {
    updateOption(option) {
      this.currentOption = option;
      this.$nextTick(() => {
        this.popper.update();
      });
    },
    addLink() {
      console.log(this.section);
      this.section.set(`${this.name}.href`, this.url);
    },
    addClass() {

    },
    showStyler(event) {
      event.stopPropagation();
      if (this.isVisible) return;
      this.isVisible = true;

      if (!this.popper) {
        const position = this.$props.type === 'section' ? 'left-start' : 'top';
        console.log(this.$refs);
        this.popper = createPopper(this.el, this.$refs.styler, {
          placement: position
        });
      }
      document.addEventListener('click', this.hideStyler, true);
      this.currentOption = '';
    },
    hideStyler(event) {
      if (
          (event && isParentTo(event.target, this.$el)) ||
          (event && isParentTo(event.target, this.el))
      ) {
        return
      }

      this.isVisible = false;
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
      document.removeEventListener('click', this.hideStyler, true);

      if (this.type === 'button') {
        this.section.set(`${this.name}.text`, this.el.innerHTML);
        return;
      }

      this.section.set(this.name, this.el.innerHTML);
    },
    execute(command, value = null) {
      this.el.focus();
      document.execCommand(command, false, value);
    },
  }
}
</script>

<style scoped>
.styler {
  position: absolute;
  top: 0;
  z-index: 200;
  visibility: hidden;
  opacity: 0;
  margin: 10px 0;
  padding: 5px;
  background: #323c47;
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.styler-list {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.styler-input {
  background: #fff;
  color: #323c47;
  border: 0;
  outline: 0;
}

.styler-button {
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  background: #323c47;
  border: 0;
  fill: #fff;
  color: #fff;
  width: 42px;
  height: 42px;
  border-radius: 42px;
  margin: 0 5px 0 0;
}

.colorer {
  height: 42px;
}

.colorer li > input {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 40px;
  border: 4px solid #222830;
  margin: 0 5px;
  outline: none;
}

.colorer li > input:checked {
  border-color: #475564;
}

.colorer li > input:hover {
  border-color: #475564;
}

.colorer li > input#colorRed {
  background: #ff3d3d;
}

.colorer li > input#colorBlue {
  background: #0072FF;
}

.colorer li > input#colorGreen {
  background: #18d88b;
}

.colorer li > input#colorBlack {
  background: #000;
}

.colorer li > input#colorWhite {
  background: #fff;
}

.styler-button:hover {
  background: #222830;
}

.styler-button:first-child {
  margin-left: 5px;
}

.styler-selctor {
  margin: 0 5px;
}

.align {
  height: 42px;
}

.styler.is-visible {
  visibility: visible;
  opacity: 1;
}

.styler .igroup {
  display: flex;
  margin: 5px;
}

.input {
  border: none;
  width: 100%;
  border-radius: 0px 20px 20px 0px;
  padding: 4px;
  padding-top: 6px;
  padding-right: 10px;
}

.button {
  border: none;
  border-radius: 20px 0px 0px 20px;
  background: #0d6efd;
  color: #fff;
  fill: #fff;
  padding: 8px;
}

.button:hover {
  background: #0b5ed7;
}

.igroup {
  margin: 5px;
}
</style>