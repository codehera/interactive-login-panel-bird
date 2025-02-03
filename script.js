// Elementleri seçelim
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const showPasswordButton = document.querySelector('.password-button');
const hands = document.querySelector('.hands');
const innerEyes = document.querySelectorAll('.inner-eye');
const eyelids = document.querySelectorAll('.eyelid');
const mouth = document.querySelector('.mouth');
const birds = document.querySelectorAll('.bird');

// Göz hareketlerini kontrol eden fonksiyon
function moveEyes(position) {
    eyelids.forEach(eyelid => {
        if (position === 'closed') {
            eyelid.classList.add('closed');
        } else {
            eyelid.classList.remove('closed');
        }
    });
}

// Mouse takibi için event listener
document.addEventListener('mousemove', (e) => {
    // Eğer input alanları odakta değilse gözler mouse'u takip etsin
    if (!usernameInput.matches(':focus') && !passwordInput.matches(':focus') && 
        !eyelids[0].classList.contains('closed')) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        innerEyes.forEach(eye => {
            const rect = eye.parentElement.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            // Göz bebeği hareket sınırları
            const maxMove = 3;
            
            // Mouse ile göz arasındaki mesafeyi hesapla
            const deltaX = mouseX - eyeX;
            const deltaY = mouseY - eyeY;
            
            // Göz bebeği hareketini sınırla
            const angle = Math.atan2(deltaY, deltaX);
            const moveX = Math.min(Math.max(Math.cos(angle) * maxMove, -maxMove), maxMove);
            const moveY = Math.min(Math.max(Math.sin(angle) * maxMove, -maxMove), maxMove);
            
            eye.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
        });
    }
});

// Username input için event listeners
usernameInput.addEventListener('focus', () => {
    hands.style.transform = 'translate(-50%, -100px)';
    moveEyes('closed');
    mouth.style.height = '10px';
    mouth.style.width = '35px';
});

usernameInput.addEventListener('blur', () => {
    hands.style.transform = 'translateX(-50%)';
    moveEyes('normal');
    mouth.style.height = '15px';
    mouth.style.width = '40px';
});

// Password input için event listeners
passwordInput.addEventListener('focus', () => {
    hands.style.transform = 'translate(-50%, -80px)';
    moveEyes('closed');
    mouth.style.height = '10px';
    mouth.style.width = '35px';
});

// Password input için keypress event listener
passwordInput.addEventListener('input', () => {
    moveEyes('closed');
});

passwordInput.addEventListener('blur', () => {
    hands.style.transform = 'translateX(-50%)';
    if (passwordInput.type === 'text') {
        moveEyes('closed');
    } else {
        moveEyes('normal');
    }
    mouth.style.height = '15px';
    mouth.style.width = '40px';
});

// Password göster/gizle butonu
showPasswordButton.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordButton.textContent = 'Gizle';
        moveEyes('closed');
        if (passwordInput.matches(':focus')) {
            hands.style.transform = 'translate(-50%, -120px)';
        }
    } else {
        passwordInput.type = 'password';
        showPasswordButton.textContent = 'Göster';
        if (passwordInput.matches(':focus')) {
            moveEyes('closed');
        } else {
            moveEyes('normal');
        }
    }
});

// Modal functionality
function openModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}