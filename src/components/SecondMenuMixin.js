export const SecondMenuMixin = {
  name: "SecondMenuMixin",
  props: {
    navigationList: {
      type: Array,
      required: false,
      default: () => [
        {
          icon: "mdi-widgets",
          routeName: "Profile",
          returnAction: null
        },
        {
          icon: "mdi-share-variant",
          routeName: null,
          returnAction: "share"
        }
      ]
    }
  },
  methods: {
    action(nav) {
      if (nav.routeName) {
        this.$router.push({
          name: nav.routeName
        });
      } else if (nav.returnAction) {
        this.$emit(nav.returnAction);
      } else {
        throw new Error("action not defined");
      }
    }
  }
};
