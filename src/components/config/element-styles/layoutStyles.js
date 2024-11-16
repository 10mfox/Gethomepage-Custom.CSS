export const generateLayoutStyles = (toggles) => {
  const styles = [];

  if (toggles.enable_centered_card_titles) {
    styles.push(`
.service-title,
.bookmark-text {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  width: 100% !important;
}`);
  }

  if (toggles.remove_refresh_button_and_version) {
    styles.push(`
#footer {
  display: none !important;
}`);
  }

  return styles;
};