export const generateResponsiveStyles = () => `
@media screen and (max-width: 768px) {
  #myTab {
    padding: 5px;
    background: none;
    backdrop-filter: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  button[id$='-tab'] {
    padding: 10px;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }
}

@media screen and (max-width: 850px) and (orientation: landscape) {
  #widgets-wrap,
  .service-card {
    gap: 1em;
  }

  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media screen and (max-width: 480px) and (orientation: portrait) {
  #widgets-wrap,
  .service-card {
    gap: 1em;
  }

  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}`;