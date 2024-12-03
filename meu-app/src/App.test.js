import { render, screen } from '@testing-library/react';
import App from './App';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(
//     <BrowserRouter>
//         <App/>
//     </BrowserRouter>
// )


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
