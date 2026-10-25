/* ==========================================================================
   AuraPharma Excellence - Lógica JavaScript
   ========================================================================== */

// Base de Dados de Produtos
const products = [
  {
    id: 1,
    name: "Sérum Facial Vichy Mineral 89",
    category: "Dermocosméticos",
    price: 139.90,
    badge: "Mais Vendido",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Vitamina C Imunidade 1000mg Premium",
    category: "Suplementos",
    price: 64.90,
    badge: "Ofertão",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Protetor Solar La Roche-Posay Anthelios SPF60",
    category: "Dermocosméticos",
    price: 99.90,
    badge: "Dermatológico",
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Omega 3 Ultra Puro EPA/DHA 120 Cápsulas",
    category: "Suplementos",
    price: 119.00,
    badge: "Importado",
    rating: 4.9,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Creme Hidratante CeraVe Pele Seca 454g",
    category: "Higiene",
    price: 108.90,
    badge: "Recomendado",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1608248597309-8664157580b0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Fórmula Infantil Aptamil Profutura Gold 800g",
    category: "Infantil",
    price: 89.90,
    badge: "Nutrição",
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Analpico Dor e Febre Dipirona 1g 20 Comprimidos",
    category: "Medicamentos",
    price: 18.50,
    badge: "Essencial",
    rating: 4.8,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Colágeno Verisol Hidrolisado em Pó",
    category: "Suplementos",
    price: 145.00,
    badge: "Beleza & Pele",
    rating: 4.9,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
  }
];

// Carrinho de Compras
let cart = [];

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
});

// Renderização dos Produtos
function renderProducts(items) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum produto encontrado nessa categoria.</p>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <span class="product-badge">${product.badge}</span>
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h4 class="product-title">${product.name}</h4>
        <div class="product-rating">
          <i class="fa-solid fa-star"></i> ${product.rating} <span>(${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
          <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Adicionar ao Carrinho">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Configuração de Eventos
function setupEventListeners() {
  // Filtros de Categoria
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const category = e.target.getAttribute('data-category');
      if (category === 'Todos') {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
      }
    });
  });

  // Busca em Tempo Real
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });

  // Eventos do Carrinho (Abre/Fecha)
  const cartTrigger = document.getElementById('cartTrigger');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');

  cartTrigger.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
  });

  const closeCart = () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
  };

  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Manipulação de Upload de Arquivo
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('pFile');
  const fileNameDisplay = document.getElementById('fileNameDisplay');

  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
      fileNameDisplay.style.color = "var(--primary-color)";
      fileNameDisplay.style.fontWeight = "bold";
    }
  });
}

// Filtro rápido clicando nas categorias superiores
function filterCategory(catName) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => {
    if(b.getAttribute('data-category') === catName) {
      b.click();
    }
  });
  document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

// Funções do Carrinho de Compras
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  
  // Abre o carrinho para dar feedback ao cliente
  document.getElementById('cartSidebar').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
}

function updateCartUI() {
  const cartBody = document.getElementById('cartBody');
  const cartBadge = document.getElementById('cartBadge');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  cartBadge.textContent = totalItems;
  cartCount.textContent = totalItems;
  cartTotal.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

  cartBody.innerHTML = '';

  if (cart.length === 0) {
    cartBody.innerHTML = `<div style="text-align:center; padding: 40px 0; color: var(--text-muted);"><i class="fa-solid fa-basket-shopping" style="font-size: 3rem; margin-bottom: 10px;"></i><p>Seu carrinho está vazio.</p></div>`;
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span><strong>${item.qty}</strong></span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    cartBody.appendChild(itemEl);
  });
}

function changeQty(productId, delta) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
}

// Finalizar Pedido do Carrinho via WhatsApp
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let message = "Olá AuraPharma! Gostaria de finalizar meu pedido com os seguintes itens:\n\n";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    message += `• ${item.qty}x ${item.name} - R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
  });

  message += `\n*Total Estimado: R$ ${total.toFixed(2).replace('.', ',')}*`;
  message += "\n\nPor favor, confirmem a disponibilidade e o valor da entrega.";

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/5562993669106?text=${encodedMessage}`, '_blank');
}

// Envio do Formulário de Receita para WhatsApp
function handlePrescriptionSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('pName').value;
  const phone = document.getElementById('pPhone').value;
  const obs = document.getElementById('pObs').value;

  let message = `Olá AuraPharma! Gostaria de um orçamento para minha receita médica.\n\n`;
  message += `*Nome:* ${name}\n`;
  message += `*Telefone/Whats:* ${phone}\n`;
  if (obs) message += `*Observações:* ${obs}\n`;
  message += `\n(Estou enviando a foto da receita em anexo aqui no chat)`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
}