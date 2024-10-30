import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const submit = jest.fn();
      render(<SignInContainer submit={submit} />);

      fireEvent.changeText(
        screen.getByPlaceholderText('Username'),
        'testUsername'
      );
      fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'testPassword'
      );
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(submit).toHaveBeenCalled();
        expect(submit.mock.calls[0][0]).toEqual({
          password: 'testPassword',
          username: 'testUsername',
        });
      });
    });
  });
});
