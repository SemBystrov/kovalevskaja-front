<template>
  <component
    :is="$vuetify.breakpoint.smAndDown ? 'v-bottom-sheet' : 'v-dialog'"
    scrollable
    inset
    v-model="activator"
    max-width="600px"
  >
    <v-card class="share" height="320px">
      <h1>Поделиться</h1>
      <v-container>
        <v-row justify="center">
          <v-col
            v-for="network in networks"
            cols="4"
            md="3"
            :key="network.network"
            class="share__btn"
          >
            <ShareNetwork
              :network="network.network"
              :url="url"
              :title="title"
              :description="description"
              class="share__item"
            >
              <v-img
                :src="network.image"
                v-ripple
                class="elevation-4 btn__img"
              ></v-img>
            </ShareNetwork>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" md="7">
            <v-text-field
              prepend-inner-icon="mdi-link"
              solo
              label="Ссылка"
              :value="url"
              readonly
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </component>
</template>

<script>
import { VBottomSheet, VDialog } from "vuetify/lib";

export default {
  name: "Share",
  components: {
    VBottomSheet,
    VDialog
  },
  props: {
    value: {
      type: Boolean
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      networks: [
        {
          network: "email",
          image: require("@/assets/email-logo.png"),
          color: "#333333"
        },
        {
          network: "telegram",
          image: require("@/assets/tg-logo.png"),
          color: "#0088cc"
        },
        {
          network: "vk",
          image: require("@/assets/vk-logo.png"),
          color: "#4a76a8"
        }
      ]
    };
  },
  computed: {
    activator: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit("input", newValue);
      }
    }
  }
};
</script>

<style scoped>
.share {
  height: 320px;
  background-color: #fafafa;
  padding: 20px;
}
.share__btn {
  padding: 25px;
}
.btn__img {
  border-radius: 50%;
}
</style>
