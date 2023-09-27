import logo from './logo.svg';
import './App.css';
import { GPT } from './GPT';

export const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {process.env.REACT_APP_OPENAI_API_KEY === '<insert-API-key-here>' ? (
        <div className='api-key-error-container'>
          <p className='api-key-error'>
            Please create an OpenAI API key and add to <code>.env</code> file. <strong>Set soft and hard limits</strong> on your OpenAI account so no nasty surprises when billed. Once you've added the key, stop dev server and re-start.
          </p>

          <a href="https://auth0.openai.com/u/signup/identifier?state=hKFo2SBiM2FOSHBMbXlSSzFLZTNYOFRrS09LeVBzUEZJZGhwNqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFZR2JjQTQ0LXpYWkJXMzdsTHF2ZU1mbW4zM21JTnRao2NpZNkgRFJpdnNubTJNdTQyVDNLT3BxZHR3QjNOWXZpSFl6d0Q">
            OpenAi
          </a>
        </div>
        ) : (
          <GPT />
        )
      }
    </header>
  </div>
);
