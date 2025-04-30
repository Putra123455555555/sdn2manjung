// src/Components/TidioChat.jsx
import { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//code.tidio.co/5tlmawmnvcdq71pjmsxr9gfor8qhw7bj.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TidioChat;
