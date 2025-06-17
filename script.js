// script.js
document.addEventListener('DOMContentLoaded', function() {
  // إعداد المراقبة لظهور العناصر
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // تأثيرات بطاقات الإحصائيات
        if (entry.target.classList.contains('stat-card')) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, 300);

          // تأثيرات العد التصاعدي للأرقام
          if (entry.target.querySelector('.stat-number')) {
            animateValue(entry.target.querySelector('.stat-number'));
          }
        }

        // تأثيرات قائمة الخبرات
        if (entry.target.classList.contains('expertise-list')) {
          const items = entry.target.querySelectorAll('li');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('show');
            }, index * 150);
          });
        }
      }
    });
  }, {
    threshold: 0.1
  });

  // مراقبة بطاقات الإحصائيات
  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });

  // مراقبة قائمة الخبرات
  document.querySelectorAll('.expertise-list').forEach(list => {
    observer.observe(list);
  });

  // تأثيرات العد التصاعدي
  function animateValue(element) {
    const targetValue = element.textContent;
    const isPlus = targetValue.includes('+');
    const value = parseInt(targetValue.replace('+', '').replace('M', '000000').replace('B', '000000000'));

    element.textContent = '0';
    if (isPlus) element.textContent += '+';

    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    function updateCount() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * value);

      // تنسيق الأرقام
      let displayValue;
      if (value >= 1000000) {
        displayValue = (currentValue / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        displayValue = (currentValue / 1000).toFixed(1) + 'K';
      } else {
        displayValue = currentValue.toLocaleString();
      }

      element.textContent = displayValue;
      if (isPlus && currentValue > 0) element.textContent += '+';

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        // استعادة القيمة الأصلية بعد الانتهاء
        element.textContent = targetValue;
      }
    }

    requestAnimationFrame(updateCount);
  }
});