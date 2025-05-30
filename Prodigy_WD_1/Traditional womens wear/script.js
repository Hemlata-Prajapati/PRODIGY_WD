// Add event listener to navigation links
document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Navigation link clicked!');
    });
});

// Add event listener to collection items
document.querySelectorAll('.collections li').forEach(function(item) {
    item.addEventListener('click', function() {
        alert('Collection item clicked!');
    });
});