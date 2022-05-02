export const createRandomLetters = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters
      .charAt(Math.floor(Math.random() * charactersLength))
      .toUpperCase();
  }
  return result;
};

export const createRandomNumbers = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
