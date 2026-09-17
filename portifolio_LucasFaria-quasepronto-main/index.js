//Navegação
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Efeito de fade-in quando as seções carregar
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Aplica uma cor de fundo diferente quando a seção estiver visível
        entry.target.style.backgroundColor =
          entry.target.dataset.activeColor ||
          entry.target.style.backgroundColor;
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      } else {
        // Restaura a cor original quando sair da seção de visualização
        entry.target.style.backgroundColor = 
          entry.target.dataset.defaultColor ||
          entry.target.style.backgroundColor;
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => {
  // Armazena as cores padrão e ativa
  section.dataset.defaultColor = section.style.backgroundColor;
  section.dataset.activeColor =
    section.id === "sobre"
      ? "#201e1e;"
      : section.id === "projetos"
      ? "#270025;"
      : section.id === "habilidades"
      ? "#e0e0e0"
      : "#f0f8ff"; // Cores ativas personalizadas
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition =
    "opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease";
  observer.observe(section);
});
