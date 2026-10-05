/* ==================================================
   TJ BURGUER
   CARDÁPIO + CARRINHO + CHECKOUT + WHATSAPP
================================================== */


/* ==================================================
   CONFIGURAÇÕES
================================================== */

const numeroWhatsApp = "5562982673927";


// Altere este valor quando soubermos a taxa real.
// Por enquanto deixaremos R$ 5,00 para testar o sistema.
const taxaEntrega = 5.00;


/* ==================================================
   PRODUTOS
================================================== */

const produtos = [

    // =========================
    // HAMBÚRGUERES
    // =========================

    {
        id: 1,
        nome: "Classic burguer",
        categoria: "hamburguer",
        descricao:
            "Pão brioche, blend bovino 120g, queijo cheddar derretido e molho especial.",
        preco: 14.90,
        imagem: "images/classic burguer.jpg"
    },

    {
        id: 2,
        nome: "Classic Bacon",
        categoria: "hamburguer",
        descricao:
            "Pão brioche, blend bovino 120g, queijo cheddar derretido, bacon crocante e molho da casa.",
        preco: 19.90,
        imagem: "images/classic bacon.jpg"
    },

    {
        id: 3,
        nome: "Salada Artesanal",
        categoria: "hamburguer",
        descricao:
            "Pão brioche, blend bovino 120g, queijo cheddr derretido, tomate, alface e molho da casa",
        preco: 16.90,
        imagem: "images/salada.jpg"
    },

    {
        id: 4,
        nome: "Duplo burguer",
        categoria: "hamburguer",
        descricao:
            "Pão brioche, 2 blends bovino 100g cada, 2 fatias queijo cheddar derretido, fatias de bacon e molho especial da casa.",
        preco: 32.90,
        imagem: "images/duplo.jpg"
    },


    // =========================
    // ACOMPANHAMENTOS
    // =========================

    {
        id: 6,
        nome: "Batata Tradicional",
        categoria: "acompanhamento",
        descricao:
            "Porção 250g de batatas fritas crocantes e sequinhas.",
        preco: 12.90,
        imagem: "images/batata simples.jpg"
    },

    {
        id: 7,
        nome: "Batata com Cheddar",
        categoria: "acompanhamento",
        descricao:
            "Porção 300g de batatas fritas cobertas com cheddar cremoso.",
        preco: 16.90,
        imagem: "images/batata cheddar.jpg"
    },

    {
        id: 8,
        nome: "Batata Bacon & Cheddar",
        categoria: "acompanhamento",
        descricao:
            "Porção 500g de batatas crocantes, cheddar cremoso e bacon.",
        preco: 19.90,
        imagem: "images/batata bacon cheddar.jpg"
    },


    // =========================
    // BEBIDAS
    // =========================

    {
        id: 9,
        nome: "Coca-Cola",
        categoria: "bebida",
        descricao:
            "Coca-Cola gelada.",
        preco: 6.00,
        imagem: "images/coca350.jpg"
    },

    {
        id: 10,
        nome: "Guarana Mineiro",
        categoria: "bebida",
        descricao:
            "Guaraná gelado.",
        preco: 6.00,
        imagem: "images/mineiro.jpg"
    },

    {
        id: 11,
        nome: "Água Mineral",
        categoria: "bebida",
        descricao:
            "Água mineral gelada.",
        preco: 3.50,
        imagem: "images/agua.jpg"
    }

];


/* ==================================================
   CARRINHO
================================================== */

let carrinho =
    JSON.parse(
        localStorage.getItem("carrinhoTJBurguer")
    ) || [];


/* ==================================================
   ELEMENTOS
================================================== */

const listaHamburgueres =
    document.getElementById("listaHamburgueres");

const listaAcompanhamentos =
    document.getElementById("listaAcompanhamentos");

const listaBebidas =
    document.getElementById("listaBebidas");


const carrinhoElemento =
    document.getElementById("carrinho");

const carrinhoOverlay =
    document.getElementById("carrinhoOverlay");

const carrinhoItens =
    document.getElementById("carrinhoItens");

const contadorCarrinho =
    document.getElementById("contadorCarrinho");

const subtotalCarrinho =
    document.getElementById("subtotalCarrinho");

const totalCarrinho =
    document.getElementById("totalCarrinho");

const taxaEntregaTexto =
    document.getElementById("taxaEntregaTexto");


const checkoutOverlay =
    document.getElementById("checkoutOverlay");

const checkoutItens =
    document.getElementById("checkoutItens");

const checkoutTotal =
    document.getElementById("checkoutTotal");


/* ==================================================
   FORMATAR DINHEIRO
================================================== */

function formatarDinheiro(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==================================================
   RENDERIZAR PRODUTOS
================================================== */

function criarCardProduto(produto) {

    return `
        <article class="produto">

            <div class="produto-imagem">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

            </div>


            <div class="produto-conteudo">

                <h3>
                    ${produto.nome}
                </h3>


                <p>
                    ${produto.descricao}
                </p>


                <div class="produto-final">

                    <strong>
                        ${formatarDinheiro(produto.preco)}
                    </strong>


                    <button
                        type="button"
                        class="botao-adicionar"
                        onclick="adicionarAoCarrinho(${produto.id})"
                    >
                        + ADICIONAR
                    </button>

                </div>

            </div>

        </article>
    `;

}


function renderizarProdutos() {

    const hamburgueres =
        produtos.filter(
            produto =>
                produto.categoria === "hamburguer"
        );


    const acompanhamentos =
        produtos.filter(
            produto =>
                produto.categoria === "acompanhamento"
        );


    const bebidas =
        produtos.filter(
            produto =>
                produto.categoria === "bebida"
        );


    listaHamburgueres.innerHTML =
        hamburgueres
            .map(criarCardProduto)
            .join("");


    listaAcompanhamentos.innerHTML =
        acompanhamentos
            .map(criarCardProduto)
            .join("");


    listaBebidas.innerHTML =
        bebidas
            .map(criarCardProduto)
            .join("");

}


/* ==================================================
   ADICIONAR PRODUTO
================================================== */

function adicionarAoCarrinho(id) {

    const produto =
        produtos.find(
            produto =>
                produto.id === id
        );


    const produtoNoCarrinho =
        carrinho.find(
            item =>
                item.id === id
        );


    if (produtoNoCarrinho) {

        produtoNoCarrinho.quantidade++;

    } else {

        carrinho.push({

            ...produto,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    mostrarToast(
        `${produto.nome} adicionado!`
    );

}


/* ==================================================
   SALVAR
================================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinhoTJBurguer",
        JSON.stringify(carrinho)
    );

}


/* ==================================================
   ALTERAR QUANTIDADE
================================================== */

function alterarQuantidade(id, quantidade) {

    const item =
        carrinho.find(
            produto =>
                produto.id === id
        );


    if (!item) {
        return;
    }


    item.quantidade += quantidade;


    if (item.quantidade <= 0) {

        removerProduto(id);

        return;

    }


    salvarCarrinho();

    atualizarCarrinho();

}


/* ==================================================
   REMOVER
================================================== */

function removerProduto(id) {

    carrinho =
        carrinho.filter(
            produto =>
                produto.id !== id
        );


    salvarCarrinho();

    atualizarCarrinho();

}


/* ==================================================
   SUBTOTAL
================================================== */

function calcularSubtotal() {

    return carrinho.reduce(

        (total, produto) => {

            return total +
                produto.preco *
                produto.quantidade;

        },

        0

    );

}


/* ==================================================
   QUANTIDADE TOTAL
================================================== */

function calcularQuantidadeTotal() {

    return carrinho.reduce(

        (total, produto) =>
            total + produto.quantidade,

        0

    );

}


/* ==================================================
   TIPO DE ENTREGA
================================================== */

function obterTipoEntrega() {

    const selecionado =
        document.querySelector(
            'input[name="tipoEntrega"]:checked'
        );


    return selecionado
        ? selecionado.value
        : "entrega";

}


/* ==================================================
   TOTAL
================================================== */

function calcularTotal() {

    const subtotal =
        calcularSubtotal();


    const tipoEntrega =
        obterTipoEntrega();


    if (tipoEntrega === "entrega") {

        return subtotal + taxaEntrega;

    }


    return subtotal;

}


/* ==================================================
   ATUALIZAR CARRINHO
================================================== */

function atualizarCarrinho() {

    contadorCarrinho.textContent =
        calcularQuantidadeTotal();


    if (carrinho.length === 0) {

        carrinhoItens.innerHTML = `

            <div class="carrinho-vazio">

                <span>🛒</span>

                Seu carrinho está vazio.

            </div>
        `;

    } else {

        carrinhoItens.innerHTML =
            carrinho.map(item => `

                <div class="item-carrinho">

                    <img
                        src="${item.imagem}"
                        alt="${item.nome}"
                    >


                    <div>

                        <h4>
                            ${item.nome}
                        </h4>


                        <div class="item-carrinho-preco">

                            ${formatarDinheiro(
                                item.preco *
                                item.quantidade
                            )}

                        </div>


                        <div class="item-controles">

                            <button
                                type="button"
                                onclick="alterarQuantidade(${item.id}, -1)"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantidade}
                            </span>


                            <button
                                type="button"
                                onclick="alterarQuantidade(${item.id}, 1)"
                            >
                                +
                            </button>


                            <button
                                type="button"
                                class="remover-item"
                                onclick="removerProduto(${item.id})"
                            >
                                Remover
                            </button>

                        </div>

                    </div>

                </div>

            `).join("");

    }


    const subtotal =
        calcularSubtotal();


    subtotalCarrinho.textContent =
        formatarDinheiro(subtotal);


    taxaEntregaTexto.textContent =
        "Calculada na finalização";


    totalCarrinho.textContent =
        formatarDinheiro(subtotal);

}


/* ==================================================
   ABRIR CARRINHO
================================================== */

function abrirCarrinho() {

    carrinhoElemento.classList.add("ativo");

    carrinhoOverlay.classList.add("ativo");

    document.body.classList.add("sem-scroll");

}


/* ==================================================
   FECHAR CARRINHO
================================================== */

function fecharCarrinho() {

    carrinhoElemento.classList.remove("ativo");

    carrinhoOverlay.classList.remove("ativo");

    document.body.classList.remove("sem-scroll");

}


/* ==================================================
   EVENTOS CARRINHO
================================================== */

document
    .getElementById("abrirCarrinho")
    .addEventListener(
        "click",
        abrirCarrinho
    );


document
    .getElementById("abrirCarrinhoHero")
    .addEventListener(
        "click",
        abrirCarrinho
    );


document
    .getElementById("verMeuPedido")
    .addEventListener(
        "click",
        abrirCarrinho
    );


document
    .getElementById("fecharCarrinho")
    .addEventListener(
        "click",
        fecharCarrinho
    );


carrinhoOverlay.addEventListener(
    "click",
    fecharCarrinho
);


/* ==================================================
   CHECKOUT
================================================== */

document
    .getElementById("irCheckout")
    .addEventListener(
        "click",
        abrirCheckout
    );


function abrirCheckout() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Adicione algum produto primeiro."
        );

        return;

    }


    fecharCarrinho();


    checkoutOverlay.classList.add("ativo");

    document.body.classList.add("sem-scroll");


    atualizarCheckout();

}


/* ==================================================
   FECHAR CHECKOUT
================================================== */

document
    .getElementById("fecharCheckout")
    .addEventListener(
        "click",
        fecharCheckout
    );


function fecharCheckout() {

    checkoutOverlay.classList.remove("ativo");

    document.body.classList.remove("sem-scroll");

}


/* ==================================================
   ENTREGA / RETIRADA
================================================== */

const radiosEntrega =
    document.querySelectorAll(
        'input[name="tipoEntrega"]'
    );


radiosEntrega.forEach(radio => {

    radio.addEventListener(
        "change",
        atualizarTipoEntrega
    );

});


function atualizarTipoEntrega() {

    const tipo =
        obterTipoEntrega();


    const dadosEndereco =
        document.getElementById(
            "dadosEndereco"
        );


    if (tipo === "entrega") {

        dadosEndereco.style.display =
            "block";

    } else {

        dadosEndereco.style.display =
            "none";

    }


    atualizarCheckout();

}


/* ==================================================
   PAGAMENTO / TROCO
================================================== */

const formaPagamento =
    document.getElementById(
        "formaPagamento"
    );


formaPagamento.addEventListener(
    "change",
    function () {

        const campoTroco =
            document.getElementById(
                "campoTroco"
            );


        if (
            formaPagamento.value ===
            "Dinheiro"
        ) {

            campoTroco.classList.add(
                "ativo"
            );

        } else {

            campoTroco.classList.remove(
                "ativo"
            );

        }

    }
);


/* ==================================================
   ATUALIZAR CHECKOUT
================================================== */

function atualizarCheckout() {

    checkoutItens.innerHTML =
        carrinho.map(item => `

            <div class="checkout-item">

                <span>
                    ${item.quantidade}x
                    ${item.nome}
                </span>

                <strong>
                    ${formatarDinheiro(
                        item.preco *
                        item.quantidade
                    )}
                </strong>

            </div>

        `).join("");


    checkoutTotal.textContent =
        formatarDinheiro(
            calcularTotal()
        );

}


/* ==================================================
   FINALIZAR WHATSAPP
================================================== */

document
    .getElementById("finalizarWhatsApp")
    .addEventListener(
        "click",
        finalizarPedido
    );


function finalizarPedido() {

    if (carrinho.length === 0) {

        mostrarToast(
            "Seu carrinho está vazio."
        );

        return;

    }


    const nome =
        document
            .getElementById("nomeCliente")
            .value
            .trim();


    const telefone =
        document
            .getElementById("telefoneCliente")
            .value
            .trim();


    const pagamento =
        document
            .getElementById("formaPagamento")
            .value;


    const observacoes =
        document
            .getElementById("observacoesCliente")
            .value
            .trim();


    const tipoEntrega =
        obterTipoEntrega();


    if (!nome) {

        mostrarToast(
            "Digite seu nome."
        );

        return;

    }


    if (!telefone) {

        mostrarToast(
            "Digite seu telefone."
        );

        return;

    }


    if (!pagamento) {

        mostrarToast(
            "Selecione a forma de pagamento."
        );

        return;

    }


    let endereco = "";


    if (tipoEntrega === "entrega") {

        const rua =
            document
                .getElementById("ruaCliente")
                .value
                .trim();


        const numero =
            document
                .getElementById("numeroCliente")
                .value
                .trim();


        const bairro =
            document
                .getElementById("bairroCliente")
                .value
                .trim();


        const complemento =
            document
                .getElementById("complementoCliente")
                .value
                .trim();


        if (
            !rua ||
            !numero ||
            !bairro
        ) {

            mostrarToast(
                "Preencha o endereço da entrega."
            );

            return;

        }


        endereco =
            `${rua}, ${numero} - ${bairro}`;


        if (complemento) {

            endereco +=
                ` - ${complemento}`;

        }

    }


    const subtotal =
        calcularSubtotal();


    const total =
        calcularTotal();


    let mensagem =

`🍔 *NOVO PEDIDO - TJ BURGUER*

👤 *Cliente:* ${nome}
📱 *Telefone:* ${telefone}

🛒 *PEDIDO*
`;


    carrinho.forEach(item => {

        mensagem +=
`${item.quantidade}x ${item.nome} - ${formatarDinheiro(
    item.preco * item.quantidade
)}
`;

    });


    mensagem +=
`
💰 *Subtotal:* ${formatarDinheiro(subtotal)}
`;


    if (tipoEntrega === "entrega") {

        mensagem +=
`🛵 *Taxa de entrega:* ${formatarDinheiro(taxaEntrega)}
`;

    }


    mensagem +=
`💵 *TOTAL:* ${formatarDinheiro(total)}

`;


    if (tipoEntrega === "entrega") {

        mensagem +=
`🛵 *Forma de recebimento:* Entrega
📍 *Endereço:* ${endereco}
`;

    } else {

        mensagem +=
`🏪 *Forma de recebimento:* Retirada no local
`;

    }


    mensagem +=
`
💳 *Pagamento:* ${pagamento}
`;


    if (pagamento === "Dinheiro") {

        const troco =
            document
                .getElementById("trocoCliente")
                .value
                .trim();


        if (troco) {

            mensagem +=
`💵 *Troco para:* ${troco}
`;

        }

    }


    if (observacoes) {

        mensagem +=
`
📝 *Observações:* ${observacoes}
`;

    }


    mensagem +=
`
Obrigado pelo pedido! 🍔🔥`;


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${
            encodeURIComponent(mensagem)
        }`;


    window.open(
        url,
        "_blank"
    );

}


/* ==================================================
   TOAST
================================================== */

let tempoToast;


function mostrarToast(mensagem) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        mensagem;


    toast.classList.add(
        "ativo"
    );


    clearTimeout(
        tempoToast
    );


    tempoToast =
        setTimeout(
            () => {

                toast.classList.remove(
                    "ativo"
                );

            },

            2500
        );

}


/* ==================================================
   INICIALIZAÇÃO
================================================== */

renderizarProdutos();

atualizarCarrinho();

atualizarTipoEntrega();