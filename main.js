document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.querySelector("main");
    mainContent.classList.add("visible");

    // Defina os elementos dentro do DOMContentLoaded
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    // Certifique-se de que os elementos existem antes de adicionar os eventos
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');

            // Alterna a classe 'show' no menu
            navMenu.classList.toggle('show');
        });
    }

    // Inicializa o carrossel
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.carousel-item');
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });
    }
    // Função de scroll automático (se necessário)
    const slider = document.querySelector('.themes-wrapper');
    let isDown = false;
    let scrollLeft;
    let scrollSpeed = window.innerWidth < 768 ? 0.8 : 0.6; 
    let scrollPos = 0;

    window.addEventListener('resize', () => {
        scrollSpeed = window.innerWidth < 768 ? 0.8 : 0.6;
    });

    // Função para scroll automático
    function autoScroll() {
        if (!isDown && slider.scrollWidth > slider.clientWidth) {
            scrollPos += scrollSpeed;
            slider.scrollLeft = scrollPos;

            // Verifica se chegou ao final do conteúdo e reinicia o scroll
            if (scrollPos >= slider.scrollWidth / 2) {
                scrollPos = 0; // Reinicia a posição
            }
        }
        
        requestAnimationFrame(autoScroll); // Mantém o loop
    }

    // Inicia o scroll automático, se necessário
    if (slider) {
        autoScroll();
    }
});
let currentSlide = 0;
// sobre
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'fade-in', 'fade-out'); // Remove classes de animação
        if (i === currentSlide) {
            slide.classList.add('fade-in'); // Adiciona animação de entrada
            slide.classList.add('active'); // Define como ativo
        } else {
            slide.classList.add('fade-out'); // Adiciona animação de saída para os não ativos
        }
    });
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Inicializa o primeiro slide
showSlide(currentSlide);

// Função para rolar até o topo da página
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Exibir o botão quando o usuário rolar para baixo
window.onscroll = function () {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
};
// Seletores principais
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-img"); // Certifique-se de que a imagem no modal tenha o id 'modal-img'
const closeButton = document.getElementsByClassName("close")[0]; // O botão de fechar

// Lista de imagens pequenas (carrossel)
const smallImages = document.querySelectorAll('.carrossel-item img'); // Seleciona todas as imagens pequenas do carrossel

// Função para abrir o modal com a imagem
function openModal(imageSrc) {
    modal.style.display = "flex"; // Exibe o modal
    modal.classList.add("show"); // Ativa a animação de entrada
    modalImg.src = imageSrc; // Atualiza a imagem do modal
    document.body.style.overflow = "hidden"; // Impede o scroll da página
}

// Função para fechar o modal
function closeModal() {
    modal.classList.remove("show"); // Remove a animação de entrada
    setTimeout(() => {
        modal.style.display = "none"; // Esconde o modal depois da animação
    }, 500); // Atraso para permitir que a animação de saída seja concluída
    document.body.style.overflow = "auto"; // Restaura o scroll da página
}


// Função para alternar o modal (abrir ou fechar ao clicar na imagem)
function toggleModal(imageSrc) {
    if (modal.style.display === "flex") {
        closeModal(); // Se o modal estiver aberto, fecha-o
    } else {
        openModal(imageSrc); // Se o modal estiver fechado, abre-o com a imagem
    }
}


// Event listener para fechar o modal ao clicar na área fora da imagem
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(); // Fecha o modal ao clicar fora da imagem
});

// Configuração de clique nas imagens do carrossel (imagens pequenas)
smallImages.forEach((img) => {
    img.addEventListener('click', () => openModal(img.src)); // Abre o modal com a imagem clicada
});

// Configuração do fechamento do modal com o botão de fechar
closeButton.addEventListener("click", closeModal);
