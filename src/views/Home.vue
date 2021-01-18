<template>
  <div class="home">
    <div class="lights">

      <div class="light">
        <div
            :class="{active: activeLight.color === 'red', animate: activeLight.color === 'red' && activeLight.count <= 3}"
            class="circle red">
          <div v-if="activeLight.color === 'red'" class="number">
            {{ this.activeLight.count }}
          </div>
        </div>
      </div>

      <div class="light">
        <div
            :class="{active: activeLight.color === 'yellow', animate: activeLight.color === 'yellow' && activeLight.count <= 3}"
            class="circle yellow">
          <div v-if="activeLight.color === 'yellow'" class="number">
            {{ this.activeLight.count }}
          </div>
        </div>
      </div>

      <div class="light">
        <div
            :class="{active: activeLight.color === 'green', animate: activeLight.color === 'green' && activeLight.count <= 3}"
            class="circle green">
          <div v-if="activeLight.color === 'green'" class="number">
            {{ this.activeLight.count }}
          </div>
        </div>
      </div>

      <button
          class="save-btn"
          @click="saveState">Сохранить состояние светофора!
      </button>
      <button
          class="clear-btn"
          @click="clearState">Отменить сохранение
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {getColor} from '@/api/getColor'
import {getColorFromRouter} from '@/api/getColorFromRouter'

export default defineComponent({
  name: 'Home',
  components: {},
  mounted() {
    const activeLight = localStorage.getItem('activeLight')
    if (activeLight !== null) {
      this.activeLight = JSON.parse(activeLight)
    } else {
      this.activeLight = getColorFromRouter(this.$route.params.color as string)
    }
    setTimeout(() => {
      this.tick()
    }, 1000)
  },
  data: () => ({
    count: 1,
    activeLight: {
      color: 'red',
      count: 10,
    } as {
      color: string,
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
    },
    clearState() {
      localStorage.clear()
    },
  },
})
</script>

<style lang="sass">

.home
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center

.lights
  width: 5em
  height: 15em
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  background-color: #2c3e50
  border-radius: 1em

.light
  width: 5em
  height: 5em

.circle
  margin: 1em
  width: 3em
  height: 3em
  border-radius: 50%
  opacity: .3
  position: relative

.red
  background-color: red

.yellow
  background-color: yellow

.green
  background-color: green

.active
  opacity: 1

.number
  position: absolute
  font-size: 2em
  width: 100%
  height: 100%
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  color: black

.animate
  animation: blink .5s ease infinite

.save-btn
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

.clear-btn
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

@keyframes blink
  0%
    opacity: 1
  50%
    opacity: .7
  100%
    opacity: 1

</style>
