import React, { useState } from "react";
import { useForm } from "./useForm";
import axios from 'axios';

export default function App() {
  const { state, setValue, clearForm } = useForm({ email: "", name: "" });
  const [response, setResponse] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post("https://api.mocki.io/v1/d5683319", state);
      setResponse(data.data.status);
      clearForm();
    } catch (error) {
      setFormError(error);
    }
  };

  return (
    <div className="App">
      {response}
      {formError}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              autoComplete="off"
              value={state.email}
              onChange={setValue}
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              required
              autoComplete="off"
              type="text"
              name="name"
              value={state.name}
              onChange={setValue}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
