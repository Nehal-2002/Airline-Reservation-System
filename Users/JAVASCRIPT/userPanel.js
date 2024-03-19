    let userName = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userName="))
    ?.split("=")[1]
    let decodedName = decodeURIComponent(userName)
    let modifiedName = decodedName.replaceAll(" ","&nbsp")
    let userNameDiv = document.getElementById('userName')
    userNameDiv.innerHTML = modifiedName

    // const userNameLoad = () => {
    //     let name = document.cookie('userName');
    //     let userNameDiv = document.getElementById('userName');
    //     name = name.replace(/ /g, '&nbsp;');
    //     userNameDiv.innerHTML = name;
    //     document.getElementById('form').reset();
    //   };
      

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Good')
    let flighttype
    let buttons = document.getElementsByName('flight-type')
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked == true) {
            flighttype = buttons[i].id
        }
    }

    if(flighttype == undefined)
    {
        alert("Please select flight type")
        return 0
    }

    let depLoc = document.getElementById('Origin').value.toUpperCase()
    if(depLoc.trim().length == 0)
    {
        alert("Plese enter origin airport or city")
        return 0
    }

    let arvLoc = document.getElementById('Destination').value.toUpperCase()

    let depD = document.getElementById('departureDate').value /* String */
    if(depD == "")
    {
        alert("Please select departure date")
        return 0
    }
    
    let arvD = document.getElementById('arrivalDate').value  /* String */
    let adultN = document.getElementById('adultNumber').value  /* String 1-5 */
    let childN = document.getElementById('childNumber').value  /* String 0-4 */
    let flightC = document.getElementById('class').value

    let filter = {
        flightType : flighttype,
        origin : depLoc,
        destination : arvLoc,
        depDate : depD,
        arvDate : arvD,
        adultNumber : adultN,
        childNumber : childN,
        flightClass : flightC
    }

    sessionStorage.setItem('filterObj',JSON.stringify(filter))
    window.location.href = "filterListFlight.html"
})


function openPopup() {
    var contactUsPageURL = "contactUs.html";

    var popupWidth = 600;
    var popupHeight = 400;
    var left = (screen.width - popupWidth) / 2;
    var top = (screen.height - popupHeight) / 2;

    window.open(
        contactUsPageURL,
        "Contact Us",
        "width=" + popupWidth + ",height=" + popupHeight + ",left=" + left + ",top=" + top
    );
}