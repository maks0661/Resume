document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const delay = 3000; 

    const linesToType = [
        { id: 'line-1', content: null, isHTML: false, element: null }, 
        { id: 'line-2', content: null, isHTML: false, element: null }, 
    ];
    
    function typeWriter(lineIndex, callback) {
        const line = linesToType[lineIndex];
        let charIndex = 0;
        
        const prop = line.isHTML ? 'innerHTML' : 'textContent'; 
        const textToType = line.content;

        line.element[prop] = ''; 
        line.element.classList.add('typing-cursor'); 

        function type() {
            if (charIndex < textToType.length) {
                line.element[prop] += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 90);
            } else {
                line.element.classList.remove('typing-cursor'); 
                if (callback) {
                    callback(); 
                }
            }
        }
        type();
    }

    function startTypingSequence(index) {
        if (index >= linesToType.length) {
            return; 
        }

        typeWriter(index, () => {
            startTypingSequence(index + 1);
        });
    }

    function startSite() {
        linesToType.forEach(line => {
            line.element = document.getElementById(line.id);
            line.content = line.isHTML ? line.element.innerHTML : line.element.textContent;
        });

        // 1. Показываем основной контент
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.classList.remove('content-hidden');
            
            // 2. Запускаем последовательную печать
            startTypingSequence(0);
        }, 50); 
    }
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            preloader.style.display = 'none'; 
            
            startSite(); 
            
        }, 500); 

    }, delay);
});