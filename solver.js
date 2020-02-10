/* Inicializar celulas */
var jogoComCell = [ [], [], [],
                    [], [], [],
                    [], [], []  ];


function PintaBorda(x, y, cor)
{
    var corF = "bg-border-" + cor;
    var id = "" + (y+1) + "" + (x+1) + "";
    console.log(corF, id);
    document.getElementById(id).parentElement.classList.add(corF);
}

function RemoveBorda(x, y, cor)
{
    var corF = "bg-border-" + cor;
    var id = "" + (y+1) + "" + (x+1) + "";
    console.log(corF, id);
    document.getElementById(id).parentElement.classList.remove(corF);
}

var xS = 0;
var yS = 0;

PintaBorda(xS, yS, "laranja");

var xSHtml = document.getElementById("xS");
var ySHtml = document.getElementById("yS");

function MaisX() { if(xS == 8) return; xS += 1; }
function MenosX() { if(xS == 0) return; xS -= 1; }
function MaisY() { if(yS == 8) return; yS += 1; }
function MenosY() { if(yS == 0) return; yS -= 1; }

function AlterarQuadrado(op)
{
    RemoveBorda(xS, yS, "laranja");

    if(op == "+x") { MaisX(); } else 
    if(op == "-x") { MenosX(); } else
    if(op == "+y") { MaisY(); } else
    if(op == "-y") { MenosY(); }

    xSHtml.textContent = xS;
    ySHtml.textContent = yS;

    PintaBorda(xS, yS, "laranja");
    a(yS, xS);
}
                    
class cell{
/* Construtor que aceita um numero */
    constructor(id, num)
    {
        this.id = id;
        if(num != 0)
        {
            this.base = true;
            this.filled = true;
            this.numerosPossiveis = [num];
            this.numero = num;
        } else 
        {
            this.base = false;
            this.filled = false;
            this.numerosPossiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.numero = 0;
        }
    }

    setNumero = function(num){
        this.filled = true;
        this.numerosPossiveis = [num];
        this.numero = num;
    }
    
}

function a(i, j)
{
    var idCell   = document.getElementById("idCell");
    var numCell  = document.getElementById("numCell");
    var isFilled = document.getElementById("isFilled");
    var base     = document.getElementById("base");
    var numP     = document.getElementById("numP");
    
    idCell.textContent = jogoComCell[i][j].id;
    numCell.textContent = jogoComCell[i][j].numero;
    isFilled.textContent = jogoComCell[i][j].filled;
    base.textContent = jogoComCell[i][j].base;
    numP.textContent = jogoComCell[i][j].numerosPossiveis.join(" ");
    
    console.log(i, j);
}


function btnLoad()
{
    console.log("teste");
    var jogo = [
        [0, 0, 0,  0, 6, 8,  0, 3, 0],
        [1, 9, 0,  0, 0, 0,  0, 0, 0],
        [8, 0, 3,  1, 0, 0,  2, 0, 0],
        
        [4, 0, 0,  0, 5, 1,  0, 6, 0],
        [7, 0, 0,  0, 2, 0,  0, 0, 4],
        [0, 0, 0,  0, 7, 0,  8, 0, 0],
        
        [0, 1, 0,  0, 0, 5,  0, 0, 7],
        [0, 0, 4,  0, 0, 0,  0, 0, 0],
        [0, 5, 0,  0, 3, 0,  1, 0, 0]
    ];
    
    for(var i = 0; i < jogo.length; i++)
    {
        for(var j = 0; j < jogo[i].length; j++)
        {
            var id = "" + (i+1) + "" + (j+1) + "";

            if(jogo[i][j] != 0)
            {
                document.getElementById(id).textContent = jogo[i][j];
                document.getElementById(id).parentElement.classList.add("bg-grey");
                // document.getElementById(id).classList.add("bg-border-green");
            }
            
            jogoComCell[i][j] = new cell(id, jogo[i][j]);
            
            
            
            
            document.getElementById(id).onclick = (function(i, j) {
                return function(){
                    a(i, j);
                } 
            })(i, j);
        }
    }
}

function R(arr, num)
{
    arr.indexOf(num) !== -1 && arr.splice(arr.indexOf(num), 1)
}

/* 0, 1 */
function VerificarHorizontal(xNum, yNum)
{
    console.log("Numero a ser verificado: ", jogoComCell[xNum][yNum].numero);
    for(var y = 0; y < 9; y++)
    {
        if(y != yNum)
        {
            R(jogoComCell[xNum][y].numerosPossiveis, jogoComCell[xNum][yNum].numero);
        }
    }
}

function VerificarVertical(xNum, yNum)
{
    console.log("Numero a ser verificado: ", jogoComCell[xNum][yNum].numero);
    for(var x = 0; x < 9; x++)
    {
        if(x != xNum)
        {
            R(jogoComCell[x][yNum].numerosPossiveis, jogoComCell[xNum][yNum].numero);
        }
    }
}

function Verificar3x3(xNum, yNum)
{
    console.log("Numero a ser verificado: ", jogoComCell[xNum][yNum].numero);
    for(var x = 0; x < 9; x++)
    {
        if(x != xNum)
        {
            R(jogoComCell[x][yNum].numerosPossiveis, jogoComCell[xNum][yNum].numero);
        }
    }
}

function VerificaH(){ VerificarHorizontal(yS, xS); }
function VerificaV(){ VerificarVertical(yS, xS); }

function VerificaCasosUnicos()
{
    for(var i = 0; i < 9; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            // if(jogoComCell[i][j].numerosPossiveis.length == 1)
            // {
            //     var id = "" + (j+1) + "" + (i+1) + "";
            //     document.getElementById(id).textContent = jogoComCell[i][j].numerosPossiveis[0];
                
            //     jogoComCell[i][j].setNumero(jogoComCell[i][j].numerosPossiveis[0]);
            // }
        }
    }
}


function Resolver()
{
    for(var i = 0; i < 9; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            VerificarHorizontal(i, j);
            VerificarVertical(i, j);

            VerificaCasosUnicos();
        }
    }
}

var jogoTerminado = false;
// while(!jogoTerminado)
// {
    
// }
