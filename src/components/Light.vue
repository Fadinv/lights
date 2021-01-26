<template>
  <div class="light">
    <div class="circle"
         :class="[
             light, color === light ? 'active' : '', color === light && count <= 3 ? 'animate' : '']">
      <div
          v-if="light === color"
          class="number"
      >{{ count }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['light', 'count', 'color'],
}
</script>

<style lang="sass" scoped>
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

@keyframes blink
  0%
    opacity: 1
  50%
    opacity: .7
  100%
    opacity: 1
</style>