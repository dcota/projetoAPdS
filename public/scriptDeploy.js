/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: scripts for deploy interface
*/

let _hash=''
let numQueries=0

function start(){
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	inveniraStdID = urlParams.get('inveniraStdID');
	activityID = urlParams.get('activityID');
    getData(inveniraStdID,activityID)
}

function getData(inveniraStdID,activityID) {
    var obj = new Object()
    obj.inveniraStdID = inveniraStdID
    obj.activityID = activityID
    ob = JSON.stringify(obj)
    const options = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: ob
	};
    fetch('http://localhost:3000/deployCode', options)
    .then(res => res.json())
    .then(data => {
        hidesp()
        const code = document.getElementById('code')
        code.innerHTML += 
        `
        <h5>C<span>&oacute</span>digo:</h5>
        <input type="text" class="form-control mt-2" id="codetocopy" value="${data._hash}">
        <button onclick="copyCode()" type="button" class="btn btn-primary btn-sm mt-2">Copiar</button>
        `
        sethash(data._hash, data.numQueries)
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
