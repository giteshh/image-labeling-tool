(function () {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
     document.getElementById('user-name').textContent = user.name;
     document.getElementById('user-email').textContent = user.email;
    if (!user) {
        window.location.href = 'login.html';
    }
})();

function onLogout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}