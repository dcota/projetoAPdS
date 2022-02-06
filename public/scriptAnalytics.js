/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: scripts for deploy interface
*/

let stdcode=''
let numQueries=0

function start(){
    showsp()
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	inveniraStdID = urlParams.get('inveniraStdID');
	activityID = urlParams.get('activityID');
    getData(inveniraStdID,activityID)
}

function getData(inveniraStdID,activityID) {
    console.log(inveniraStdID)
    console.log(activityID)
    var obj = new Object()
    obj.inveniraStdID = inveniraStdID
    obj.activityID = activityID
    ob = JSON.stringify(obj)
    console.log(ob)
    const options = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: ob
	};
    fetch('http://localhost:3000/detailedanalytics', options)
    .then(res => res.json())
    .then(data => {
        hidesp()
        let actstd = document.getElementById('actstd')
        actstd.innerHTML += `ID da atividade: ${data[0].activityID}` + '<br><br>'
        actstd.innerHTML += `ID do estudante: ${data[0].inveniraStdID} `
        const tbl = document.getElementById('tblqueries')
        const warning = document.getElementById('warning')
        warning.innerHTML=''
        if(data[0].studentData.length==0){
            warning.innerHTML +=
            `<div class="alert alert-danger" role="alert">
            Não há consultas submetidas!
            </div>`
        }
        const tblhead = 
        `<thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Consulta</th>
            <th scope="col">Resultado</th>
            </tr>
        </thead>
        <tbody id="tbl_body">
        </tbody>`
        tbl.innerHTML+=tblhead
        for(let i=0; i<data[0].studentData.length; i++) {
            console.log(data[0])
            let res=''
            let cons=''
            let color=''
            if(data[0].studentData[i].result==false) res='Incorreto'
                else res='Correto'
            if(data[0].studentData[i].query=='') cons='Tentativa submetida sem consulta'
                else cons=data[0].studentData[i].query
            if(res=='Correto') color='color: green;'
                else color='color: red;'
            let tbl_line = 
            `<tr> 
                <th scope="row">${data[0].studentData[i].idQuery}</th>
                <td>${cons}</td>
                <td style="${color}">${res}</td>
                </tr>` 
            tbl_body.innerHTML += tbl_line
        }
    })
    .catch(function (error) {
        alert('Request failed', error)
    });
}

function sethash(hash, numQueries){
    _hash = hash
    numQueries = numQueries
    createAnalytics(_hash,numQueries)
}
function createAnalytics(_hash, numQueries){
    var obj = new Object();
	obj.activityID = activityID;
	obj.inveniraStdID = inveniraStdID;
    obj._hash = _hash
	obj.access = true
	obj.downloadApp = false
	obj.viewModel = false
    obj.numQueries = numQueries
	obj.studentData = []
    myJSON = JSON.stringify(obj)
    console.log(myJSON)
    const options = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: myJSON
	}
    fetch('http://localhost:3000/accessDeploy',options)
	.then((response) => {
		return response.text();
	})
	.then((text) => {
		console.log('Request successful:', text);
	})
	.catch(function (error) {
		log('Request failed', error)
	});
}

function copyCode(){
    let text = document.getElementById("codetocopy").value;
    console.log(text)
    navigator.clipboard.writeText(text)
    .then(() => {
        console.log(text)
        alert('Copiado para o clipboard!');
      })
      .catch(() => {
        alert('Erro ao copiar!');
      });
}

function hidesp(){
    document.getElementById('sp1')
    .style.display = 'none';
} 

function showsp(){
    document.getElementById('sp1')
    .style.display = 'block';
}

function downloadApp(){
    showsp()
    fetch('http://localhost:3000/getapp')
    .then((transfer) => {
        return transfer.blob()
    })
    .then((bytes) => {
        hidesp()
        let elm = document.createElement('a');
        elm.href = URL.createObjectURL(bytes);
        elm.setAttribute('download', 'SQL_Train_1.0.0.exe'); 
        elm.click();
        updateAnalytics('downloadApp')
    })
    .catch((error) => {
        alert(error);
    })
}

function updateAnalytics(interaction){
    var obj = new Object()
    obj._hash = _hash
    obj.interaction = interaction
    const myJSON = JSON.stringify(obj)
    const options = {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json'
		},
		body: myJSON
	};
    fetch('http://localhost:3000/updateanalytics',options)
	.then((response) => {
		return response.text();
	})
	.then((text) => {
		console.log('Request successful:', text);
	})
	.catch(function (error) {
		log('Request failed', error)
	});
}
