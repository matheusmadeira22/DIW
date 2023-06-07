let users = [];
const card = document.querySelector('#cards');
const searchInput = document.querySelector("[data-search]");

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    users = exibirProdutos(data);
    searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      users.forEach(user => {
        const isVisible = user.title.toLowerCase().includes(value);
        user.element.style.display = isVisible ? 'block' : 'none';
      });
    });
  });

function exibirProdutos(data) {
  return data.map(user => {
    const { id, title, price, description, category, image } = user;
    console.log(user)
    const element = document.createElement('div');
    element.classList.add('card');
    element.innerHTML = `
      <div class="container">
        <img src="${image}" alt="Avatar" style="width:100%">
        <h4><b>$${price}</b></h4>
        <h4><b>${category}</b?</h4>
        <p>${title}</p>
        <a href="detalhes.html?id=${id}"><i class="fa-solid fa-circle-plus"></i></a>
      </div>
    `;
    card.appendChild(element);
    return { title, id, image, description, category, element };
  });
}

function filterProduct(category) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach(button => {
    if (category.toLowerCase() === button.innerText.toLowerCase()) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  users.forEach(user => {
    let currentCategory = category.toLowerCase();
    if (currentCategory === 'all' || user.category.toLowerCase().includes(currentCategory)) {
      user.element.style.display = 'block';
    } else {
      let userCategory = user.category.toLowerCase();
      if (currentCategory === "menswear" && (userCategory === "menswear" || userCategory === "men's clothing")) {
        user.element.style.display = 'block';
      } else if (currentCategory === "womenwear" && (userCategory === "womenwear" || userCategory === "women's clothing")) {
        user.element.style.display = 'block';
      } else {
        user.element.style.display = 'none';
      }
    }
  });
}

window.onload = () => {
  filterProduct("all");
};
