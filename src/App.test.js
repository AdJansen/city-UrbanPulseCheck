import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import App from './App';
import Searchbar from './Components/Searchbar';

import CityCard from './Components/CityCard';


test('Searchbar component is being rendered', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('searchbar-component')).toBeInTheDocument();
});

test('urbanDetails and urbanScores states are updated when selectedUrbanArea changes', () => {
  const { getByTestId } = render(<App />);
  const searchbar = getByTestId('searchbar-component');

  act(() => {
    searchbar.props.setSelectedUrbanArea('New York');
  });

  expect(searchbar.props.selectedUrbanArea).toBe('New York');
  expect(searchbar.props.urbanDetails).not.toBe([]);
  expect(searchbar.props.urbanScores).not.toBe([]);
});

test('CityCard component is being rendered and passed the correct props', () => {
  const { getByTestId } = render(<App />);
  const searchbar = getByTestId('searchbar-component');

  act(() => {
    searchbar.props.setSelectedUrbanArea('New York');
  });

  const cityCard = getByTestId('citycard-component');
  expect(cityCard).toBeInTheDocument();
  expect(cityCard.props.urbanDetail).not.toBe(undefined);
  expect(cityCard.props.urbanScore).not.toBe(undefined);
});

// test('App component', () => {
//   const wrapper = shallow(<App />);
//   wrapper.setState({
//     urbanDetails: [{ label: 'Housing' }],
//     urbanScores: { categories: [{ score_out_of_10: 8.3 }] }
//   });
//   expect(wrapper.find('CityCard').exists()).toBe(true);
// });

// test('App component', () => {
//   const wrapper = shallow(<App />);
//   expect(wrapper.find('Searchbar').props().selectedUrbanArea).toEqual('');
// });

// test('App component', () => {
//   const wrapper = shallow(<App />);
//   wrapper.setState({ selectedUrbanArea: 'San Francisco' });
//   expect(wrapper.find('AirQualityBar').exists()).toBe(true);
// });

// test('App component', () => {
//   const { getByTestId } = render(<App />);
//   const searchbar = getByTestId('searchbar');
//   expect(searchbar).toBeInTheDocument();
//   async () => {
//     const { getByTestId } = render(<App />);
//     const searchbar = getByTestId('searchbar');
//     searchbar.value = 'San Francisco';
//     searchbar.dispatchEvent(new Event('change'));
//     const cityCard = await waitForElement(() => getByTestId('city-card'));
//     expect(cityCard).toBeInTheDocument();
//   }
// });
// // test('renders Air Quality', () => {
// //   render(<App />);
// //   const linkElement = screen.getByText(/Air Quality/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// // test('selectedUrbanArea should be an empty string when the component is first rendered', () => {
// //   const { getByTestId } = render(<App />);
// //   const selectedUrbanArea = getByTestId('selectedUrbanArea');
// //   expect(selectedUrbanArea).toBe('');
// // });


// // test('setSelectedUrbanArea should change the value of selectedUrbanArea', () => {
// //   const { getByTestId, debug } = render(<App />);
// //   const selectedUrbanArea = getByTestId('selectedUrbanArea');
// //   act(() => {
// //     selectedUrbanArea.setSelectedUrbanArea('San Francisco');
// //   });
// //   expect(selectedUrbanArea).toBe('San Francisco');
// // });

// // test('urbanDetails and urbanScores should update when selectedUrbanArea changes', async () => {
// //   const { getByTestId } = render(<App />);
// //   const selectedUrbanArea = getByTestId('selectedUrbanArea');
// //   act(() => {
// //     selectedUrbanArea.setSelectedUrbanArea('San Francisco');
// //   });
// //   await waitForElement(() => getByTestId('urbanDetails'));
// //   await waitForElement(() => getByTestId('urbanScores'));
// //   const urbanDetails = getByTestId('urbanDetails');
// //   const urbanScores = getByTestId('urbanScores');
// //   expect(urbanDetails).not.toBe([]);
// //   expect(urbanScores).not.toBe([]);
// // });


// // describe('App component', () => {
// //   it('should render with initial state of selectedUrbanArea as an empty string', () => {
// //     const wrapper = shallow(<App />);
// //     expect(wrapper.find('Searchbar').props().selectedUrbanArea).toEqual('');
// //   });
// // });

// // describe('App component', () => {
// //   it('should render the AirQualityBar component when selectedUrbanArea is present', () => {
// //     const wrapper = shallow(<App />);
// //     wrapper.setState({ selectedUrbanArea: 'San Francisco' });
// //     expect(wrapper.find('AirQualityBar').exists()).toBe(true);
// //   });
// // });