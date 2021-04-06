import { render, screen } from "@testing-library/react";
import App from './App';
import user from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');

describe('App', () => {
  it('should render the form', () => {
    render(<App />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Submit')).toBeInTheDocument();
    expect(screen.queryByText('SocialNerds')).not.toBeInTheDocument();
  });

  it('should submit the form', async () => {
    axios.post.mockResolvedValue({data: {status: 'SN'}});
    render(<App />);
    user.type(screen.getByLabelText('Email'), 't@example.com');
    user.type(screen.getByLabelText('Name'), 'Thanos');
    user.click(screen.getByDisplayValue('Submit'));

    const status = await screen.findByText('SN');
    expect(status).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledWith('https://api.mocki.io/v1/d5683319', {email: 't@example.com', name: 'Thanos'})
  });

  it('should handle API errors', async () => {
    axios.post.mockRejectedValue('ERROR!!1')
    render(<App />)
    user.type(screen.getByLabelText('Email'), 't@example.com');
    user.type(screen.getByLabelText('Name'), 'Thanos');
    user.click(screen.getByDisplayValue('Submit'));

    const error = await screen.findByText('ERROR!!1');
    expect(error).toBeInTheDocument();
  });
})