// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
// import { render, waitForElement } from '@testing-library/react';
// import { shallow } from 'enzyme';
// import App from './App';



// describe('App component', () => {
//     it('should render the CityCard component when urbanDetails and urbanScores are present', () => {
//         const wrapper = shallow(<App />);
//         wrapper.setState({
//             urbanDetails: [{ label: 'Housing' }],
//             urbanScores: { categories: [{ score_out_of_10: 8.3 }] }
//         });
//         expect(wrapper.find('CityCard').exists()).toBe(true);
//     });
// });

// describe('App component', () => {
//     it('should render with initial state of selectedUrbanArea as an empty string', () => {
//         const wrapper = shallow(<App />);
//         expect(wrapper.find('Searchbar').props().selectedUrbanArea).toEqual('');
//     });
// });

// describe('App component', () => {
//     it('should render the AirQualityBar component when selectedUrbanArea is present', () => {
//         const wrapper = shallow(<App />);
//         wrapper.setState({ selectedUrbanArea: 'San Francisco' });
//         expect(wrapper.find('AirQualityBar').exists()).toBe(true);
//     });
// });

// describe('App component', () => {
//     it('renders Searchbar component', () => {
//         const { getByTestId } = render(<App />);
//         const searchbar = getByTestId('searchbar');
//         expect(searchbar).toBeInTheDocument();
//     });

//     it('fetches data from the API and updates state when selectedUrbanArea changes', async () => {
//         const { getByTestId } = render(<App />);
//         const searchbar = getByTestId('searchbar');
//         searchbar.value = 'San Francisco';
//         searchbar.dispatchEvent(new Event('change'));
//         const cityCard = await waitForElement(() => getByTestId('city-card'));
//         expect(cityCard).toBeInTheDocument();
//     });
// });