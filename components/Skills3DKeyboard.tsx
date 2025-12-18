import React, { useState } from 'react';
import { SKILLS } from '../constants';

interface IsometricKeyProps {
  skill: string;
  icon: string;
  color: string;
  textColor: string;
  onClick: (skill: string) => void;
  delay: number;
}

const IsometricKey: React.FC<IsometricKeyProps> = ({ 
  skill, 
  icon, 
  color, 
  textColor, 
  onClick, 
  delay 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="isometric-key-container"
      style={{ 
        animationDelay: `${delay}ms`
      }}
    >
      <div 
        className={`isometric-key ${isPressed ? 'pressed' : ''} ${isHovered ? 'hovered' : ''}`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => {
          setIsPressed(false);
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onClick={() => onClick(skill)}
      >
        {/* Key Top Face */}
        <div 
          className="iso-key-top"
          style={{ 
            backgroundColor: color,
            color: textColor
          }}
        >
          <div className="key-icon">{icon}</div>
          <div className="key-label">{skill}</div>
        </div>
        
        {/* Key Right Face */}
        <div 
          className="iso-key-right"
          style={{ 
            backgroundColor: `color-mix(in srgb, ${color} 70%, black)`
          }}
        ></div>
        
        {/* Key Front Face */}
        <div 
          className="iso-key-front"
          style={{ 
            backgroundColor: `color-mix(in srgb, ${color} 80%, black)`
          }}
        ></div>
      </div>
    </div>
  );
};

const Skills3DKeyboard: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  // Create beautiful isometric keyboard like the image
  const techKeys = [
    // Row 1 - Frontend Core
    [
      { skill: 'JavaScript', icon: '🟨', color: '#f7df1e', textColor: '#000' },
      { skill: 'TypeScript', icon: '🔷', color: '#3178c6', textColor: '#fff' },
      { skill: 'HTML5', icon: '🧡', color: '#e34f26', textColor: '#fff' },
      { skill: 'CSS3', icon: '🎨', color: '#1572b6', textColor: '#fff' }
    ],
    // Row 2 - Frameworks
    [
      { skill: 'React', icon: '⚛️', color: '#61dafb', textColor: '#000' },
      { skill: 'Vue.js', icon: '💚', color: '#4fc08d', textColor: '#fff' },
      { skill: 'Angular', icon: '🅰️', color: '#dd0031', textColor: '#fff' },
      { skill: 'Node.js', icon: '🟢', color: '#339933', textColor: '#fff' }
    ],
    // Row 3 - Backend Languages
    [
      { skill: 'Python', icon: '🐍', color: '#3776ab', textColor: '#fff' },
      { skill: 'Java', icon: '☕', color: '#ed8b00', textColor: '#fff' },
      { skill: 'C#', icon: '🔵', color: '#239120', textColor: '#fff' },
      { skill: 'PHP', icon: '🐘', color: '#777bb4', textColor: '#fff' }
    ],
    // Row 4 - Tools & Database
    [
      { skill: 'MongoDB', icon: '🍃', color: '#47a248', textColor: '#fff' },
      { skill: 'MySQL', icon: '🐬', color: '#4479a1', textColor: '#fff' },
      { skill: 'Git', icon: '📦', color: '#f05032', textColor: '#fff' },
      { skill: 'Docker', icon: '🐳', color: '#2496ed', textColor: '#fff' }
    ]
  ];

  const handleKeyClick = (skill: string) => {
    setSelectedSkill(skill);
    
    // Create click sound effect
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Fallback if audio context fails
      console.log('Audio not available');
    }
  };

  return (
    <div className="isometric-keyboard-container">
      {/* Selected Skill Display */}
      {selectedSkill && (
        <div className="selected-skill-display">
          <h3>Selected Technology:</h3>
          <span>{selectedSkill}</span>
        </div>
      )}
      
      {/* Beautiful Isometric Keyboard */}
      <div className="isometric-keyboard">
        <div className="keyboard-grid-isometric">
          {techKeys.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row-isometric">
              {row.map((keyData, keyIndex) => (
                <IsometricKey
                  key={`${rowIndex}-${keyIndex}`}
                  skill={keyData.skill}
                  icon={keyData.icon}
                  color={keyData.color}
                  textColor={keyData.textColor}
                  onClick={handleKeyClick}
                  delay={(rowIndex * 4 + keyIndex) * 100}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Tech Stack Legend */}
      <div className="tech-legend">
        <h4>🚀 My Tech Stack</h4>
        <p>Click any technology to learn more</p>
      </div>
    </div>
  );
};

export default Skills3DKeyboard;