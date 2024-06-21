async function fetchAPI(fMethod, fUrl, hBodyPart) {
    const tblParents = document.getElementById("tblParents");
    try {
        const fetchOption = {
            method: fMethod,
            headers: {
                "Content-Type": "application/json",
            }
        };

        if (fMethod !== "GET") {
            fetchOption.body = hBodyPart;
        }

        const response = await fetch(fUrl, fetchOption);
        if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            const data = jsonData.data;
            var tblContent = `<tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>`;
            for (let i = 0; i < data.length; i++) {
                let dataUser = data[i];
                tblContent += `<tr>
                <td><img src=${dataUser.avatar}></td>
                <td>${dataUser.first_name} ${dataUser.last_name}</td>
                <td>${dataUser.email}</td>
                </tr>`;
            }
            tblParents.innerHTML = tblContent;
            console.log(tblContent);
        } else {
            console.log('loading failed!');
        }
    } catch (error) {
        console.log(error);
    }
}

var btnDashboard = document.getElementById("btnDashboard");
var btnParent = document.getElementById("btnParent");
var sectionMain = document.getElementById("sectionMain");
var noLoadedContent = true;

btnDashboard.addEventListener("click", function() {
    fetch('dashboard.html')
        .then(response => response.text())
        .then(data => {
            sectionMain.innerHTML = data;
            noLoadedContent = true;
        })
        .catch(error => console.error('Error fetching the HTML file:', error));
});

btnParent.addEventListener("click", function() {
    fetch('parent.html')
        .then(response => response.text())
        .then(data => {
            sectionMain.innerHTML = data;
            noLoadedContent = true;
            fetchAPI("GET", "https://reqres.in/api/users?page=2&per_page=6", "");
        })
        .catch(error => console.error('Error fetching the HTML file:', error));
});

if(noLoadedContent == true) {
    fetch('dashboard.html')
        .then(response => response.text())
        .then(data => {
            sectionMain.innerHTML = data;
        })
        .catch(error => console.error('Error fetching the HTML file:', error));
}