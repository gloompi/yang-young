import { RefObject, useEffect } from 'react';

interface IProps {
  node: RefObject<HTMLElement>;
  handleClickOutside: () => void;
}

export default ({ node, handleClickOutside }: IProps) => {
  const handleClick: EventListener = e => {
    if (node.current === null || node.current.contains(e.target as Node)) {
      // inside click
      return;
    }
    handleClickOutside();
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
};
