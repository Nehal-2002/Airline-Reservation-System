const fetchData = () => {
    let userName = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userName="))
        ?.split("=")[1]
    let decodedName = decodeURIComponent(userName)
    let modifiedName = decodedName.replaceAll(" ", "&nbsp")
    let userNameDiv = document.getElementById('userName')
    userNameDiv.innerHTML = modifiedName

    let url = 'listFlight'

    let p = fetch(url, {
        method: 'post'
    })

    p.then((response) => {
        console.log("Successfully fetched data from sever")
        return response.json()
    })
        .then((flightData) => {
            let filterObj = JSON.parse(sessionStorage.getItem('filterObj'))

            // console.log(filterObj)
            // console.log(flightData)
            // let newDate1 = new Date('2023-07-06')
            // let newDate2 = new Date('2023-07-06')
            // console.log(newDate1.toLocaleDateString()+" "+newDate2.toLocaleDateString())
            // console.log(newDate1.toLocaleDateString() == newDate2.toLocaleDateString())

            for (let i = 0; i < flightData.length; i++) {
                if ((filterObj.flightType == 'one-way') && (flightData[i].Via.length == 0)) {

                    if (filterObj.destination != "" && (flightData[i].Destination == filterObj.destination)) {

                        let [year,month,day] = filterObj.depDate.split("-")
                        let depDT = new Date(year,month-1,day)
                        let d = new Date()
                        if(depDT.toDateString() == d.toDateString())
                        {
                            depDT.setHours(d.getHours(),d.getMinutes(),d.getMinutes())
                        }
                        let flightarvDT = new Date(flightData[i].ArvDT)
                        let flightdepDT = new Date(flightData[i].DepDT)
                        let userDateObj = new Date(filterObj.arvDate)

                        if (filterObj.arvDate != "" && (flightarvDT.toLocaleDateString() == userDateObj.toLocaleDateString())) {

                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime()+ 2 * 60 * 60 * 1000 > depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function without Via,Fixed Destination,Fixed arvDate  */
                            }
                        }
                        else if ((filterObj.arvDate == "") && (flightData[i].ArvDT == undefined)) {

                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime()+ 2 * 60 * 60 * 1000 > depDT.getTime() + 2 * 60 * 60 * 1000) && (flightData[i].Status == "ON TIME")) {
                                console.log(flightdepDT +" "+depDT)
                                renderRows(flightData[i]) /* Calling function without Via,Fixed Destination,Any arvDate  */
                            }
                        }
                    }
                    else if (filterObj.destination == "") {
                        let [year,month,day] = filterObj.depDate.split("-")
                        let depDT = new Date(year,month-1,day)
                        let d = new Date()
                        if(depDT.toDateString() == d.toDateString())
                        {
                            depDT.setHours(d.getHours(),d.getMinutes(),d.getMinutes())
                        }
                        let flightarvDT = new Date(flightData[i].ArvDT)
                        let flightdepDT = new Date(flightData[i].DepDT)
                        let userDateObj = new Date(filterObj.arvDate)

                        if (filterObj.arvDate != "" && (flightarvDT.toLocaleDateString() == userDateObj.toLocaleDateString())) {

                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime() + 2 * 60 * 60 * 1000 > depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function without Via,Any Destination,Fixed arvDate  */
                            }
                        }
                        else if ((filterObj.arvDate == "") && (flightData[i].ArvDT == undefined)) {

                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime() + 2 * 60 * 60 * 1000 > depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function without Via,Any Destination,Any arvDate  */
                            }
                        }
                    }
                }
                else if ((filterObj.flightType == 'multi-city') && (flightData[i].Via.length != 0)) {
                    if (filterObj.destination != "" && flightData[i].Destination == filterObj.destination) {
                        let [year,month,day] = filterObj.depDate.split("-")
                        let depDT = new Date(year,month-1,day)
                        let d = new Date()
                        if(depDT.toDateString() == d.toDateString())
                        {
                            depDT.setHours(d.getHours(),d.getMinutes(),d.getMinutes())
                        }
                        let flightarvDT = new Date(flightData[i].ArvDT)
                        let flightdepDT = new Date(flightData[i].DepDT)
                        let userDateObj = new Date(filterObj.arvDate)

                        // console.log(filterObj.arvDate)
                        if (filterObj.arvDate != "" && (flightarvDT.toLocaleDateString() == userDateObj.toLocaleDateString())) {
                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime() + 2 * 60 * 60 * 1000 < depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function with Via,Fixed Destination,Fixed arvDate  */
                            }
                        }
                        else if ((filterObj.arvDate == "") && (flightData[i].ArvDT == undefined)) {
                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime() + 2 * 60 * 60 * 1000 < depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function with Via,Fixed Destination,Any arvDate  */
                            }
                        }
                    }
                    else if (filterObj.destination == "") {

                        let [year,month,day] = filterObj.depDate.split("-")
                        let depDT = new Date(year,month-1,day)
                        let d = new Date()
                        if(depDT.toDateString() == d.toDateString())
                        {
                            depDT.setHours(d.getHours(),d.getMinutes(),d.getMinutes())
                        }
                        let flightarvDT = new Date(flightData[i].ArvDT)
                        let flightdepDT = new Date(flightData[i].DepDT)
                        let userDateObj = new Date(filterObj.arvDate)

                        if (filterObj.arvDate != "" && (flightarvDT.toLocaleDateString() == userDateObj.toLocaleDateString())) {

                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime() + 2 * 60 * 60 * 1000 < depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function with Via,Any Destination,Fixed arvDate  */
                            }
                        }
                        else if ((filterObj.arvDate == "") && (flightData[i].ArvDT == undefined)) {

                            if ((flightData[i].Origin == filterObj.origin) && (flightdepDT.getTime() + 2 * 60 * 60 * 1000 < depDT.getTime()) && (flightData[i].Status == "ON TIME")) {
                                renderRows(flightData[i]) /* Calling function with Via,Any Destination,Any arvDate  */
                            }
                        }
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

const renderRows = (flightData) => {
    let table = document.querySelector('tbody')
    let rowI = table.insertRow(1)

    let cell0 = rowI.insertCell(0)
    cell0.innerHTML = flightData.flightNo

    let cell1 = rowI.insertCell(1)
    cell1.innerHTML = flightData.Airline

    let cell2 = rowI.insertCell(2)
    cell2.innerHTML = flightData.Origin

    let cell3 = rowI.insertCell(3)
    cell3.innerHTML = flightData.Via

    let cell4 = rowI.insertCell(4)
    cell4.innerHTML = flightData.Destination

    let depDT = new Date(flightData.DepDT)
    let cell5 = rowI.insertCell(5)
    // console.log(DepDT.toLocaleDateString())
    // change date format
    cell5.innerHTML = `${depDT.getDate()}/${depDT.getMonth() + 1}/${depDT.getFullYear()}`

    let cell6 = rowI.insertCell(6)
    cell6.innerHTML = depDT.toLocaleTimeString([], { timeStyle: 'short' })

    if (flightData.ArvDT == undefined) {
        let cell7 = rowI.insertCell(7)
        cell7.innerHTML = "-----"
        let cell8 = rowI.insertCell(8)
        cell8.innerHTML = "-----"
    }
    else {
        let arvDT = new Date(flightData.ArvDT)
        let cell7 = rowI.insertCell(7)
        cell7.innerHTML = `${arvDT.getDate()}/${arvDT.getMonth() + 1}/${arvDT.getFullYear()}`

        let cell8 = rowI.insertCell(8)
        cell8.innerHTML = arvDT.toLocaleTimeString([], { timeStyle: 'short' })
    }

    let cell9 = rowI.insertCell(9)
    cell9.innerHTML = flightData.Status

    let div = document.createElement('div')
    div.className = "show"

    let button = document.createElement('button')
    button.innerHTML = "Book"
    button.onclick = () => { book(flightData) }
    div.appendChild(button)

    let cell10 = rowI.insertCell(10)
    cell10.appendChild(div)
}

const book = (flightData) => {
    sessionStorage.setItem('flightData', JSON.stringify(flightData))
    window.location.href = `seatMap.html`
}