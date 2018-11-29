const groupTable = document.querySelector('#table-body')
const winner = document.querySelector('#winner')
const createTableData = document.createElement('td')            

//data
let selectedWinner = {};

const render = function(){
    fetch('http://localhost:3000/a_cappella_groups')
    .then(function(response){
        return response.json()
    })
    .then(function(groups){
        // console.log(groups)
        renderGroups(groups)
    })
}

const renderTableRow = function(group){
    let tableRow = document.createElement('tr')
    tableRow.append(
        renderColumn(group.college.name),
        renderColumn(group.name),
        renderColumn(group.membership),
        renderColumn(group.college.division),
        renderColumn(renderCrownImage(group)),
        renderColumn(renderDeleteButton(group))
    )
    return tableRow
}

const renderColumn = function(content){
    let td = document.createElement('td')
    td.append(content)
    return td
}

const renderCrownImage = function(group){
    const crownWinnerImg = document.createElement('img') 
    crownWinnerImg.src = './assets/trophy.png'
    crownWinnerImg.addEventListener('click', function(){
        selectedWinner = group
        console.log(selectedWinner)
        selectWinner()
        render()
    })
    return crownWinnerImg
}

const renderDeleteButton = function(group){
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Remove Team'
    deleteButton.addEventListener('click', function(){
        destroyGroup(group)
    })
    
    return deleteButton
}

const destroyGroup = function(group){
    fetch(`http://localhost:3000/a_cappella_groups/${group.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify()
    }).then(render)
}

const renderGroups = function(groups){
    groupTable.innerHTML = ''
    groups.forEach(function (group){
        if(group.name != selectedWinner.name){   
            groupTable.append(renderTableRow(group))
        }
    } )
}

const selectWinner = function(){
    winner.innerHTML = `Winner: ${selectedWinner.name}`
};
render()