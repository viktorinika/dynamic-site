const baseUrl = 'https://student-js-test-site1.000webhostapp.com/front_0523/api/all_data.php';
const studentId = 4;

async function fetchApiData() {
    const url = new URL(baseUrl);
    url.searchParams.set('id_stud', studentId);

    return (await fetch(url)).json()
}

function getElementsByDataFieldName(dataFieldName) {
    return document.querySelectorAll(`[data-field=${dataFieldName}]`);
}

function putTextIntoTags(nodeList, text) {
    nodeList.forEach(element => {
        element.innerText = text;
    });
}

function putNodeListIntoTags(nodeList, tagsList) {
    nodeList.forEach(element => {
        element.parentElement.appendChild(tagsList)
        console.log();
        // element.appendChild(tagsList);
    });
}

function createNodesListByArrayData(arrayData) {
    return arrayData.map(item => {
        const newDiv = document.createElement('div');
        const newContent = document.createTextNode(item);

        newDiv.appendChild(newContent);

        return newDiv;
    })
}

async function renderCard(studentData) {
    const preparedData = Object
        .keys(studentData)
        .forEach(key => {
            if (Array.isArray(studentData[key]) && studentData[key].length > 0) {
                if (studentData[key].every(item => typeof item === 'string')) {
                    const nodeListWithText = createNodesListByArrayData(studentData[key]);
                    const nodeList = getElementsByDataFieldName(key);
                    console.log({
                        nodeListWithText,
                        nodeList
                    })
                    putNodeListIntoTags(nodeList, nodeListWithText);
                }
            } else {
                const nodeList = getElementsByDataFieldName(key);
                putTextIntoTags(nodeList, studentData[key]);
            }
        });
}

async function initApp() {
    const [studentData] = await fetchApiData();
    console.log(studentData);

    renderCard(studentData);
}

initApp();