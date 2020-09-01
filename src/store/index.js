import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const EducationalMaterialsStore = {
  actions: {
    // Note
    async getNote({ commit }, { tutorialID }) {
      try {
        const userNote = await axios.get(
          process.env.VUE_APP_API_URL + "/tutorial-note/note/" + tutorialID
        );

        commit({
          type: "setUserNote",
          userNote: userNote.data ? userNote.data.content : ""
        });
      } catch (e) {
        commit({
          type: "setUserNote",
          userNote: ""
        });
      }
    },

    async saveNote({ dispatch }, { tutorialID, content }) {
      await axios.put(
        process.env.VUE_APP_API_URL + "/tutorial-note/note/" + tutorialID,
        { content }
      );

      dispatch({
        type: "getNote",
        tutorialID: tutorialID
      });
    },

    async deleteNote({ commit }, { tutorialID }) {
      await axios.delete(
        process.env.VUE_APP_API_URL + "/tutorial-note/note/" + tutorialID
      );

      commit({
        type: "deleteUserNote"
      });
    },

    // Tutorial
    async getTutorial({ commit }, { tutorialSlug }) {
      const tutorial = await axios.get(
        process.env.VUE_APP_API_URL + "/tutorials/?slug=" + tutorialSlug
      );

      commit({
        type: "setTutorial",
        tutorial: tutorial.data[0]
      });
    },

    // Toc
    async getToc({ commit }) {
      const toc = await axios.get(
        process.env.VUE_APP_API_URL + "/sections/?_sort=order"
      );

      commit({
        type: "setToc",
        toc: toc.data
      });
    },

    // Success
    async getAllSuccess({ commit }) {
      const userSuccess = await axios.get(
        process.env.VUE_APP_API_URL + "/tutorial-note/success"
      );

      commit({
        type: "setAllSuccess",
        userSuccess: userSuccess.data
      });
    },

    async getSuccess({ state, commit }, { tutorialID }) {
      if (!state.userSuccess) {
        let userSuccess;
        try {
          userSuccess = await axios.get(
            process.env.VUE_APP_API_URL + "/tutorial-note/success/" + tutorialID
          );
        } catch (e) {
          userSuccess = {
            data: {
              tutorial: tutorialID,
              rating: null
            }
          };
        }
        commit({
          type: "setAllSuccess",
          userSuccess: [userSuccess.data]
        });
      }
    },

    async changeSuccess({ commit }, { tutorialID, rating }) {
      commit({
        type: "changeSuccess",
        tutorialID: tutorialID,
        rating: rating
      });

      await axios.put(
        process.env.VUE_APP_API_URL + "/tutorial-note/success/" + tutorialID,
        { rating }
      );
    }
  },
  mutations: {
    setToc(state, { toc }) {
      state.toc = toc;
    },

    setAllSuccess(state, { userSuccess }) {
      const successByTutorial = {};

      for (let success of userSuccess) {
        successByTutorial[success.tutorial] = success.rating;
      }

      state.userSuccess = successByTutorial;
    },

    changeSuccess(state, { tutorialID, rating }) {
      state.userSuccess[tutorialID] = rating;
    },

    setTutorial(state, { tutorial }) {
      state.tutorial = tutorial;
    },

    // UserNote
    setUserNote(state, { userNote }) {
      state.userNote = userNote;
    },

    deleteUserNote(state) {
      state.userNote = "";
    }
  },
  state: {
    userNote: "",
    tutorial: null,
    toc: null,
    userSuccess: null
  }
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async updateUserSettings(ctx, { user }) {
      let data = new FormData();
      data.append("files.avatar", user.avatar);
      data.append(
        "data",
        JSON.stringify({
          firstName: user.firstName,
          secondName: user.secondName,
          school: user.school
        })
      );
      axios.put(process.env.VUE_APP_API_URL + "/users/me", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  },
  modules: {
    edu: EducationalMaterialsStore
  }
});
