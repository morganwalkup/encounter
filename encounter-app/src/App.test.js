import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  test('renders without crashing', () => {
    const testDiv = document.createElement('div');
    ReactDOM.render(<App />, testDiv);
    ReactDOM.unmountComponentAtNode(testDiv);
  });
  
  test('connects to firebase', () => {
    let app = firebase.app();
    expect(app).not.toBeNull();
  });
  
  test('can navigate to and render encounters page', () => {
    const testDiv = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter initialEntries={['/encounters']} initialIndex={1}>
        <App />
      </MemoryRouter>,
      testDiv
    );
    expect(window.location.pathname).toBe('/encounters');
  });
  
  
});

