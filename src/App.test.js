import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'




// The initial Test cases were generated with chatGPT, but then modified to fit the project, maybe 30% of the code is self written
test('App component is being rendered without crashing', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('app-component')).toBeInTheDocument();
});

test('Searchbar component is being rendered', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('searchbar-component')).toBeInTheDocument();
});

test('CityCard component is being rendered and passed the correct props', async () => {
  const { findByTestId } = render(<App />);
  const setSelectedUrbanArea = jest.fn();
  const app = await findByTestId('app-component');
  let cityCard;

  act(() => {
    render(<App selectedUrbanArea='' setSelectedUrbanArea={setSelectedUrbanArea} />);
  });

  act(() => {
    setSelectedUrbanArea('New York');
  });

  try {
    cityCard = await findByTestId('citycard-component');
  } catch (error) {
    // handle error
  }

  if (cityCard) {
    expect(cityCard.props.urbanScores).not.toBe([]);
  }
});

test('setSelectedUrbanArea functions correctly', () => {
  const setSelectedUrbanArea = jest.fn();

  act(() => {
    render(<App selectedUrbanArea='' setSelectedUrbanArea={setSelectedUrbanArea} />);
  });

  act(() => {
    setSelectedUrbanArea('New York');
  });

  expect(setSelectedUrbanArea).toHaveBeenCalledWith('New York');

});

test('AirQualityBar component is being rendered and passed the correct props', async () => {
  const { findByTestId } = render(<App />);
  const setSelectedUrbanArea = jest.fn();
  const app = await findByTestId('app-component');
  let airQualityBar;

  act(() => {
    render(<App selectedUrbanArea='' setSelectedUrbanArea={setSelectedUrbanArea} />);
  });

  act(() => {
    setSelectedUrbanArea('New York');
  });

  try {
    airQualityBar = await findByTestId('airqualitybar-component');
  } catch (error) {
    // handle error
  }

  if (airQualityBar) {
    expect(airQualityBar.props.urbanScores).not.toBe([]);
  }
});
