export const state = () => ({
  busket: null,
});

export const mutations = {
  changeBusketData(state, busket) {
    state.busket = busket;
  },
};
