import logo from './logo.svg';
import './App.css';
import { GPT } from './GPT';

export const App = () => {
  return  (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <GPT />
      </header>
    </div>
  );
};
