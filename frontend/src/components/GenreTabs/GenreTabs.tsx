import { FC } from 'react';
import './GenreTabs.css';

interface TabsProps {
  tabs: string[];
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}
const GenreTabs: FC<TabsProps> = ({ tabs, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="tabs">
      {tabs.map((tab: string) => (
        <button
          key={tab}
          onClick={() => {
            setSelectedGenre(tab);
          }}
          className={selectedGenre === tab ? 'selected' : ''}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default GenreTabs;
