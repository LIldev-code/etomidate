"use client";
import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    // Prevent right-click context menu globally
    const preventContextMenu = (e) => {
      // Allow right-click on input fields, textareas, and specific interactive elements
      const target = e.target;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true';
      const isInteractive = target.closest('button, a, [role="button"], .interactive, .allow-context-menu');
      
      if (!isInput && !isInteractive) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent drag and drop globally
    const preventDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent text selection on images
    const preventSelect = (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('.no-select')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent keyboard shortcuts for saving/viewing source
    const preventKeyboard = (e) => {
      // Prevent Ctrl+S, Ctrl+P, Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      const forbiddenKeys = [
        (e.ctrlKey && e.key === 's'), // Save
        (e.ctrlKey && e.key === 'p'), // Print
        (e.ctrlKey && e.key === 'u'), // View Source
        (e.ctrlKey && e.shiftKey && e.key === 'I'), // DevTools
        (e.ctrlKey && e.shiftKey && e.key === 'J'), // Console
        (e.ctrlKey && e.shiftKey && e.key === 'C'), // Inspector
        e.key === 'F12', // DevTools
        e.key === 'PrintScreen', // Screenshot
      ];

      if (forbiddenKeys.some(condition => condition)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent copy/paste on images
    const preventCopy = (e) => {
      const selection = window.getSelection();
      if (selection.toString().length === 0 && e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);
    document.addEventListener('selectstart', preventSelect);
    document.addEventListener('keydown', preventKeyboard);
    document.addEventListener('copy', preventCopy);

    // Prevent opening developer tools through right-click on specific elements
    const preventDevTools = (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('.protected')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener('mousedown', preventDevTools);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
      document.removeEventListener('selectstart', preventSelect);
      document.removeEventListener('keydown', preventKeyboard);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('mousedown', preventDevTools);
    };
  }, []);

  // Add anti-screenshot class to body
  useEffect(() => {
    document.body.classList.add('anti-screenshot');
    return () => {
      document.body.classList.remove('anti-screenshot');
    };
  }, []);

  return null; // This component doesn't render anything
}
