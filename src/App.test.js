import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('@ckeditor/ckeditor5-react', () => ({
  CKEditor: 'CKEditor',
}))
const setParagarpg = jest.fn();

beforeEach(()=>{
  jest.spyOn(React, 'useState').mockReturnValue(['Hello', setParagarpg]);
})

test('App component: Snapshot testing', () => {
  const { container } = render(<App />)
  expect(container).toMatchSnapshot();
});

test('App component: render chediter testing', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('chediter')).toBeDefined();
});

test('App component: onclick on check button', () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByTestId('check'));
  expect(getByTestId('status')).toHaveTextContent('Status: Matched')
});