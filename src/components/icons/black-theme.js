const toggleButton = document.getElementById('darkModeToggle');
  const body = document.querySelector('html');

  toggleButton.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-bs-theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? 'Disable' : 'Enable';
  });