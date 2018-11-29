const groupTable = document.querySelector('#table-body')
const winner = document.querySelector('#winner')
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

const renderGroups = function(groups){
    groupTable.innerHTML = ''
    groups.forEach(function (group){
        // console.log(group.college.division)
        if(group.name != selectedWinner.name){
            const tableRow = document.createElement('tr')
            const collegeName= document.createElement('td')
            collegeName.innerHTML=(group.college.name)
            const groupName = document.createElement('td')
            groupName.innerHTML =(group.name)
            const membershipData= document.createElement('td')
            membershipData.innerHTML = (group.membership)
            const divisionData = document.createElement('td')
            divisionData.innerHTML = (group.college.division)
            const crownWinner = document.createElement('td')
            crownWinnerImg = document.createElement('img')
            crownWinnerImg.src = './assets/trophy.png'
            deleteRow = document.createElement('td')
            deleteButton = document.createElement('button')
            deleteButton.innerText = 'Remove Team'
            groupTable.append(tableRow)
            tableRow.append(collegeName, groupName, membershipData,divisionData,crownWinner,deleteRow)
            crownWinner.append(crownWinnerImg)
            deleteRow.append(deleteButton)
            crownWinner.addEventListener('click', function(){
                selectedWinner = group
                console.log(selectedWinner)
                selectWinner()
                render()
            })
        }
    } )
}

const selectWinner = function(){
    winner.innerHTML = `Winner: ${selectedWinner.name}`
};
render()