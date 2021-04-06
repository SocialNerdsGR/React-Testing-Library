import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";
import axios from 'axios';

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    jest.mock('axios');
  });

  it("submit form", async () => {
    axios.post.mockResolvedValue({data: {status: 'SocialNerds'}})

    render(<App />);
    user.type(screen.getByLabelText("Email"), "t@example.com");
    user.type(screen.getByLabelText("Name"), "Thanos");
    user.click(screen.getByDisplayValue("Submit"));
    const element = await screen.findByText("SocialNerds");
    expect(element).toBeInTheDocument();
    expect(screen.getByLabelText("Email").value).toEqual("");
  });
});