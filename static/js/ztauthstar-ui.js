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

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt;
      lbCaption.textContent = alt || '';
      lbCaption.style.display = alt ? 'block' : 'none';
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

    // Attach click handlers + generate captions
    var contentImgs = document.querySelectorAll('.content img');
    contentImgs.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.setAttribute('title', 'Click to zoom');

      img.addEventListener('click', function() {
        openLightbox(img.src, img.alt);
      });

      // Add caption if alt text exists and not already in a figure
      if (img.alt && img.alt.trim() !== '' && !img.closest('figure')) {
        var caption = document.createElement('div');
        caption.className = 'zt-img-caption';
        caption.textContent = img.alt;
        img.parentNode.insertBefore(caption, img.nextSibling);
      }
    });

    // Also handle figure images
    var figImgs = document.querySelectorAll('.content figure img');
    figImgs.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.setAttribute('title', 'Click to zoom');
      img.addEventListener('click', function() {
        openLightbox(img.src, img.alt);
      });
    });

    // ─── Reading Time Counter ──────────────────────────────────
    var contentEl = document.querySelector('.content');
    if (contentEl) {
      var text = contentEl.innerText || contentEl.textContent || '';
      var wordCount = text.trim().split(/\s+/).length;
      var wordsPerMinute = 200;
      var totalMinutes = Math.ceil(wordCount / wordsPerMinute);

      // Create reading time badge
      var badge = document.createElement('div');
      badge.id = 'zt-reading-time';
      badge.innerHTML = '<svg id="zt-reading-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <span id="zt-reading-text">' + totalMinutes + ' min read</span>';

      // Insert before the first heading in content
      var firstH = contentEl.querySelector('h1, h2');
      if (firstH) {
        firstH.parentNode.insertBefore(badge, firstH.nextSibling);
      }

      // Update reading time as user scrolls
      function updateReadingTime() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var pct = docHeight > 0 ? scrollTop / docHeight : 0;
        var minutesLeft = Math.max(1, Math.ceil(totalMinutes * (1 - pct)));
        var readText = document.getElementById('zt-reading-text');
        if (readText) {
          if (pct >= 0.95) {
            readText.textContent = 'Done reading ✓';
          } else {
            readText.textContent = minutesLeft + ' min left';
          }
        }
      }

      window.addEventListener('scroll', updateReadingTime, { passive: true });
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
