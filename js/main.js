const TypedText = ({ texts, speed = 100, pause = 1000, hideDuration = 2000 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        if (textIndex < texts.length) {
            if (charIndex < texts[textIndex].length) {
                const timeoutId = setTimeout(() => {
                    setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
                    setCharIndex((prev) => prev + 1);
                }, speed);

                return () => clearTimeout(timeoutId);
            } else {
                const pauseTimeoutId = setTimeout(() => {
                    setIsHiding(true);
                    const hideTimeoutId = setTimeout(() => {
                        setDisplayedText('');
                        setCharIndex(0);
                        setTextIndex((prev) => (prev + 1) % texts.length); // Reset textIndex to 0 after the last text
                        setIsHiding(false);
                    }, hideDuration);
                    
                    return () => clearTimeout(hideTimeoutId);
                }, pause);

                return () => clearTimeout(pauseTimeoutId);
            }
        }
    }, [charIndex, textIndex, texts, speed, pause, hideDuration]);

    return <div className={`typing-effect ${isHiding ? 'hide' : ''}`}>{displayedText}</div>; // Apply the CSS class
};

const Typedtext = () => {
    const messages = ["TWINKAL THESIYA", "A WEB DESIGNER", "A FRONT-END DEVELOPER"];
}