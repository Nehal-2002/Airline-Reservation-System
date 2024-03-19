let dark = document.cookie
.split("; ")
.find((row) => row.startsWith("isDark="))
?.split("=")[1]
if(dark == 'true')
{
    var body = document.body;
    body.classList.toggle("dark-mode");
}

const fetchAirlineData = () =>{
    let url = "getListAirline"
    let p = fetch(url,{method:'POST'})

    p.then((result)=>{
        return result.json()
    })
    .then((data)=>{
        console.log(data)
        let dataList = document.getElementById('airlineSelect')
        for(let i =0;i<data.length;i++)
        {
            let opt = document.createElement('option')
            opt.value = data[i].Name
            opt.innerHTML = data[i].Name
            dataList.appendChild(opt)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

function toggleDarkMode() {
    const checkbox = document.getElementById("hide-checkbox");
    const body = document.body;
    
    if (checkbox.checked) {
      body.classList.add("dark-mode");
      document.cookie = "isDark=true; path=/;";
    } else {
      body.classList.remove("dark-mode");
      document.cookie = "isDark=false; path=/;";
    }
    }
    
    document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("hide-checkbox");
    const dark = document.cookie
      .split("; ")
      .find((row) => row.startsWith("isDark="))
      ?.split("=")[1];
    
    if (dark === "true") {
      checkbox.checked = true;
      document.body.classList.add("dark-mode");
    } else {
      checkbox.checked = false;
    }
    });

    function updateDateTime() {
      const currentDate = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      document.getElementById("currentDateTime").textContent = formattedDate;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();
    
