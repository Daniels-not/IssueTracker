// avento listener para todo lo que esta dentro del form
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// esta funcion guardara la informacion introducida en lso textbox
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
    //* cuando le demos el boton de add lo que sencuentre en los forms se guarda
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues(); // llamamos a fetchissua para que imediatamente todo este dentro del localstorage lo imprima.

    e.preventDefault();
}

//cambiar el estado de abierto a cerrado
function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++){
        if(issues[i].id == id){
            issues[i].status = "Close"
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}


function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++){
        if(issues[i].id == id){
            issues.splice(i,1)
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// esta funcion generara la informacion que introduscamos en los texbox en un div induvisual.
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesListe = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

    issuesList.innerHTML +=     '<div class="container mb-4 ">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="bg-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span><i class="fas fa-terminal m-1"></i> ' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span><i class="fas fa-user m-1"></i>' + assignedTo + '</p>'+
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div>';
    }
}