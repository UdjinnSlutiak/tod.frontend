<template>
  <div class="modal-background">
    <div class="modal-form-window">
      <h5 class="modal-form-title">Edit commentary text</h5>
      <div style="display: flex; margin: auto; padding: 0 3% 2% 3%;">
        <textarea v-model="text" class="modal-textarea" rows="3"></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end;">
        <button @click="confirmEdit(false)" class="modal-form-button delete-dialog-button">
          cancel
        </button>
        <button @click="confirmEdit(text)" class="modal-form-button cancel-dialog-button">
          save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentary-form",
  mounted: function () {
    this.text = this.commentaryText;
  },
  data() {
    return {
      text: "",
    }
  },
  methods: {
    confirmEdit(value) {
      this.$emit("onEditConfirmed", value);
    },
  },
  props: {
    commentaryText: {
      Type: String,
    }
  },
}
</script>

<style>
.modal-form-window {
  margin: auto auto;
  background-color: #4F4F4F;
  width: 60%;
  z-index: 3;
}
.modal-textarea {
  border-radius: 10px;
  background-color: #F2ECFF;
  color: #00C896;
  width: 100%;
  margin: auto;
  border: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  resize: none;
  outline: none;
}
.modal-form-button {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  text-transform: uppercase;
  border-radius: 10px;
  color: #F2ECFF;
  border: none;
  padding: 2% 3%;
  margin: 1% 3% 3% 3%;
  cursor: pointer;
}
.modal-form-title {
  margin: 3%;
  color:#F2ECFF;
  font-size: medium;
}
</style>