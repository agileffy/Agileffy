<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <a @click="startWriting">Write</a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  public startWriting() {
    this.$router.push('/write');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  color: #42b983;
}
</style>
