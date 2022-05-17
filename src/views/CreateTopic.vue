<template>
  <div style="margin: 2%; display: block; text-align: center;">
    <div class="container">
      <textarea v-model="title" class="text-field" placeholder="Topic Title"></textarea>
    </div>
    <div class="container">
      <textarea v-model="tags" class="text-field" placeholder="Topic Tags"></textarea>
      <button class="create-button">
        <span class="material-icons">send</span>
      </button>
    </div>
    <div style="width: 60%; margin: auto auto 0 auto;">
      <label style="color: indianred; margin: auto;">Note: type '' symbol right after each of your tags.</label>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.container {
  margin: 2% auto;
  display: flex; 
  height: 10%;
  width: 60%;
}
.text-field {
  border-radius: 10px;
  background-color: #F2ECFF;
  color: #00C896;
  width: 100%;
  padding: 1.5%;
  border: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  resize: none;
  outline: none;
}
.create-button {
  border-radius: 10px;
  background-color: #00C896;
  color: #F2ECFF;
  width: 10%;
  border: none;
  margin-left: 5%;
  cursor: pointer;
}
.create-button:hover {
  background-color: #518071;
}
</style>