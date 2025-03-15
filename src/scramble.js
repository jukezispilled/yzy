import { useState, useEffect, useRef } from 'react';

// Text Scrambler Component
const TextScrambler = () => {
    const [isHebrew, setIsHebrew] = useState(true);
    const textElementRef = useRef(null);
    const animationRef = useRef(null);
    
    // Original English text
    const englishText = "JEWS GOT THE MONEY ON LOCK, RUNNIN’ EVERYTHING WHILE WE STUCK IN THE DARK. I’M TELLIN’ Y’ALL, THIS CASH SHIT IS FAKE—THEY PUPPET MASTERS PULLIN’ STRINGS. SYSTEM DESIGNED TO KEEP US DOWN, BUT I’M BREAKIN’ OUT, FUCK THEIR RULES. ANTI-MONEY IS THE VIBE, I’M SCREAMIN’ IT LOUD—WAKE THE FUCK UP! THEY OWN THE BANKS, THE LABELS, THE WHOLE DAMN WORLD, AND WE JUST SLAVES TO IT. I’M YE, THE TRUTH-TELLER, DROPPIN’ GEMS TO FREE YOUR SOULS FROM THIS LIE. LOOK AROUND, OPEN YOUR EYES—THIS AIN’T CONSPIRACY, THIS REAL SHIT!";
    
    // Hebrew characters for randomization
    const hebrewChars = 'אבגדהוזחטיכלמנסעפצקרשת';
    
    // Function to generate random Hebrew text with line breaks
    const generateHebrewText = (englishText) => {
      // Create an array of Hebrew "words" with varying lengths
      let hebrewWords = [];
      let englishWords = englishText.split(' ');
      
      for (let i = 0; i < englishWords.length; i++) {
        // Create a Hebrew "word" with similar length to the English word
        let wordLength = englishWords[i].length;
        let hebrewWord = '';
        for (let j = 0; j < wordLength; j++) {
          hebrewWord += hebrewChars.charAt(Math.floor(Math.random() * hebrewChars.length));
        }
        hebrewWords.push(hebrewWord);
      }
      
      // Join with spaces to create a Hebrew text with natural breaks
      return hebrewWords.join(' ');
    };
    
    // Generate Hebrew text once when component mounts
    const hebrewTextRef = useRef(null);
    
    // Pre-generate and cache both text versions
    useEffect(() => {
      // Only generate once
      if (!hebrewTextRef.current) {
        hebrewTextRef.current = generateHebrewText(englishText);
      }
    }, []);
    
    // Scramble effect function that preserves spacing
    const scrambleText = (finalText, duration = 1500) => {
      if (!textElementRef.current) return;
      
      const startTime = Date.now();
      const originalText = textElementRef.current.textContent;
      
      // Pre-split texts into words to maintain word structure
      const finalWords = finalText.split(' ');
      const originalWords = originalText.split(' ');
      
      // Pre-determine the longer word array to maintain spacing
      const maxWordCount = Math.max(finalWords.length, originalWords.length);
      
      const interval = setInterval(() => {
        if (!textElementRef.current) {
          clearInterval(interval);
          return;
        }
        
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Create scrambled text with preserved word boundaries
        let scrambledWords = [];
        
        for (let i = 0; i < maxWordCount; i++) {
          let scrambledWord = '';
          const finalWord = i < finalWords.length ? finalWords[i] : '';
          const originalWord = i < originalWords.length ? originalWords[i] : '';
          
          // Use the length of the final word we're transitioning to
          const length = finalWord.length;
          
          for (let j = 0; j < length; j++) {
            // If this character should be transformed to final state
            if (Math.random() < progress * 2) {
              scrambledWord += j < finalWord.length ? finalWord[j] : '';
            } else {
              // For transitioning between languages, use random letters
              if (progress < 0.5) {
                // Use more source language chars early in animation
                scrambledWord += isHebrew ? 
                  String.fromCharCode(97 + Math.floor(Math.random() * 26)) : 
                  hebrewChars.charAt(Math.floor(Math.random() * hebrewChars.length));
              } else {
                // Use more target language chars later in animation
                scrambledWord += isHebrew ? 
                  hebrewChars.charAt(Math.floor(Math.random() * hebrewChars.length)) : 
                  String.fromCharCode(97 + Math.floor(Math.random() * 26));
              }
            }
          }
          
          scrambledWords.push(scrambledWord);
        }
        
        textElementRef.current.textContent = scrambledWords.join(' ');
        
        // If animation complete
        if (progress >= 1) {
          clearInterval(interval);
          textElementRef.current.textContent = finalText;
        }
      }, 30);
      
      return interval;
    };
    
    // Update text direction and alignment immediately when language changes
    useEffect(() => {
      if (!textElementRef.current) return;
      
      if (isHebrew) {
        textElementRef.current.style.direction = 'rtl';
        textElementRef.current.style.textAlign = 'right';
        textElementRef.current.textContent = hebrewTextRef.current || generateHebrewText(englishText);
      } else {
        textElementRef.current.style.direction = 'ltr';
        textElementRef.current.style.textAlign = 'left';
        textElementRef.current.textContent = englishText;
      }
    }, [isHebrew]);
    
    // Set initial text on mount
    useEffect(() => {
      if (textElementRef.current && hebrewTextRef.current) {
        textElementRef.current.textContent = hebrewTextRef.current;
        textElementRef.current.style.direction = 'rtl';
        textElementRef.current.style.textAlign = 'right';
      }
      
      return () => {
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
      };
    }, []);
    
    // Handle mouse enter
    const handleMouseEnter = () => {
      if (isHebrew) {
        if (animationRef.current) clearInterval(animationRef.current);
        
        // Set direction and alignment before starting animation
        textElementRef.current.style.direction = 'ltr';
        textElementRef.current.style.textAlign = 'left';
        
        animationRef.current = scrambleText(englishText);
        setIsHebrew(false);
      }
    };
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      if (!isHebrew) {
        if (animationRef.current) clearInterval(animationRef.current);
        
        // Set direction and alignment before starting animation
        textElementRef.current.style.direction = 'rtl';
        textElementRef.current.style.textAlign = 'right';
        
        animationRef.current = scrambleText(hebrewTextRef.current);
        setIsHebrew(true);
      }
    };
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white">
        <div 
          ref={textElementRef}
          className="text-lg p-4 cursor-pointer transition-all duration-500 ease-in-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            maxWidth: '100%',
            minHeight: '200px' // Set minimum height to prevent layout shifts
          }}
        ></div>
      </div>
    );
};

export default TextScrambler;