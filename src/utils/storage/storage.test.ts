import { AsyncStorage } from "./async-storage";

import { load, loadString, save, saveString, clear, remove } from "./storage";

// expo
jest.mock("react-native", () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    clear: jest.fn(),
  },
}));

const VALUE_OBJECT = {
  id: "1613571272163",
};
const VALUE_STRING = JSON.stringify(VALUE_OBJECT);

beforeEach(() =>
  (AsyncStorage.getItem as jest.Mock).mockReturnValue(
    Promise.resolve(VALUE_STRING)
  )
);
afterEach(() => jest.clearAllMocks());

test("load", async () => {
  const value = await load("FAVORITES");
  expect(value).toEqual(JSON.parse(VALUE_STRING));
});

test("loadString", async () => {
  const value = await loadString("EMPTY");
  expect(value).toEqual(VALUE_STRING);
});

test("save", async () => {
  await save("FAVORITES", VALUE_OBJECT);
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("FAVORITES", VALUE_STRING);
});

test("saveString", async () => {
  await saveString("EMPTY", VALUE_STRING);
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("EMPTY", VALUE_STRING);
});

test("remove", async () => {
  await remove("FAVORITES");
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith("FAVORITES");
});

test("clear", async () => {
  await clear();
  expect(AsyncStorage.clear).toHaveBeenCalledWith();
});
