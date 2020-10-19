export const getDisplayData = (displayData = {}) => {
  return Object.keys(displayData).map((key) => {
    const splittedKeys = key.split("_");
    return `${
      splittedKeys[0] + (splittedKeys[1] ? " " + splittedKeys[1] : "")
    }: ${displayData[key] ? displayData[key] : "-"}`;
  });
};
