<template>
  <div :content="content" class="message">{{ content }}</div>
</template>
<script>
export default {
  props: {
    content: String,
    timestamp: String,
  },
};
</script>
<style>
.message {
  /* height: 300px; */
  /* max-width: 80%; */
  border: 1px, dotted, black;
  border-style: dotted;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}
</style>

