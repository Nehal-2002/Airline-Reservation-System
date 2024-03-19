// Clear form data when refresh
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
function clearData() {
	document.getElementById("userForm").reset();
}


// Calling this function to validate user's data before sumitting the form
function validate() {
	// Fetching input data from input fields
	let userName = document.getElementById('Name').value
	let userPassword = document.getElementById('password').value;
	let userConfirmPassword = document.getElementById('confirm-password').value;
	// let nameValidate = false
	// let passValidate = false


	let correctName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
	if (!userName.match(correctName)) {
		alert("Invalid Name")
		return false
	}
	// Checking password and confirm password must match
	if (userPassword !== userConfirmPassword) {
		alert("Confirm password in not matching with password")
		return false
		// document.getElementById('conPassError').innerHTML = "Confirm password in not matching with password";
	}
	return true

}

