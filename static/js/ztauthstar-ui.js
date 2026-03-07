/**
 * ZTAuth* UI Enhancements
 * - Scroll progress bar
 * - Image lightbox (zoomable with captions)
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    // ─── Scroll Progress Bar ───────────────────────────────────
    var bar = document.createElement('div');
    bar.id = 'zt-scroll-progress';
    document.body.prepend(bar);

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    // ─── Image Lightbox ────────────────────────────────────────
    var overlay = document.createElement('div');
    overlay.id = 'zt-lightbox';
    overlay.innerHTML = [
      '<div id="zt-lightbox-backdrop"></div>',
      '<div id="zt-lightbox-content">',
      '  <img id="zt-lightbox-img" src="" alt="" />',
      '  <div id="zt-lightbox-caption"></div>',
      '</div>',
      '<button id="zt-lightbox-close" aria-label="Close">&times;</button>'
    ].join('');
    document.body.appendChild(overlay);

    var lbImg = document.getElementById('zt-lightbox-img');
    var lbCaption = document.getElementById('zt-lightbox-caption');

    function openLightbox(src, alt, figureLabel) {
      lbImg.src = src;
      lbImg.alt = alt;
      if (figureLabel) {
        lbCaption.innerHTML = '<strong>' + figureLabel + '</strong> — ' + (alt || '');
        lbCaption.style.display = 'block';
      } else {
        lbCaption.textContent = alt || '';
        lbCaption.style.display = alt ? 'block' : 'none';
      }
      overlay.classList.add('zt-lightbox-open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('zt-lightbox-open');
      document.body.style.overflow = '';
      setTimeout(function() { lbImg.src = ''; }, 300);
    }

    document.getElementById('zt-lightbox-backdrop').addEventListener('click', closeLightbox);
    document.getElementById('zt-lightbox-close').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });

    // Attach click handlers + generate numbered captions (single pass)
    var imgCounter = 0;
    var allContentImgs = document.querySelectorAll('.content img');
    allContentImgs.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.setAttribute('title', 'Click to zoom');

      var figLabel = null;

      if (img.alt && img.alt.trim() !== '') {
        imgCounter++;
        figLabel = 'Figure ' + imgCounter;

        // Add visible caption below the image only if NOT inside a <figure>
        if (!img.closest('figure')) {
          var caption = document.createElement('div');
          caption.className = 'zt-img-caption';
          caption.innerHTML = '<strong>' + figLabel + '</strong> — ' + img.alt;
          img.parentNode.insertBefore(caption, img.nextSibling);
        }
      }

      img.addEventListener('click', function() {
        openLightbox(img.src, img.alt, figLabel);
      });
    });

    // ─── Reading Time Counter ──────────────────────────────────
    var contentEl = document.querySelector('.content');
    if (contentEl) {
      var text = contentEl.innerText || contentEl.textContent || '';
      var wordCount = text.trim().split(/\s+/).length;
      var wordsPerMinute = 200;
      var totalMinutes = Math.ceil(wordCount / wordsPerMinute);

      // Only show on pages with significant content (3+ min read)
      if (totalMinutes >= 3) {

      // Create reading time badge (positioned inline with h1 title)
      var badge = document.createElement('div');
      badge.id = 'zt-reading-time';
      badge.innerHTML = '<svg id="zt-reading-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <span id="zt-reading-text">' + totalMinutes + ' min left</span>';

      // Insert into content and vertically center with the h1
      var firstH = contentEl.querySelector('h1, h2');
      contentEl.insertBefore(badge, contentEl.firstChild);
      if (firstH) {
        var hTop = firstH.offsetTop;
        var hHeight = firstH.offsetHeight;
        var badgeHeight = badge.offsetHeight || 24;
        badge.style.top = (hTop + (hHeight - badgeHeight) / 2) + 'px';
      }

      // Update remaining time live on scroll
      function updateReadingTime() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var pct = docHeight > 0 ? scrollTop / docHeight : 0;
        var minutesLeft = Math.max(1, Math.ceil(totalMinutes * (1 - pct)));
        var readText = document.getElementById('zt-reading-text');

        if (readText) {
          if (pct >= 0.95) {
            readText.textContent = 'Done ✓';
          } else {
            readText.textContent = minutesLeft + ' min left';
          }
        }
      }

      window.addEventListener('scroll', updateReadingTime, { passive: true });
      } // end if totalMinutes >= 3
    }

    // ─── Scroll to Top Button ──────────────────────────────────
    var scrollBtn = document.createElement('button');
    scrollBtn.id = 'zt-scroll-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(scrollBtn);

    function toggleScrollBtn() {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('zt-scroll-top-visible');
      } else {
        scrollBtn.classList.remove('zt-scroll-top-visible');
      }
    }

    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    toggleScrollBtn();

    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  });
})();
