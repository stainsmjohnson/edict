const names = ['Onion', 'Chilli', 'Ginger', 'Beans', 'Ladies Finger', 'Tomato'];
const data = ['Favourites', 'Most used', 'Vegitables', 'Fruits'];

const getItem = () => {
  const randomNumber = parseInt(Math.random() * 999);
  const randomIndex = parseInt(Math.random() * names.length);
  const index = randomIndex >= names.length ? 0 : randomIndex;
  const name = names[index];
  return {
    name: name + index + randomNumber,
    image: `https://loremflickr.com/320/240/vegitable,fruit?random=${randomNumber}`, //https://picsum.photos/id/${randomNumber}/200/300`,
    measurement: 'kg',
    price: 100,
    id: randomNumber,
  };
};
const getSection = (title) => {
  let items = [];
  for (let i = 0; i < 10; i++) {
    items.push(getItem());
  }
  return {
    title: title,
    items,
  };
};

export const getData = () => {
  let finalArray = [];
  for (let i = 0; i < data.length; i++) {
    finalArray.push(getSection(data[i]));
  }
  return finalArray;
};
