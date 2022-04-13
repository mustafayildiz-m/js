window.addEventListener('scroll', () => {

    const val = 'test-pencere';
    const val1 = '#' + val;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (scrollable == scrolled) {
        $(val1).removeClass('test-pencere');
        $(val1).addClass('test-pencere1');

    } else {
        $(val1).addClass('test-pencere');
        $(val1).removeClass('test-pencere1');

    }
})
