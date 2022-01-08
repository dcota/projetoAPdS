/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: scripts for activity configuration interface
*/

// variables for Inven!RA harvest
let summary = ''
let selectedBd = 0
let selectedQueries=[]

function init(){
    const sel = document.getElementById('sel')
    sel.addEventListener('change', () => {
        selectedBd = sel.value;
        console.log('Selected DB: ' + selectedBd) //logs the selected database id
        getQueries(sel.value)
    })
    getDbs()
    getSummary()
}


function getSummary(){
    const summaryBox = document.getElementById('summaryBox')
    summaryBox.addEventListener('keyup', () => {
        summary = summaryBox.value
        console.log('Summary: ' + summary) //logs the summary text
    })
}

function getDbs(){
    const tbl = document.getElementById('tbl')
    const sel= document.getElementById('sel')
    fetch('http://localhost:3000/initconfig')
    .then(res => res.json())
    .then(data => {  
        console.log(data)
        for(obj in data){
            let tbl_line = 
            `<tr> 
                <td>${data[obj].nome} <td>
                <td class="text-end">
                <button onclick="showModel(${data[obj].idBd});" type="button" class="btn btn-primary btn-sm me-4 " style="width:110px!important;">
                <i class="fas fa-search me-1" aria-hidden="true"></i>Ver modelo</button>
                <button onclick="showDetail('${data[obj].descr}');" type="button" class="btn btn-success btn-sm text-white" style="width:110px!important;">
                <i class="fas fa-eye me-1" aria-hidden="true"></i>Detalhes</button>
                <td>
            </tr>` 
            let op = 
            `<option value="${data[obj].idBd}">${data[obj].nome}</option>`
            tbl.innerHTML += tbl_line
            sel.innerHTML += op
        }
    })
    .catch((err) => {
        alert(err)
    })
}

function getQueries(id){
    const tbl = document.getElementById('tblqueries')
    tbl.innerHTML=''
    if (id!='Escolher...'){
        let obj = {
            id: id
        }
        let data = JSON.stringify(obj)
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            mode:'cors',
            body: data
        }
        fetch('http://localhost:3000/getqueries', options)
        .then(res => res.json())
        .then(data => showQueries(data))
        .catch((err)=>{
            alert('Ocorreu um erro...')
        })
    }
}

let queries = []
function showQueries(data){
    selectedQueries=[]
    queries = data
    const warning = document.getElementById('warning')
    warning.innerHTML = ''
    if(selectedQueries.length==0){
        warning.innerHTML +=
        `<div class="alert alert-danger" role="alert">
        Não há consultas escolhidas!
        </div>`
    }
    const tbl = document.getElementById('tblqueries')
    tbl.innerHTML = ''
    const tblhead = 
        `<thead>
            <tr>
                <th>Escolha as consultas:</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tbl_body">
        </tbody>`
    tbl.innerHTML += tblhead
    const tbl_body = document.getElementById('tbl_body')
    tbl_body.innerHTML = ''
    for(obj in data){
        let tbl_line = 
        `<tr> 
            <td class="col-md-2">
                <div class="form-check justify-content-end">
                    <input onchange="updateSelected(${data[obj].idQueries})" class="form-check-input" type="checkbox" value="${data[obj].idQueries}" id="cb">
                    <label class="form-check-label text-start" for="flexCheckDefault">Selecionar</label>
                </div>
            <td>
            <td class="col-md-8">${data[obj].textoQuery} <td>
            <td class="col-md-2">
               <button onclick="showSQLCode(${data[obj].idQueries});" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal"style="width:110px!important;">
                <i class="fas fa-search me-1" aria-hidden="true"></i>Ver SQL</button>
            </td>
        </tr>` 
        tbl_body.innerHTML += tbl_line
    }
}

function updateSelected(id){
    const warning = document.getElementById('warning')
    warning.innerHTML=''

    if(!selectedQueries.includes(id)){
        selectedQueries.push(id)
    }
    else {
        for(i in selectedQueries){
            if(id==selectedQueries[i])
            selectedQueries.splice(i,1)
        }
    }
    
    if(selectedQueries.length==0){
        warning.innerHTML +=
        `<div class="alert alert-danger" role="alert">
        Não há consultas escolhidas!
        </div>`
    } else {
        warning.innerHTML = ''
    }
    console.log('Selected queries: ' + selectedQueries)// logs the selected queries
}

function showSQLCode(id){
    for(obj in queries){
        if(queries[obj].idQueries == id){
            var modelWrap=null
            if(modelWrap!==null){
                modelWrap.remove()
            }
            modelWrap = document.createElement('div')
            modelWrap.innerHTML = 
            `<div class="modal">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Código SQL</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="white-space:pre;">
                        <p>${queries[obj].SQLcode}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>`
            document.body.append(modelWrap)
            var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
            modal.show()
        }
    }    
}

function showModel(id){
    obj= new Object()
    obj.id=id
    const ob = JSON.stringify(obj)
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        mode:'cors',
        body: ob
    }
    fetch('http://localhost:3000/getmodel',options)
    .then(res=>res.blob())
    .then(image => {
        const imageObjectURL = URL.createObjectURL(image);
        var modelWrap=null
        if(modelWrap!==null){
             modelWrap.remove()
         }
        modelWrap = document.createElement('div')
        modelWrap.innerHTML = 
            `<div class="modal">
                <div class="modal-dialog modal-lg"  >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modelo ER</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img class="img-fluid" src="${imageObjectURL}">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
            document.body.append(modelWrap)
            var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
            modal.show()
            })
    .catch((err) => {
        alert('Ocorreu um problema a obter o modelo ER')
    })           
}

function showDetail(descr){
    var modelWrap=null
    if(modelWrap!==null){
        modelWrap.remove()
    }
    modelWrap = document.createElement('div')
    modelWrap.innerHTML = 
        `<div class="modal">
            <div class="modal-dialog modal-lg"  >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Descrição da base de dados</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>${descr}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
    document.body.append(modelWrap)
    var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
    modal.show()
}
