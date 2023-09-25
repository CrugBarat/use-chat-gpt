
import Typewriter from 'typewriter-effect';
import { useChatGPT } from './useChatGPT';

export const GPT = () => {
  const { response, isLoading, generateMore } = useChatGPT();

  return !isLoading ? (
    <>
      <div className='gpt-container'>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .changeDelay(15)
              .typeString(response)
              .start();
          }}
        />
      </div>

      <div>
        <button
          className="App-button"
          onClick={generateMore}
        >
          Tell me more
        </button>
      </div>
    </>
  ) : (
    <p>
      <code>Beep bop boop...</code>
    </p>
  );
};
