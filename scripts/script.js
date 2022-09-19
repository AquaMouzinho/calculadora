function somar(total, numeroDaVez) {
  total += numeroDaVez;
  return total;
}

function subtrair(total, numeroDaVez) {
  total -= numeroDaVez;
  return total;
}

function dividir(total, numeroDaVez) {
  total = total / numeroDaVez;
  return total;
}

function multiplicar(total, numeroDaVez) {
  total = total * numeroDaVez;
  return total;
}

function resultadoEquacao(textoEquacao) {
  let listaEquacao = textoEquacao.split(' ');
  let result = 0;
  console.log(listaEquacao);

  for (let i in listaEquacao) {
    if (i == 0) {
      result = parseFloat(listaEquacao[i]);

    } else {
      if (i % 2 == 0) {
        if (somando) {
          result = somar(result, parseFloat(listaEquacao[i]));
          somando = false;
        } else if (subtraindo) {
          result = subtrair(result, parseFloat(listaEquacao[i]));
          subtraindo = false;
        } else if (multiplicando) {
          result = multiplicar(result, parseFloat(listaEquacao[i]));
          multiplicando = false;
        } else if (dividindo) {
          result = dividir(result, parseFloat(listaEquacao[i]));
          dividindo = false;
        }
      } else {
        switch (listaEquacao[i]) {
          case '+':
            somando = true;
            break;
          case '-':
            subtraindo = true;
            break;
          case 'x':
            multiplicando = true;
            break;
          case '/':
            dividindo = true;
            break;
        }
      }
    }
  }
  console.log(result);
  return result;
}

function limparHistorico() {
  let btnLimpar = document.getElementById('btnLimpHist');
  var historico = document.getElementById('divHistorico');

  listaDeEquacoes = [];
  btnLimpar.style.display = 'none';
  historico.style.alignItems = 'center';
  historico.style.justifyContent = 'center';
  historico.innerHTML = `<p>sem historico</p>`;
}

function limparEquacao() {
  let equacao = document.getElementById('linhaEquacao');
  equacao.innerHTML = '';
}

function clicar(element) {
  let displayer = document.getElementById('entradaCalculadora');
  let equacao = document.getElementById('linhaEquacao');

  switch (element.target.innerHTML) {
    case 'CLEAR':
      displayer.innerHTML = '0';
      break;
    case '=':
      resultado = resultadoEquacao(equacao.innerHTML);
      displayer.innerHTML = resultado;
      mostrandoResultado = true;
      listaDeEquacoes.push([equacao.innerHTML, resultado]);
      console.log(listaDeEquacoes);
      atualizarHistorico();
      break;
    case '+':
      if (mostrandoResultado) {
        mostrandoResultado = false;
      }

      if (!meioOperacao) {
        displayer.innerHTML = '0';
        equacao.innerHTML += ' ' + element.target.innerHTML + ' ';
        meioOperacao = true;
      }

      break;
    case '-':
      if (mostrandoResultado) {
        mostrandoResultado = false;
      }
      if (!meioOperacao) {
        displayer.innerHTML = '0';
        equacao.innerHTML += ' ' + element.target.innerHTML + ' ';
        meioOperacao = true;
      }
      break;
    case 'x':
      if (mostrandoResultado) {
        mostrandoResultado = false;
      }

      if (!meioOperacao) {
        displayer.innerHTML = '0';
        equacao.innerHTML += ' ' + element.target.innerHTML + ' ';
        meioOperacao = true;
      }
      break;
    case '/':
      if (mostrandoResultado) {
        mostrandoResultado = false;
      }

      if (!meioOperacao) {
        displayer.innerHTML = '0';
        equacao.innerHTML += ' ' + element.target.innerHTML + ' ';
        meioOperacao = true;
      }
      break;
    default:
      if (meioOperacao) {
        meioOperacao = false;
      }

      if (equacao.innerHTML === '') {
        equacao.innerHTML = element.target.innerHTML;
      } else {
        if (mostrandoResultado) {
          equacao.innerHTML = '';
        }
        equacao.innerHTML += element.target.innerHTML;
      }

      if (displayer.innerHTML === '0') {
        displayer.innerHTML = element.target.innerHTML;
      } else {
        if (mostrandoResultado) {
          displayer.innerHTML = element.target.innerHTML;
          mostrandoResultado = false;
        } else {
          displayer.innerHTML += element.target.innerHTML;
        }
      }
      break;
  }
}

function atualizarHistorico() {
  let btnLimpar = document.getElementById('btnLimpHist');
  var historico = document.getElementById('divHistorico');
  historico.innerHTML = '';
  historico.style.alignItems = 'flex-end';
  historico.style.justifyContent = 'flex-start';
  btnLimpar.style.display = 'inline-block';

  for (let i in listaDeEquacoes) {
    historico.innerHTML += `<hr><div class='item-historico'><p class='item-equacao'>${listaDeEquacoes[i][0]}</p><p class='item-resultado'>${listaDeEquacoes[i][1]}</p></div>`;
  }
}

function disponibilizarTeclado() {
  const teclasCalc = [
    { nome: 'CLEAR', tipo: 'clear' },
    { nome: '/', tipo: 'content' },
    { nome: 'x', tipo: 'content' },
    { nome: '7', tipo: 'content' },
    { nome: '8', tipo: 'content' },
    { nome: '9', tipo: 'content' },
    { nome: '-', tipo: 'content' },
    { nome: '4', tipo: 'content' },
    { nome: '5', tipo: 'content' },
    { nome: '6', tipo: 'content' },
    { nome: '+', tipo: 'plus' },
    { nome: '1', tipo: 'content' },
    { nome: '2', tipo: 'content' },
    { nome: '3', tipo: 'content' },
    { nome: '0', tipo: 'content' },
    { nome: '00', tipo: 'content' },
    { nome: '.', tipo: 'content' },
    { nome: '=', tipo: 'equals' }
  ]

  var teclado = document.getElementById('divTeclado');

  for (let item in teclasCalc) {
    if (!(teclasCalc[item].tipo === 'content')) {
      if (teclasCalc[item].tipo === 'clear') {
        teclado.innerHTML += `<div class="tecla ${teclasCalc[item].tipo}" onclick="clicar(event)" ondblclick="limparEquacao()">${teclasCalc[item].nome}</div>`
      } else {
        teclado.innerHTML += `<div class="tecla ${teclasCalc[item].tipo}" onclick="clicar(event)">${teclasCalc[item].nome}</div>`
      }
    } else {
      teclado.innerHTML += `<div class="tecla" onclick="clicar(event)">${teclasCalc[item].nome}</div>`
    }
  }
}

function mudarView() {
  var optSelecionada = sel.options[sel.selectedIndex].value;
  console.log(optSelecionada);
  if (!(telaAtual == optSelecionada)) {
    document.getElementsByClassName(`sec-${telaAtual}`)[0].style.display = 'none';
    document.getElementsByClassName(`sec-${optSelecionada}`)[0].style.display = 'block';
    telaAtual = optSelecionada;
  }
}

var listaDeEquacoes = [];
var somando = false;
var subtraindo = false;
var multiplicando = false;
var dividindo = false;
var mostrandoResultado = false;
var meioOperacao = false;
var resultado = 0;
var telaAtual = 'basica';

var btnLimpar = document.getElementById('btnLimpHist');
btnLimpar.onclick = limparHistorico;

var sel = document.getElementById('selModoCalculadora');
sel.onchange = mudarView;

$(document).ready(function () {
  $('select').niceSelect();
});

disponibilizarTeclado();