document.addEventListener('DOMContentLoaded', function() {
    const FORM_CHAMADO = document.getElementById('formChamado');
    const FORM_CONTATO = document.getElementById('contactForm');
    const NAV_TOGGLER = document.querySelector('.navbar-toggler');
    const FAQ_ACCORDION = document.querySelectorAll('.faq__question');
    const SCROLL_TOP_BTN = createScrollTopButton();

    initForms();
    initFAQAccordion();
    initScrollTopButton();
    initAnimations();

    function createScrollTopButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        btn.className = 'btn-scroll-top';
        btn.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(btn);
        return btn;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form__group');
        const errorElement = formGroup.querySelector('.form__error');
        
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form__error text-danger mt-1';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
        } else {
            errorElement.textContent = message;
        }
        
        input.classList.add('is-invalid');
    }

    function clearError(input) {
        const formGroup = input.closest('.form__group');
        const errorElement = formGroup.querySelector('.form__error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('is-invalid');
    }

    function initForms() {
        if (FORM_CHAMADO) {
            FORM_CHAMADO.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = document.getElementById('email');
                if (!isValidEmail(emailInput.value)) {
                    showError(emailInput, 'Por favor, insira um e-mail válido');
                    return;
                } else {
                    clearError(emailInput);
                }
                
                const termosInput = document.getElementById('termos');
                if (!termosInput.checked) {
                    showError(termosInput, 'Você deve aceitar os termos para continuar');
                    return;
                } else {
                    clearError(termosInput);
                }
                
                alert('Chamado enviado com sucesso! Entraremos em contato em breve.');
                FORM_CHAMADO.reset();
            });
        }

        if (FORM_CONTATO) {
            FORM_CONTATO.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const requiredFields = FORM_CONTATO.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        showError(field, 'Este campo é obrigatório');
                        isValid = false;
                    } else {
                        clearError(field);
                        
                        if (field.type === 'email' && !isValidEmail(field.value)) {
                            showError(field, 'Por favor, insira um e-mail válido');
                            isValid = false;
                        }
                    }
                });
                
                if (isValid) {
                    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
                    FORM_CONTATO.reset();
                }
            });
        }
    }

    function initFAQAccordion() {
        FAQ_ACCORDION.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                
                const icon = this.querySelector('.bi');
                if (this.classList.contains('active')) {
                    icon.classList.remove('bi-question-circle');
                    icon.classList.add('bi-check-circle');
                } else {
                    icon.classList.remove('bi-check-circle');
                    icon.classList.add('bi-question-circle');
                }
            });
        });
    }

    function initScrollTopButton() {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                SCROLL_TOP_BTN.classList.add('show');
            } else {
                SCROLL_TOP_BTN.classList.remove('show');
            }
        });
        
        SCROLL_TOP_BTN.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function initAnimations() {
        const animatedElements = document.querySelectorAll('.animate-fadeIn');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    document.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    NAV_TOGGLER.click();
                }
            }
        });
    });

    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = value.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
                e.target.value = !value[2] ? value[1] : 
                                '(' + value[1] + ') ' + value[2] + 
                                (value[3] ? '-' + value[3] : '');
            }
        });
    }
});
