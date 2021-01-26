<template>
  <div class="lights">

    <Light
        v-for="(light, i) of lights"
        v-bind:light="light"
        v-bind:count="this.activeLight.count"
        v-bind:color="this.activeLight.color"
        v-bind:key="i"
    />

    <button
        class="state-btn"
        @click="saveState">Сохранить состояние светофора!
    </button>

    <button
        class="state-btn"
        @click="clearState">Отменить сохранение
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {getColor} from '@/api/getColor'
import {getColorFromRouter} from '@/api/getColorFromRouter'
import Light from '@/components/Light.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Light,
  },
  mounted() {
    const activeLight = localStorage.getItem('activeLight')
    const prevColor = localStorage.getItem('prevColor')
    if (activeLight !== null) {
      this.activeLight = JSON.parse(activeLight)
      if (!!prevColor) this.prevColor = prevColor
    } else {
      this.activeLight = getColorFromRouter(this.$route.params.color as string)
    }
    setTimeout(() => {
      this.tick()
    }, 1000)
  },
  data: () => ({
    lights: ['red', 'yellow', 'green'],
    activeLight: {
      color: 'red',
      count: 10,
    } as {
      color: 'red' | 'yellow' | 'green',
      count: number,
    },
    prevColor: '',
  }),
  methods: {
    tick() {
      this.activeLight.count--

      if (this.activeLight.count === 0) {
        if (this.activeLight.color === 'red' || this.activeLight.color === 'green') {
          this.prevColor = this.activeLight.color
        }

        const newColor = getColor(this.activeLight.color, this.prevColor)

        this.$router.push('/' + newColor.color)

        this.activeLight = newColor
      }

      setTimeout(this.tick, 1000)
    },
    saveState() {
      localStorage.setItem('activeLight', JSON.stringify(this.activeLight))
      localStorage.setItem('prevColor', this.prevColor)
    },
    clearState() {
      localStorage.clear()
    },
  },
})
</script>

<style lang="sass">
.lights
  width: 5em
  height: 15em
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  background-color: #2c3e50
  border-radius: 1em

.state-btn
  padding: .5em 1em
  margin-top: 1em
  background-color: coral
  border: none
  cursor: pointer
  font-size: 1rem
  border-radius: .5em
  &:hover,
  &:focus,
  &:active
    outline: none
</style>