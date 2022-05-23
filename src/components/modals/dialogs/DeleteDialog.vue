<template>
  <div @click="confirmDialog(false)" class="modal-background">
    <div class="modal-window">
      <h5 class="modal-title">Are you sure you want to delete this {{contentType}}? This action is undone.</h5>
      <div style="display: flex; justify-content: flex-end;">
        <button @click="confirmDialog(false)" class="dialog-button cancel-dialog-button">cancel</button>
        <button @click="confirmDialog(true)" class="dialog-button delete-dialog-button">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "delete-dialog",
  data() {
    return {

    }
  },
  methods: {
    confirmDialog(value) {
      this.$emit("onDeleteDialogConfirmed", value);
    },
  },
  props: {
    contentType: {
      Type: String,
    }
  }
}
</script>

<style>
.modal-background {
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
.modal-window {
  margin: auto auto;
  background-color: #4F4F4F;
  border-radius: 10px;
  z-index: 3;
}
.modal-title {
  margin: 4% 3% 3% 3%;
  color:#F2ECFF;
  font-size: medium;
}
.dialog-button {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  text-transform: uppercase;
  border-radius: 10px;
  color: #F2ECFF;
  border: none;
  padding: 3% 4%;
  margin: 1% 3% 3% 3%;
  cursor: pointer;
}
.delete-dialog-button {
  background-color: #985D6C;
}
.delete-dialog-button:hover {
  background-color: #985D6C;
}
.cancel-dialog-button {
  background-color: #00C896;
}
.cancel-dialog-button:hover {
  background-color: #00C896;
}
</style>