<template>
  <div class="alert alert-danger" role="alert">
    {{ error }}
  </div>
</template>

<script>
export default {
   name: 'ErrorHandler',
   props: ['error']
}
</script>