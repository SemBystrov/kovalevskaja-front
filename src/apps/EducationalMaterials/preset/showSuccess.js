/***
 * Return icon and color for rating presentation
 *
 * @param rating: Number
 * @returns {{color: string, icon: string}}
 */
export default function(rating) {
  switch (rating) {
    case 3:
      return {
        icon: "mdi-emoticon-happy-outline",
        color: "success"
      };
    case 2:
      return {
        icon: "mdi-emoticon-neutral-outline",
        color: "yellow"
      };
    case 1:
      return {
        icon: "mdi-emoticon-sad-outline",
        color: "error"
      };
    default:
      return {
        icon: "mdi-circle-outline",
        color: "white"
      };
  }
}
