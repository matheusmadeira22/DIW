const urlParametro = new URLSearchParams(window.location.search);
const productId = urlParametro.get('id');
fetch(`https://fakestoreapi.com/products/${productId}`)
.then(res=>res.json())
.then(data=>exibirProdutos(data))


function exibirProdutos(data) {
    console.log(data)
    const card = document.querySelector('#cards')
    card.innerHTML= `
    <div class="card">
        <div id="imagem">
            <img src="${data.image}" alt="Avatar" style="width:100%">
        </div>
        <div id="content">
        <div id="title">
            <h3>${data.title}</h3>
        </div>
        <div id="price">
            <p>$${data.price}</p>
        </div>
        <div id="description">
            <p>${data.description}</p>
        </div>
        </div>
    </div>
        `
}
