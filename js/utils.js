function getRandomInt (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomFloat (min, max, digits) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

const getRandomArray = function (initialArray) {
  const initialArrayCopy = initialArray.slice();
  const randomArray = [];
  const randomArrayLength = getRandomInt(1, initialArray.length);

  while (randomArray.length < randomArrayLength) {
    const randomArrayElementIndex = getRandomInt(0, initialArrayCopy.length - 1);
    const randomArrayElement = initialArrayCopy[randomArrayElementIndex];
    initialArrayCopy.splice(randomArrayElementIndex, 1);
    randomArray.push(randomArrayElement);
  }

  return randomArray;
};

const createAvatarNumber = function (avatarNumber) {
  if (avatarNumber < 10) {
    return `0${avatarNumber}`;
  }

  return avatarNumber;
};

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray, createAvatarNumber};
